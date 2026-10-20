import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from '@/contexts/TranslationContext';

interface Msg { role: 'user' | 'assistant'; content: string }

// Formation helper: answers only from the FAQ and formation catalog (server side), limited per user per day.
const FormationHelper = () => {
  const { session } = useAuth();
  const { language, isRTL } = useTranslation();
  const { pathname } = useLocation();
  const ar = language === 'ar';
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [msgs, open]);

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/auth')) return null;

  const send = async () => {
    const q = text.trim();
    if (!q || busy || !session) return;
    const history = [...msgs, { role: 'user' as const, content: q }];
    setMsgs(history); setText(''); setBusy(true); setErr('');
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/formation-helper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ language, messages: history }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.status === 429) setErr(ar ? 'وصلت للحد اليومي من الرسائل. جرّب غداً أو راجع الأسئلة الشائعة.' : 'You reached today\'s message limit. Try again tomorrow or see the FAQ.');
      else if (!res.ok || !d.reply) setErr(ar ? 'حصل خطأ. جرّب مرة أخرى أو راجع الأسئلة الشائعة.' : 'Something went wrong. Try again or see the FAQ.');
      else setMsgs([...history, { role: 'assistant', content: d.reply }]);
    } catch {
      setErr(ar ? 'حصل خطأ في الاتصال.' : 'Connection error.');
    } finally { setBusy(false); }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={ar ? 'مساعد التأسيس' : 'Formation helper'}
          className="fixed bottom-24 lg:bottom-6 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-24 lg:bottom-6 end-4 z-50 flex h-[70vh] max-h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold">{ar ? 'مساعد التأسيس' : 'Formation helper'}</div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {!session ? (
              <div className="space-y-3 text-center">
                <p className="text-muted-foreground">{ar ? 'سجّل دخولك لتسأل مساعد التأسيس.' : 'Sign in to ask the formation helper.'}</p>
                <Link to="/auth?mode=signup" className="inline-block rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">{ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}</Link>
              </div>
            ) : (
              <>
                {msgs.length === 0 && <p className="text-muted-foreground">{ar ? 'اسألني عن الدول والأسعار والمستندات وخطوات التأسيس.' : 'Ask me about countries, prices, documents and the formation steps.'}</p>}
                {msgs.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-end' : ''}>
                    <div className={`inline-block max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-start ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{m.content}</div>
                    {m.role === 'assistant' && (
                      <div className="mt-2"><Link to="/auth?mode=signup" className="inline-block rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary">{ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}</Link></div>
                    )}
                  </div>
                ))}
                {busy && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {err && <p className="text-destructive">{err}</p>}
                <p className="text-xs text-muted-foreground">{ar ? 'معلومات عامة وليست استشارة قانونية أو ضريبية.' : 'General information, not legal or tax advice.'}</p>
                <div ref={end} />
              </>
            )}
          </div>
          {session && (
            <form className="flex gap-2 border-t p-3" onSubmit={e => { e.preventDefault(); send(); }}>
              <input value={text} onChange={e => setText(e.target.value)} maxLength={500} placeholder={ar ? 'اكتب سؤالك...' : 'Type your question...'} className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none" />
              <button type="submit" disabled={busy} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50" aria-label="Send"><Send className="h-4 w-4 rtl:rotate-180" /></button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FormationHelper;
