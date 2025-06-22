
-- Add school_id to tables that don't have it yet (some already have it from the migration)
-- Update faculty table to add password column if not exists
ALTER TABLE public.faculty ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create a profiles table for faculty authentication
CREATE TABLE IF NOT EXISTS public.faculty_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id UUID REFERENCES public.faculty(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  school_id UUID REFERENCES public.schools(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on faculty_profiles
ALTER TABLE public.faculty_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for faculty_profiles
CREATE POLICY "Faculty can view their own profile" 
  ON public.faculty_profiles 
  FOR SELECT 
  USING (email = current_setting('app.current_user_email', true));

CREATE POLICY "Faculty can update their own profile" 
  ON public.faculty_profiles 
  FOR UPDATE 
  USING (email = current_setting('app.current_user_email', true));

-- Update existing tables to ensure school_id is properly set
-- This assumes you have one school already - update with your actual school ID
UPDATE public.profiles SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.classes SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.subjects SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.faculty SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.homework_assignments SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.school_events SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.exams SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.results SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;
UPDATE public.student_results SET school_id = (SELECT id FROM public.schools LIMIT 1) WHERE school_id IS NULL;

-- Create function to hash passwords (simple implementation)
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  -- Simple hash function - in production use proper bcrypt
  RETURN encode(digest(password || 'salt', 'sha256'), 'hex');
END;
$$;

-- Insert sample faculty profiles with hashed passwords
INSERT INTO public.faculty_profiles (faculty_id, email, password_hash, school_id)
SELECT 
  f.id,
  f.email,
  public.hash_password('password123'),
  f.school_id
FROM public.faculty f
WHERE NOT EXISTS (
  SELECT 1 FROM public.faculty_profiles fp WHERE fp.faculty_id = f.id
);
