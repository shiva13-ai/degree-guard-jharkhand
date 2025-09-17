-- Add user_type enum
CREATE TYPE public.user_type AS ENUM ('user', 'institution', 'admin');

-- Add user_type column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN user_type public.user_type DEFAULT 'user';

-- Update the handle_new_user function to include user_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'user_type')::public.user_type, 'user')
  );
  RETURN NEW;
END;
$function$;