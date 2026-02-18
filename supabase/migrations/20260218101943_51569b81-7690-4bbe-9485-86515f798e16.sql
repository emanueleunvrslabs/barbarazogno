
-- 1. Create security definer function to check studio membership
CREATE OR REPLACE FUNCTION public.is_studio_member(_user_id uuid, _studio_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND studio_id = _studio_id
  )
$$;

-- 2. Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;

-- 3. Create scoped policy using the security definer function
CREATE POLICY "Users can view roles in their studio"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.is_studio_member(auth.uid(), studio_id));
