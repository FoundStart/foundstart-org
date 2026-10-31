-- Server-only throttle state for the submit-public-lead edge function.
-- Stores HMAC-SHA256'd IPs (never raw), keyed by hourly window.
-- Retention honesty: cleanup inside throttle_hit() is opportunistic - it runs on hits, so during
-- quiet periods old hourly rows linger until the next hit. Those rows are inert (their window has
-- passed, so they never affect new counts). A pg_cron daily delete is the complete fix and is
-- listed as an optional deploy-time follow-up; it is not required for correctness.
-- No table access for anon/authenticated at all; only the service role calls throttle_hit().

create table public.submit_throttle (
  ip_hash text not null,
  kind text not null check (kind in ('quiz', 'newsletter')),
  window_start timestamptz not null,
  count integer not null default 1,
  primary key (ip_hash, kind, window_start)
);

alter table public.submit_throttle enable row level security;
revoke all on public.submit_throttle from anon, authenticated;

-- Atomic, fail-closed throttle: single upsert returns the incremented count.
create or replace function public.throttle_hit(p_ip_hash text, p_kind text, p_max integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.submit_throttle (ip_hash, kind, window_start, count)
  values (p_ip_hash, p_kind, date_trunc('hour', now()), 1)
  on conflict (ip_hash, kind, window_start)
  do update set count = submit_throttle.count + 1
  returning count into v_count;
  delete from public.submit_throttle where window_start < now() - interval '24 hours';
  return v_count <= p_max;
end;
$$;

revoke all on function public.throttle_hit(text, text, integer) from public, anon, authenticated;
grant execute on function public.throttle_hit(text, text, integer) to service_role;
