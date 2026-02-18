
-- Create a security definer function to get a lawyer for a studio
-- This avoids exposing user_roles to unauthenticated users
CREATE OR REPLACE FUNCTION public.get_studio_lawyer(_studio_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id
  FROM public.user_roles
  WHERE studio_id = _studio_id
  LIMIT 1
$$;
