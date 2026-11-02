import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { Mail } from 'lucide-react';
import TurnstileWidget from './TurnstileWidget';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const NewsletterSubscribe = () => {
  const L = useL();
  const { language } = useTranslation();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, hidden from humans
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  // Turnstile normal widget is a fixed 300px wide; below a ~400px viewport the card
  // interior is narrower, so switch to the documented compact (newsletter) size.
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < 400);
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 400);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) { setState('done'); return; } // bot filled the honeypot: pretend success, store nothing
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value) || value.length > 254) { setState('error'); return; }
    setState('saving');
    const { error } = await supabase.functions.invoke('submit-public-lead', {
      body: { kind: 'newsletter', email: value, language, source: 'footer', website, turnstile_token: turnstileToken },
    });
    if (error) { setState('error'); return; }
    setState('done');
  };

  return (
    <div className="rounded-lg border p-6 max-w-xl mx-auto text-center">
      <h3 className="font-semibold flex items-center justify-center gap-2"><Mail className="h-4 w-4" /> {L('Email updates', 'التحديثات بالبريد')}</h3>
      <p className="text-sm text-muted-foreground mt-1">{L('Leave your email to receive updates from FoundStart by email.', 'سيب إيميلك عشان توصلك تحديثات FoundStart بالبريد.')}</p>
      {!import.meta.env.VITE_TURNSTILE_SITE_KEY ? (
        <p className="mt-4 text-sm text-muted-foreground">{L('Subscriptions are temporarily unavailable.', 'الاشتراك غير متاح حاليًا.')}</p>
      ) : state === 'done' ? (
        <p className="mt-4 text-sm text-green-600">{L('Received. Your email has been saved.', 'تم الاستلام. إيميلك اتحفظ.')}</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={L('you@example.com', 'you@example.com')} className="min-w-0 flex-1" />
            <Button type="submit" className="w-full shrink-0 sm:w-auto" disabled={state === 'saving' || !turnstileToken}>{state === 'saving' ? L('Saving...', 'جاري الحفظ...') : L('Subscribe', 'اشترك')}</Button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <TurnstileWidget onToken={setTurnstileToken} action="newsletter-subscribe" size={narrow ? 'compact' : 'normal'} />
            <p className="text-xs text-muted-foreground">{L('Security check by Cloudflare. This is not the subscription confirmation.', 'فحص أمان من Cloudflare. دي مش رسالة تأكيد الاشتراك.')}</p>
          </div>
        </form>
      )}
      {state === 'error' && <p className="mt-2 text-sm text-destructive">{L('Check the email and try again.', 'اتأكد من الإيميل وحاول تاني.')}</p>}
    </div>
  );
};

export default NewsletterSubscribe;
