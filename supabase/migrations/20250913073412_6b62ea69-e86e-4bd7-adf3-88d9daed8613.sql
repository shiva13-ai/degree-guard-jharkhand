-- Create enum for verification status
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected', 'suspicious');

-- Create enum for document types
CREATE TYPE public.document_type AS ENUM ('degree', 'diploma', 'certificate', 'marksheet', 'other');

-- Create institutions table
CREATE TABLE public.institutions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    established_year INTEGER,
    accreditation_status TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification_requests table
CREATE TABLE public.verification_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    document_type document_type DEFAULT 'degree',
    extracted_data JSONB,
    verification_result JSONB,
    institution_id UUID REFERENCES public.institutions(id),
    requester_email TEXT,
    requester_name TEXT,
    requester_organization TEXT,
    confidence_score DECIMAL(5,2),
    flags JSONB DEFAULT '[]'::jsonb,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certificate_records table for institutions to upload their authentic records
CREATE TABLE public.certificate_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    institution_id UUID NOT NULL REFERENCES public.institutions(id),
    certificate_number TEXT NOT NULL,
    student_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    completion_date DATE NOT NULL,
    grade_or_marks TEXT,
    certificate_hash TEXT,
    document_type document_type NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(institution_id, certificate_number)
);

-- Enable Row Level Security
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for institutions (public read access)
CREATE POLICY "Institutions are viewable by everyone"
ON public.institutions
FOR SELECT
USING (true);

-- RLS Policies for verification_requests (public insert and own read)
CREATE POLICY "Anyone can create verification requests"
ON public.verification_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Verification requests are viewable by everyone"
ON public.verification_requests
FOR SELECT
USING (true);

-- RLS Policies for certificate_records (public read access for verification)
CREATE POLICY "Certificate records are viewable by everyone"
ON public.certificate_records
FOR SELECT
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_institutions_code ON public.institutions(code);
CREATE INDEX idx_verification_requests_status ON public.verification_requests(status);
CREATE INDEX idx_verification_requests_created_at ON public.verification_requests(created_at DESC);
CREATE INDEX idx_certificate_records_institution_id ON public.certificate_records(institution_id);
CREATE INDEX idx_certificate_records_certificate_number ON public.certificate_records(certificate_number);
CREATE INDEX idx_certificate_records_student_name ON public.certificate_records(student_name);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_institutions_updated_at
    BEFORE UPDATE ON public.institutions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verification_requests_updated_at
    BEFORE UPDATE ON public.verification_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificate_records_updated_at
    BEFORE UPDATE ON public.certificate_records
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample institutions
INSERT INTO public.institutions (name, code, address, contact_email, established_year, is_verified) VALUES
('Indian Institute of Technology, Dhanbad', 'IIT-DHN', 'Dhanbad, Jharkhand', 'admin@iitdhanbad.ac.in', 1926, true),
('National Institute of Technology, Jamshedpur', 'NIT-JSR', 'Jamshedpur, Jharkhand', 'registrar@nitjsr.ac.in', 1960, true),
('Birla Institute of Technology, Mesra', 'BIT-MESRA', 'Mesra, Ranchi, Jharkhand', 'registrar@bitmesra.ac.in', 1955, true),
('Ranchi University', 'RU', 'Ranchi, Jharkhand', 'info@ranchiuniversity.ac.in', 1960, true),
('Sido Kanhu Murmu University', 'SKMU', 'Dumka, Jharkhand', 'registrar@skmu.ac.in', 1992, true);

-- Insert sample certificate records for verification testing
INSERT INTO public.certificate_records (institution_id, certificate_number, student_name, course_name, completion_date, grade_or_marks, document_type) VALUES
((SELECT id FROM public.institutions WHERE code = 'IIT-DHN'), 'IIT/DHN/2023/001', 'Rajesh Kumar Singh', 'Bachelor of Technology in Computer Science', '2023-06-15', 'CGPA: 8.5', 'degree'),
((SELECT id FROM public.institutions WHERE code = 'NIT-JSR'), 'NIT/JSR/2023/045', 'Priya Sharma', 'Bachelor of Technology in Electrical Engineering', '2023-07-20', 'CGPA: 9.2', 'degree'),
((SELECT id FROM public.institutions WHERE code = 'BIT-MESRA'), 'BIT/MES/2023/112', 'Amit Kumar Mahto', 'Master of Computer Applications', '2023-08-10', 'Percentage: 85%', 'degree');