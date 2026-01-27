-- Enum per lo stato delle richieste di consulenza
CREATE TYPE public.consultation_status AS ENUM ('new', 'in_progress', 'completed', 'archived');

-- Tabella richieste di consulenza
CREATE TABLE public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL, -- user_id dell'avvocato a cui è diretta
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_type TEXT NOT NULL, -- tipo di servizio richiesto
  message TEXT,
  status consultation_status NOT NULL DEFAULT 'new',
  notes TEXT, -- note interne dell'avvocato
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella contratti in vendita
CREATE TABLE public.contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT,
  file_url TEXT, -- URL del file PDF nello storage
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella acquisti contratti
CREATE TABLE public.contract_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contract_templates(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, refunded
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Abilita RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies per consultation_requests
CREATE POLICY "Users can view requests for their studio"
  ON public.consultation_requests FOR SELECT
  USING (user_belongs_to_studio(auth.uid(), studio_id));

CREATE POLICY "Users can insert requests for their studio"
  ON public.consultation_requests FOR INSERT
  WITH CHECK (user_belongs_to_studio(auth.uid(), studio_id));

CREATE POLICY "Users can update requests in their studio"
  ON public.consultation_requests FOR UPDATE
  USING (user_belongs_to_studio(auth.uid(), studio_id));

-- Policy per permettere inserimenti pubblici (form clienti senza auth)
CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_requests FOR INSERT
  WITH CHECK (true);

-- RLS Policies per contract_templates
CREATE POLICY "Users can view templates in their studio"
  ON public.contract_templates FOR SELECT
  USING (user_belongs_to_studio(auth.uid(), studio_id));

CREATE POLICY "Owners/admins can manage templates"
  ON public.contract_templates FOR ALL
  USING (
    has_role(auth.uid(), studio_id, 'owner') OR 
    has_role(auth.uid(), studio_id, 'admin')
  );

-- Policy per visualizzazione pubblica dei contratti attivi
CREATE POLICY "Anyone can view active templates"
  ON public.contract_templates FOR SELECT
  USING (is_active = true);

-- RLS Policies per contract_purchases
CREATE POLICY "Users can view purchases for their studio"
  ON public.contract_purchases FOR SELECT
  USING (user_belongs_to_studio(auth.uid(), studio_id));

CREATE POLICY "Anyone can create purchases"
  ON public.contract_purchases FOR INSERT
  WITH CHECK (true);

-- Triggers per updated_at
CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON public.consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contract_templates_updated_at
  BEFORE UPDATE ON public.contract_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indici per performance
CREATE INDEX idx_consultation_requests_studio ON public.consultation_requests(studio_id);
CREATE INDEX idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX idx_contract_templates_studio ON public.contract_templates(studio_id);
CREATE INDEX idx_contract_purchases_studio ON public.contract_purchases(studio_id);