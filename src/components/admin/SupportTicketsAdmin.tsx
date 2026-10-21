import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Ticket = { id: string; user_id: string; subject: string; status: string; priority: string; created_at: string };
type Msg = { id: string; user_id: string; message: string; created_at: string };

const STATUSES = ['open', 'in_progress', 'resolved', 'closed'];

const SupportTicketsAdmin = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState('');
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('support_tickets').select('id,user_id,subject,status,priority,created_at').order('created_at', { ascending: false });
    if (error) setErr(error.message);
    const list = (data || []) as Ticket[];
    setTickets(list);
    const ids = Array.from(new Set(list.map(t => t.user_id)));
    if (ids.length) {
      const { data: profs } = await supabase.from('profiles').select('user_id,email').in('user_id', ids);
      const m: Record<string, string> = {};
      (profs || []).forEach((p: any) => { m[p.user_id] = p.email; });
      setEmails(m);
    }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const openTicket = async (id: string) => {
    setOpen(id === open ? null : id);
    setReply('');
    const { data } = await supabase.from('ticket_messages').select('id,user_id,message,created_at').eq('ticket_id', id).order('created_at');
    setMsgs((data || []) as Msg[]);
  };
  const setStatus = async (id: string, status: string) => {
    const patch: any = { status };
    if (status === 'resolved' || status === 'closed') patch.resolved_at = new Date().toISOString();
    const { error } = await supabase.from('support_tickets').update(patch).eq('id', id);
    if (error) setErr(error.message);
    load();
  };
  const send = async (id: string) => {
    if (!reply.trim() || !user) return;
    const { error } = await supabase.from('ticket_messages').insert({ ticket_id: id, user_id: user.id, message: reply.trim() });
    if (error) { setErr(error.message); return; }
    setReply('');
    openTicket(id);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Support Tickets</h1>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {loading ? <p className="text-muted-foreground">Loading...</p> : tickets.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No support tickets yet.</CardContent></Card>
      ) : tickets.map(t => (
        <Card key={t.id}><CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button className="text-left" onClick={() => openTicket(t.id)}>
              <div className="font-medium">{t.subject}</div>
              <div className="text-xs text-muted-foreground">{emails[t.user_id] || t.user_id} - {new Date(t.created_at).toLocaleString('en-US')} - {t.priority}</div>
            </button>
            <select className="rounded-md border bg-background px-2 py-1 text-sm" value={t.status} onChange={e => setStatus(t.id, e.target.value)}>
              {STATUSES.concat(STATUSES.includes(t.status) ? [] : [t.status]).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {open === t.id && (
            <div className="space-y-2 border-t pt-3">
              {msgs.length === 0 && <p className="text-sm text-muted-foreground">No messages.</p>}
              {msgs.map(m => (
                <div key={m.id} className="rounded-md bg-muted p-2 text-sm">
                  <div className="text-xs text-muted-foreground">{m.user_id === t.user_id ? 'Customer' : 'Staff'} - {new Date(m.created_at).toLocaleString('en-US')}</div>
                  <div className="whitespace-pre-wrap">{m.message}</div>
                </div>
              ))}
              <Textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Reply to the customer" />
              <Button size="sm" onClick={() => send(t.id)} disabled={!reply.trim()}>Send reply</Button>
            </div>
          )}
        </CardContent></Card>
      ))}
    </div>
  );
};
export default SupportTicketsAdmin;
