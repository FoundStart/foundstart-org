
-- Create payment_transactions table for Kashier
CREATE TABLE public.payment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL DEFAULT 'kashier',
  customer_data JSONB DEFAULT '{}'::jsonb,
  plan_id TEXT,
  kashier_order_id TEXT,
  payment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.payment_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions" ON public.payment_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions" ON public.payment_transactions
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update transactions" ON public.payment_transactions
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage transactions" ON public.payment_transactions
  FOR ALL USING (true) WITH CHECK (true);

-- Add affiliate link tracking columns
ALTER TABLE public.affiliates ADD COLUMN IF NOT EXISTS affiliate_links JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.affiliates ADD COLUMN IF NOT EXISTS total_clicks INTEGER DEFAULT 0;
ALTER TABLE public.affiliates ADD COLUMN IF NOT EXISTS total_conversions INTEGER DEFAULT 0;

-- Create affiliate_clicks table for tracking
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id),
  referral_code TEXT NOT NULL,
  service_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can view own clicks" ON public.affiliate_clicks
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.affiliates WHERE affiliates.id = affiliate_clicks.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all clicks" ON public.affiliate_clicks
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create clicks" ON public.affiliate_clicks
  FOR INSERT WITH CHECK (true);

-- Trigger for updated_at on payment_transactions
CREATE TRIGGER update_payment_transactions_updated_at
  BEFORE UPDATE ON public.payment_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
