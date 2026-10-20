import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { useL } from '@/hooks/useL';

type Ticket = { id: string; subject: string; status: string | null; created_at: string | null };

const SupportCenter = () => {
  const L = useL();
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('support_tickets').select('id, subject, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false });
    setTickets((data as Ticket[]) ?? []);
  };
  useEffect(() => { load(); }, [user?.id]);

  const submit = async () => {
    if (!user || !subject.trim() || !message.trim()) {
      toast({ title: L('Please fill in the subject and your message', 'من فضلك اكتب الموضوع ورسالتك'), variant: 'destructive' });
      return;
    }
    setSending(true);
    const { data: t, error } = await supabase.from('support_tickets').insert({ user_id: user.id, subject: subject.trim() }).select('id').single();
    if (!error && t) {
      await (supabase as any).from('ticket_messages').insert({ ticket_id: t.id, user_id: user.id, message: message.trim() });
    }
    setSending(false);
    if (error) {
      toast({ title: L('Could not submit the ticket', 'تعذر إرسال التذكرة'), description: error.message, variant: 'destructive' });
      return;
    }
    setSubject(''); setMessage('');
    toast({ title: L('Ticket submitted', 'تم إرسال التذكرة') });
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Support Center', 'مركز الدعم')}</h1>
        <p className="text-muted-foreground">{L('Get help with your account', 'احصل على مساعدة بخصوص حسابك')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{L('Create Support Ticket', 'إنشاء تذكرة دعم')}</CardTitle>
          <CardDescription>{L("Describe your issue and we'll get back to you", 'اشرح مشكلتك وسنرد عليك')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder={L('Subject', 'الموضوع')} value={subject} onChange={(e) => setSubject(e.target.value)} />
          <Textarea placeholder={L('Describe your issue...', 'اشرح مشكلتك...')} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={submit} disabled={sending}><Send className="mx-2 h-4 w-4" />{sending ? L('Sending...', 'جاري الإرسال...') : L('Submit Ticket', 'إرسال التذكرة')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{L('Your Tickets', 'تذاكرك')}</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">{L('No support tickets yet.', 'لا توجد تذاكر دعم بعد.')}</p>
          ) : (
            <div className="space-y-2">
              {tickets.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{t.subject}</p>
                    <p className="text-xs text-muted-foreground">{t.created_at ? new Date(t.created_at).toLocaleDateString() : ''}</p>
                  </div>
                  <Badge variant="outline">{t.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCenter;
