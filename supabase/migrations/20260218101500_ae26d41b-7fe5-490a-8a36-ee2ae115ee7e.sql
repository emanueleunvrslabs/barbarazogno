
-- 1. Create contract_downloads table for download tracking
CREATE TABLE public.contract_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contract_downloads ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (edge function uses service role)
-- No public policies needed

-- 2. Fix permissive RLS: tighten consultation_requests INSERT policy
DROP POLICY IF EXISTS "Anyone can insert consultation requests" ON public.consultation_requests;
CREATE POLICY "Anyone can insert consultation requests with valid data"
  ON public.consultation_requests
  FOR INSERT
  WITH CHECK (
    client_name IS NOT NULL AND
    client_name <> '' AND
    client_email IS NOT NULL AND
    client_email <> '' AND
    status = 'new'
  );

-- 3. Fix permissive RLS: tighten contract_purchases INSERT policy  
DROP POLICY IF EXISTS "Anyone can insert purchases" ON public.contract_purchases;
CREATE POLICY "Anyone can insert purchases with valid data"
  ON public.contract_purchases
  FOR INSERT
  WITH CHECK (
    buyer_name IS NOT NULL AND
    buyer_name <> '' AND
    buyer_email IS NOT NULL AND
    buyer_email <> '' AND
    status = 'pending'
  );

-- 4. Harden contract-files storage: remove direct authenticated access
DROP POLICY IF EXISTS "Authenticated can download contract files" ON storage.objects;
-- Now only service role (used by download-contract edge function) can access files
