-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'member');

-- Create studios table (law firms)
CREATE TABLE public.studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  p_iva TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  invite_code TEXT UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  studio_id UUID REFERENCES public.studios(id) ON DELETE SET NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, studio_id)
);

-- Enable RLS on all tables
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _studio_id UUID, _role app_role)
RETURNS BOOLEAN
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
      AND role = _role
  )
$$;

-- Function to get user's studio_id
CREATE OR REPLACE FUNCTION public.get_user_studio_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT studio_id FROM public.profiles WHERE user_id = _user_id
$$;

-- Function to check if user belongs to studio
CREATE OR REPLACE FUNCTION public.user_belongs_to_studio(_user_id UUID, _studio_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND studio_id = _studio_id
  )
$$;

-- RLS Policies for studios
CREATE POLICY "Users can view their own studio"
ON public.studios FOR SELECT
USING (public.user_belongs_to_studio(auth.uid(), id));

CREATE POLICY "Owners can update their studio"
ON public.studios FOR UPDATE
USING (public.has_role(auth.uid(), id, 'owner'));

CREATE POLICY "Anyone can insert a new studio"
ON public.studios FOR INSERT
WITH CHECK (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their studio"
ON public.profiles FOR SELECT
USING (
  studio_id IS NULL OR 
  studio_id = public.get_user_studio_id(auth.uid())
);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view roles in their studio"
ON public.user_roles FOR SELECT
USING (public.user_belongs_to_studio(auth.uid(), studio_id));

CREATE POLICY "Owners can manage roles in their studio"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), studio_id, 'owner'));

CREATE POLICY "Users can insert their own role when creating studio"
ON public.user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_studios_updated_at
BEFORE UPDATE ON public.studios
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();