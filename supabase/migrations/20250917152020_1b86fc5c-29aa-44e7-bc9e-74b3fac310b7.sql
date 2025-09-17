-- Update user_type enum to include admin
ALTER TYPE user_type ADD VALUE 'admin';

-- Create institutions_domains table for domain validation
CREATE TABLE public.institutions_domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_name TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on institutions_domains
ALTER TABLE public.institutions_domains ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing institution domains
CREATE POLICY "Institution domains are viewable by everyone" 
ON public.institutions_domains 
FOR SELECT 
USING (true);

-- Insert some example institution domains for testing
INSERT INTO public.institutions_domains (institution_name, domain, is_verified) VALUES
('Harvard University', 'harvard.edu', true),
('Stanford University', 'stanford.edu', true),
('MIT', 'mit.edu', true),
('University of Oxford', 'ox.ac.uk', true),
('Cambridge University', 'cam.ac.uk', true);

-- Create trigger for updated_at
CREATE TRIGGER update_institutions_domains_updated_at
BEFORE UPDATE ON public.institutions_domains
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();