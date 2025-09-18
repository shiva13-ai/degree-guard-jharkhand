-- Create demo user accounts
-- Note: These are demo accounts with known passwords for testing purposes

-- Insert demo users directly into auth.users (using Supabase's auth functions would be better but this is for demo)
-- We'll create profiles for these users

-- First, let's create demo profiles that can be used for testing
INSERT INTO public.profiles (id, user_id, email, full_name, user_type) VALUES
  (gen_random_uuid(), gen_random_uuid(), 'john.smith@student.com', 'John Smith', 'user'),
  (gen_random_uuid(), gen_random_uuid(), 'hr@techcorp.com', 'TechCorp HR', 'employer'),
  (gen_random_uuid(), gen_random_uuid(), 'registrar@harvard.edu', 'Harvard Registrar', 'institution'),
  (gen_random_uuid(), gen_random_uuid(), 'admin@verifyed.com', 'System Admin', 'admin')
ON CONFLICT (user_id) DO NOTHING;