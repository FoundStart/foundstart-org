create policy "Admins can view all ticket messages" on public.ticket_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can reply to tickets" on public.ticket_messages for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role) and user_id = auth.uid());
