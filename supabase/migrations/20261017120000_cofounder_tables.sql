-- AI Co-founder: route-addressed threads + full AI SDK UI messages (ported from drizzle migration 0000)
CREATE TABLE IF NOT EXISTS public.cofounder_threads (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, title text NOT NULL DEFAULT 'New venture', kind text NOT NULL DEFAULT 'project' CHECK (kind IN ('ongoing','project')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cofounder_threads TO authenticated;
GRANT ALL ON public.cofounder_threads TO service_role;
ALTER TABLE public.cofounder_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own cofounder threads" ON public.cofounder_threads FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE UNIQUE INDEX IF NOT EXISTS cofounder_one_ongoing ON public.cofounder_threads(user_id) WHERE kind = 'ongoing';
CREATE TABLE IF NOT EXISTS public.cofounder_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), thread_id uuid NOT NULL REFERENCES public.cofounder_threads(id) ON DELETE CASCADE, user_id uuid NOT NULL, sdk_id text NOT NULL, message jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(thread_id, sdk_id));
GRANT SELECT ON public.cofounder_messages TO authenticated;
GRANT ALL ON public.cofounder_messages TO service_role;
ALTER TABLE public.cofounder_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own cofounder messages" ON public.cofounder_messages FOR SELECT TO authenticated USING (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.cofounder_threads t WHERE t.id = thread_id AND t.user_id = auth.uid()));
CREATE INDEX IF NOT EXISTS cofounder_messages_thread_time ON public.cofounder_messages(thread_id, created_at);
CREATE TABLE IF NOT EXISTS public.cofounder_gateway_state (id text PRIMARY KEY, status integer NOT NULL, reason text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.cofounder_gateway_state TO service_role;
ALTER TABLE public.cofounder_gateway_state ENABLE ROW LEVEL SECURITY;
