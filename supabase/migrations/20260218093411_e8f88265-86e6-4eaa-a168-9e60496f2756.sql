
-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Studios table (no cross-ref policies yet)
CREATE TABLE public.studios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Studios are viewable by everyone" ON public.studios FOR SELECT USING (true);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'lawyer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view roles" ON public.user_roles FOR SELECT USING (true);

-- Now add studio update policy that references user_roles
CREATE POLICY "Studio members can update" ON public.studios FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = studios.id AND user_roles.user_id = auth.uid())
);

-- Contract templates table
CREATE TABLE public.contract_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT,
  file_url TEXT,
  preview_url TEXT,
  stripe_price_id TEXT,
  page_count INTEGER,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contract_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contracts are viewable by everyone" ON public.contract_templates FOR SELECT USING (true);
CREATE POLICY "Studio members can insert contracts" ON public.contract_templates FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = contract_templates.studio_id AND user_roles.user_id = auth.uid())
);
CREATE POLICY "Studio members can update contracts" ON public.contract_templates FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = contract_templates.studio_id AND user_roles.user_id = auth.uid())
);
CREATE POLICY "Studio members can delete contracts" ON public.contract_templates FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = contract_templates.studio_id AND user_roles.user_id = auth.uid())
);

-- Contract purchases table
CREATE TABLE public.contract_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID NOT NULL REFERENCES public.contract_templates(id),
  studio_id UUID NOT NULL REFERENCES public.studios(id),
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contract_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Studio members can view purchases" ON public.contract_purchases FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = contract_purchases.studio_id AND user_roles.user_id = auth.uid())
);
CREATE POLICY "Anyone can insert purchases" ON public.contract_purchases FOR INSERT WITH CHECK (true);

-- Consultation requests table
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES public.studios(id),
  lawyer_id UUID NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_type TEXT NOT NULL DEFAULT 'Consulenza Generale',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Studio members can view requests" ON public.consultation_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = consultation_requests.studio_id AND user_roles.user_id = auth.uid())
);
CREATE POLICY "Studio members can update requests" ON public.consultation_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.studio_id = consultation_requests.studio_id AND user_roles.user_id = auth.uid())
);
CREATE POLICY "Anyone can insert consultation requests" ON public.consultation_requests FOR INSERT WITH CHECK (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('contract-previews', 'contract-previews', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('contract-files', 'contract-files', false);

CREATE POLICY "Preview files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'contract-previews');
CREATE POLICY "Authenticated can upload previews" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'contract-previews' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated can download contract files" ON storage.objects FOR SELECT USING (bucket_id = 'contract-files' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated can upload contract files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'contract-files' AND auth.role() = 'authenticated');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON public.studios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contract_templates_updated_at BEFORE UPDATE ON public.contract_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultation_requests_updated_at BEFORE UPDATE ON public.consultation_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
