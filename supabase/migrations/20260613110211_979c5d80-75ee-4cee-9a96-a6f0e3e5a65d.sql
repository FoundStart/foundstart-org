CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION public.assign_default_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.domain_inquiries;
CREATE POLICY "Anyone can create inquiries"
ON public.domain_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(domain_name)) BETWEEN 1 AND 253
  AND (phone IS NULL OR length(phone) <= 40)
  AND (message IS NULL OR length(message) <= 2000)
);

DROP POLICY IF EXISTS "Anyone can create clicks" ON public.affiliate_clicks;
CREATE POLICY "Anyone can create clicks"
ON public.affiliate_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(referral_code)) BETWEEN 3 AND 64
  AND affiliate_id IS NOT NULL
  AND (service_url IS NULL OR length(service_url) <= 2048)
  AND (user_agent IS NULL OR length(user_agent) <= 1024)
);