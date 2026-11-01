-- Quiz lead storage. Written ONLY by the submit-public-lead edge function (service role).
-- Direct table privileges are explicitly revoked from anon/authenticated; admin read via RLS.

create table public.quiz_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  language text not null default 'en' check (language in ('en', 'ar')),
  -- One answer index per quiz question, with per-question option ranges enforced:
  answers smallint[] not null check (
    array_length(answers, 1) = 5
    and answers[1] between 0 and 3
    and answers[2] between 0 and 2
    and answers[3] between 0 and 2
    and answers[4] between 0 and 3
    and answers[5] between 0 and 2
  ),
  -- Server-computed only; never trusted from the client:
  result_countries text[] check (result_countries is null or (array_length(result_countries, 1) <= 3 and result_countries <@ array['USA','UK','Estonia','Finland','Sweden','Latvia','Lithuania','Ireland','Egypt']::text[]))
);

alter table public.quiz_leads enable row level security;

revoke all on public.quiz_leads from anon, authenticated;
grant select on public.quiz_leads to authenticated; -- RLS below limits this to admins

create policy "Admins can view quiz leads"
  on public.quiz_leads for select to authenticated
  using (public.has_role(auth.uid(), 'admin'::app_role));
