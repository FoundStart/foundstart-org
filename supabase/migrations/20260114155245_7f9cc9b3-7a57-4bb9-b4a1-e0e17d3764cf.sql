-- Create domain_favorites table for wishlist feature
CREATE TABLE public.domain_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  domain_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, domain_name)
);

-- Enable RLS
ALTER TABLE public.domain_favorites ENABLE ROW LEVEL SECURITY;

-- RLS policies for domain_favorites
CREATE POLICY "Users can view own favorites" 
ON public.domain_favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" 
ON public.domain_favorites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites" 
ON public.domain_favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create domain_inquiries table for contact form
CREATE TABLE public.domain_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  domain_name TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.domain_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create inquiries (public contact form)
CREATE POLICY "Anyone can create inquiries" 
ON public.domain_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries" 
ON public.domain_inquiries 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update inquiries
CREATE POLICY "Admins can update inquiries" 
ON public.domain_inquiries 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updating updated_at
CREATE TRIGGER update_domain_inquiries_updated_at
BEFORE UPDATE ON public.domain_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();