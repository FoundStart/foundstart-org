-- Payouts require explicit acceptance of the affiliate terms (accepted_terms_at).
create or replace function public.aff_accept_terms() returns timestamptz
language plpgsql security definer set search_path to 'public' as $$
declare t timestamptz;
begin
  if auth.uid() is null then raise exception 'not_authenticated'; end if;
  update aff_affiliates set accepted_terms_at = coalesce(accepted_terms_at, now()) where user_id = auth.uid() returning accepted_terms_at into t;
  if t is null then raise exception 'not_affiliate'; end if;
  return t;
end $$;
grant execute on function public.aff_accept_terms() to authenticated;

-- auto-created affiliates have not accepted anything yet
create or replace function public.aff_make_affiliate(uid uuid) returns void
language plpgsql security definer set search_path to 'public','auth' as $$
declare c text; tries int := 0; nm text;
begin
  if uid is null or exists(select 1 from aff_affiliates where user_id = uid) then return; end if;
  select coalesce(nullif(left(raw_user_meta_data->>'full_name',80),''), split_part(email,'@',1)) into nm from auth.users where id = uid;
  loop
    c := substr(md5(random()::text || clock_timestamp()::text || uid::text),1,7);
    exit when not exists(select 1 from aff_affiliates where code = c or c = any(prev_codes));
    tries := tries + 1; if tries > 20 then return; end if;
  end loop;
  insert into aff_affiliates(user_id, code, status, display_name, accepted_terms_at, approved_at)
  values (uid, c, 'approved', nm, null, now()) on conflict do nothing;
end $$;

do $$ declare d text; begin
  select pg_get_functiondef('public.aff_request_payout'::regproc) into d;
  d := replace(d, $s$if a.status <> 'approved' then raise exception 'not_approved'; end if;$s$,
    $s$if a.status <> 'approved' then raise exception 'not_approved'; end if;
  if a.accepted_terms_at is null then raise exception 'terms_not_accepted'; end if;$s$);
  execute d;
end $$;
update public.aff_affiliates set accepted_terms_at = null;
