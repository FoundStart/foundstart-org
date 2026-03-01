
-- Fix 1: Profiles - Drop overly permissive "Deny public access" policy that allows ANY authenticated user
DROP POLICY IF EXISTS "Deny public access to profiles" ON public.profiles;

-- Fix 2: Domain inquiries - Add explicit deny for non-admin SELECT to ensure only admins can read
-- First check: the existing policies are all restrictive. Add a permissive SELECT for admins only.
-- Since all existing policies are restrictive and there's no permissive SELECT, regular users are already denied.
-- But to be explicit and safe, let's ensure the pattern is clear by adding a permissive admin-only SELECT:
CREATE POLICY "Only admins can select all inquiries"
ON public.domain_inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 3: Add missing columns to payment_transactions for webhook processing
ALTER TABLE public.payment_transactions
  ADD COLUMN IF NOT EXISTS kashier_transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS webhook_data JSONB;
