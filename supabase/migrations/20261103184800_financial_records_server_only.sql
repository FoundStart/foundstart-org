-- Financial records are created by authenticated server-side edge functions
-- with service_role, never directly by a customer's REST client.
BEGIN;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create payments" ON public.payments;
DROP POLICY IF EXISTS "Users can create transactions" ON public.payment_transactions;
COMMIT;
