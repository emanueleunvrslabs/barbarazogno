-- Drop the overly permissive policy
DROP POLICY "Anyone can insert a new studio" ON public.studios;

-- Create a more secure policy - only authenticated users can create studios
CREATE POLICY "Authenticated users can create studios"
ON public.studios FOR INSERT
TO authenticated
WITH CHECK (true);