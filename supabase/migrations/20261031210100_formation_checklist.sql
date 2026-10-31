-- Per-company formation checklist progress. Authenticated owners only;
-- ownership enforced via companies.user_id on every read AND write; step keys allowlisted.

create table public.formation_checklist (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  step_key text not null check (step_key in ('choose_country','choose_entity','submit_application','pay_fees','receive_docs','tax_id','bank_account')),
  done boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (company_id, step_key)
);

alter table public.formation_checklist enable row level security;

revoke all on public.formation_checklist from anon;
grant select, insert, update, delete on public.formation_checklist to authenticated;

create policy "Owners manage their own checklist"
  on public.formation_checklist for all to authenticated
  using (
    user_id = auth.uid()
    and exists (select 1 from public.companies c where c.id = company_id and c.user_id = auth.uid())
  )
  with check (
    user_id = auth.uid()
    and exists (select 1 from public.companies c where c.id = company_id and c.user_id = auth.uid())
  );

create policy "Admins can view checklists"
  on public.formation_checklist for select to authenticated
  using (public.has_role(auth.uid(), 'admin'::app_role));
