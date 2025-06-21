
-- Create schools table
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  principal_name TEXT,
  established_year INTEGER,
  school_type TEXT DEFAULT 'public',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add school_id to existing tables
ALTER TABLE public.profiles ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.homework_assignments ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.school_events ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.results ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.classes ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.subjects ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.faculty ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.timetable ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.exams ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.homework ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.student_results ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.attendance ADD COLUMN school_id UUID REFERENCES public.schools(id);
ALTER TABLE public.notifications ADD COLUMN school_id UUID REFERENCES public.schools(id);

-- Enable RLS on schools table
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for schools
CREATE POLICY "Users can view their school data" 
  ON public.schools 
  FOR SELECT 
  USING (id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "School admins can manage school data" 
  ON public.schools 
  FOR ALL 
  USING (id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

-- Insert a sample school for testing
INSERT INTO public.schools (name, location, city, state, country, principal_name, school_type) 
VALUES ('Sample High School', '123 Education Street', 'Sample City', 'Sample State', 'Sample Country', 'Dr. John Smith', 'public');
