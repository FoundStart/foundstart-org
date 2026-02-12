
-- Remove overly permissive service role policy (service role bypasses RLS anyway)
DROP POLICY IF EXISTS "Service role can manage transactions" ON public.payment_transactions;
