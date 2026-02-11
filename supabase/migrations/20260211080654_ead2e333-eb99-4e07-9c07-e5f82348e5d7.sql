-- Fix: Profiles table - add explicit policy denying unauthenticated access
CREATE POLICY "Deny public access to profiles"
ON public.profiles
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Fix: Allow users to view their own activity logs
CREATE POLICY "Users can view own activity logs"
ON public.activity_logs
FOR SELECT
USING (auth.uid() = user_id);
