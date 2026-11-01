-- Newsletter subscription storage only (no sending implied).
-- Written ONLY by the submit-public-lead edge function (service role); admin read via RLS.

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  language text not null default 'en' check (language in ('en', 'ar')),
  source text not null default 'footer' check (source in ('footer', 'quiz')),
  confirmed boolean not null default false
);

alter table public.newsletter_subscribers enable row level security;

revoke all on public.newsletter_subscribers from anon, authenticated;
grant select on public.newsletter_subscribers to authenticated; -- RLS below limits this to admins

create policy "Admins can view subscribers"
  on public.newsletter_subscribers for select to authenticated
  using (public.has_role(auth.uid(), 'admin'::app_role));
