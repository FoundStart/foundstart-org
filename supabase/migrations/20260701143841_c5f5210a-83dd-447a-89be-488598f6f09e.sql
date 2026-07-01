
CREATE TABLE public.sales_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  jurisdiction TEXT,
  package TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT sales_inquiries_email_check CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 254),
  CONSTRAINT sales_inquiries_first_name_check CHECK (length(first_name) BETWEEN 1 AND 100),
  CONSTRAINT sales_inquiries_message_check CHECK (length(message) BETWEEN 1 AND 5000)
);

GRANT INSERT ON public.sales_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.sales_inquiries TO authenticated;
GRANT ALL ON public.sales_inquiries TO service_role;

ALTER TABLE public.sales_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a sales inquiry"
  ON public.sales_inquiries FOR INSERT
  WITH CHECK (
    length(first_name) BETWEEN 1 AND 100
    AND length(email) <= 254
    AND length(message) BETWEEN 1 AND 5000
  );

CREATE POLICY "Admins can view sales inquiries"
  ON public.sales_inquiries FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sales inquiries"
  ON public.sales_inquiries FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sales inquiries"
  ON public.sales_inquiries FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_sales_inquiries_updated_at
  BEFORE UPDATE ON public.sales_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_sales_inquiries_created_at ON public.sales_inquiries (created_at DESC);
CREATE INDEX idx_sales_inquiries_status ON public.sales_inquiries (status);
