import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import TurnstileWidget from '@/components/TurnstileWidget';
import Footer from '@/components/Footer';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { Compass, ArrowRight, ArrowLeft, Info } from 'lucide-react';

// Educational discovery quiz. No prices, timelines, or "best country" claims:
// matches are computed from the visitor's own stated priorities against general,
// publicly documented registry characteristics, and are presented as a starting
// point for research - never as a recommendation.

type CountryKey = 'USA' | 'UK' | 'Estonia' | 'Finland' | 'Sweden' | 'Latvia' | 'Lithuania' | 'Ireland' | 'Egypt';

interface Option { label: [string, string]; weights: Partial<Record<CountryKey, number>> }
interface Question { q: [string, string]; options: Option[] }

const QUESTIONS: Question[] = [
  {
    q: ['What matters most to you?', 'إيه الأهم بالنسبة لك؟'],
    options: [
      { label: ['Access to the US market', 'الوصول للسوق الأمريكي'], weights: { USA: 3 } },
      { label: ['A base inside the EU', 'مقر داخل الاتحاد الأوروبي'], weights: { Estonia: 2, Ireland: 2, Finland: 1, Sweden: 1, Latvia: 1, Lithuania: 1 } },
      { label: ['Operating in the MENA region', 'العمل في منطقة الشرق الأوسط وشمال أفريقيا'], weights: { Egypt: 3 } },
      { label: ['An English-language process', 'إجراءات باللغة الإنجليزية'], weights: { USA: 2, UK: 2, Ireland: 2 } },
    ],
  },
  {
    q: ['How do you prefer to manage the company?', 'تفضل تدير شركتك إزاي؟'],
    options: [
      { label: ['Fully online, remote-first', 'أونلاين بالكامل وعن بُعد'], weights: { Estonia: 3, UK: 2, Finland: 2, Lithuania: 1 } },
      { label: ['Online filing is enough', 'التقديم الإلكتروني يكفي'], weights: { UK: 2, USA: 1, Estonia: 1, Ireland: 1 } },
      { label: ['I can handle local in-person steps', 'أقدر أتعامل مع إجراءات محلية حضورية'], weights: { Egypt: 2, Sweden: 1, Latvia: 1 } },
    ],
  },
  {
    q: ['Which language are you most comfortable with for official paperwork?', 'أنسب لغة ليك في الأوراق الرسمية؟'],
    options: [
      { label: ['Arabic', 'العربية'], weights: { Egypt: 3 } },
      { label: ['English', 'الإنجليزية'], weights: { USA: 2, UK: 2, Ireland: 2, Estonia: 1 } },
      { label: ['Either is fine', 'أي لغة مناسبة'], weights: { Estonia: 1, Finland: 1, Latvia: 1, Lithuania: 1, Sweden: 1 } },
    ],
  },
  {
    q: ['Who are your expected customers?', 'مين عملاؤك المتوقعين؟'],
    options: [
      { label: ['Mostly in North America', 'أغلبهم في أمريكا الشمالية'], weights: { USA: 3, UK: 1 } },
      { label: ['Mostly in Europe', 'أغلبهم في أوروبا'], weights: { Estonia: 2, Ireland: 2, Finland: 1, Sweden: 1, Latvia: 1, Lithuania: 1 } },
      { label: ['Mostly in Egypt / MENA', 'أغلبهم في مصر / المنطقة'], weights: { Egypt: 3 } },
      { label: ['Global / online from anywhere', 'عالميين / أونلاين من أي مكان'], weights: { Estonia: 2, UK: 2, USA: 1 } },
    ],
  },
  {
    q: ['How do you feel about paperwork and formality?', 'إيه رأيك في الإجراءات والرسميات؟'],
    options: [
      { label: ['I want the simplest documented online process', 'عايز أبسط إجراءات إلكترونية موثقة'], weights: { UK: 2, Estonia: 2, Lithuania: 1 } },
      { label: ['I am fine with standard registry procedures', 'ماشي مع الإجراءات المعتادة للسجلات'], weights: { USA: 1, Finland: 1, Sweden: 1, Latvia: 1, Ireland: 1 } },
      { label: ['I prefer local guidance and support', 'أفضل إرشاد ودعم محلي'], weights: { Egypt: 2 } },
    ],
  },
];

const COUNTRY_INFO: Record<CountryKey, { name: [string, string]; trait: [string, string] }> = {
  USA: { name: ['United States', 'الولايات المتحدة'], trait: ['State-level formation options and a large domestic market.', 'خيارات تأسيس على مستوى الولايات وسوق محلي كبير.'] },
  UK: { name: ['United Kingdom', 'المملكة المتحدة'], trait: ['Online incorporation through Companies House, in English.', 'تأسيس إلكتروني عبر Companies House باللغة الإنجليزية.'] },
  Estonia: { name: ['Estonia', 'إستونيا'], trait: ['Digital-first e-Business Register, built for remote administration.', 'سجل تجاري إلكتروني متقدم مصمم للإدارة عن بُعد.'] },
  Finland: { name: ['Finland', 'فنلندا'], trait: ['Online Trade Register services via PRH.', 'خدمات سجل تجاري إلكترونية عبر PRH.'] },
  Sweden: { name: ['Sweden', 'السويد'], trait: ['Established registry (Bolagsverket) with standard templates.', 'سجل معتمد (Bolagsverket) بنماذج قياسية.'] },
  Latvia: { name: ['Latvia', 'لاتفيا'], trait: ['Enterprise Register with English-language service information.', 'سجل شركات يوفر معلومات خدمات بالإنجليزية.'] },
  Lithuania: { name: ['Lithuania', 'ليتوانيا'], trait: ['Registru centras online services for company incorporation.', 'خدمات إلكترونية من Registru centras لتأسيس الشركات.'] },
  Ireland: { name: ['Ireland', 'أيرلندا'], trait: ['Companies Registration Office forms; English-language EU base.', 'نماذج مكتب تسجيل الشركات؛ قاعدة أوروبية باللغة الإنجليزية.'] },
  Egypt: { name: ['Egypt', 'مصر'], trait: ['GAFI investor eServices, Arabic/English, local MENA presence.', 'خدمات إلكترونية للمستثمرين من هيئة الاستثمار (GAFI) بالعربية والإنجليزية وحضور محلي في المنطقة.'] },
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const Quiz = () => {
  const L = useL();
  const { language } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const finished = answers.length === QUESTIONS.length;

  const results = useMemo(() => {
    if (!finished) return [];
    const score = new Map<CountryKey, number>();
    answers.forEach((optIdx, qIdx) => {
      const w = QUESTIONS[qIdx].options[optIdx].weights;
      (Object.keys(w) as CountryKey[]).forEach((c) => score.set(c, (score.get(c) || 0) + (w[c] || 0)));
    });
    return [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c]) => c);
  }, [finished, answers]);

  const pick = (optIdx: number) => {
    setAnswers((a) => [...a, optIdx]);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (!answers.length) return;
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => s - 1);
  };

  const restart = () => { setAnswers([]); setStep(0); setSaveState('idle'); setName(''); setEmail(''); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) { setSaveState('done'); return; } // honeypot: pretend success, store nothing
    const em = email.trim().toLowerCase();
    if (!name.trim() || name.trim().length > 120 || !EMAIL_RE.test(em)) { setSaveState('error'); return; }
    setSaveState('saving');
    const { error } = await supabase.functions.invoke('submit-public-lead', {
      body: { kind: 'quiz', name: name.trim(), email: em, language, website, answers, turnstile_token: turnstileToken },
    });
    setSaveState(error ? 'error' : 'done');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5" /> {L('Which country could fit your business?', 'أنسب دولة ممكن تناسب مشروعك؟')}</CardTitle>
            <CardDescription>{L('An educational discovery quiz. Answer a few questions and see which countries match your stated priorities.', 'كويز استكشافي تعليمي. جاوب على كام سؤال وشوف الدول اللي بتطابق أولوياتك.')}</CardDescription>
          </CardHeader>
          <CardContent>
            {!finished ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{L('Question', 'سؤال')} {step + 1} / {QUESTIONS.length}</p>
                <h2 className="text-lg font-semibold">{L(QUESTIONS[step].q[0], QUESTIONS[step].q[1])}</h2>
                <div className="space-y-2">
                  {QUESTIONS[step].options.map((o, i) => (
                    <button key={i} onClick={() => pick(i)} className="w-full text-start rounded-md border p-3 hover:bg-muted/50 transition-colors">
                      {L(o.label[0], o.label[1])}
                    </button>
                  ))}
                </div>
                {step > 0 && <Button variant="ghost" onClick={back}><ArrowLeft className="h-4 w-4 me-1" /> {L('Back', 'رجوع')}</Button>}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{L('Countries matching your answers', 'الدول المطابقة لإجاباتك')}</h2>
                <div className="rounded-md bg-muted/50 p-3 flex gap-2 text-xs text-muted-foreground">
                  <Info className="h-4 w-4 shrink-0" />
                  <p>{L('This is an educational matching based on your answers and general, publicly documented registry characteristics. It is not a verified recommendation and not legal, tax or financial advice. Requirements, fees and processes change - verify with official sources and a qualified advisor before deciding.', 'دي مطابقة تعليمية مبنية على إجاباتك وخصائص عامة موثقة للسجلات الرسمية. مش توصية مؤكدة ومش استشارة قانونية أو ضريبية أو مالية. المتطلبات والرسوم والإجراءات بتتغير - اتأكد من المصادر الرسمية ومستشار مؤهل قبل أي قرار.')}</p>
                </div>
                <ul className="space-y-2">
                  {results.map((c) => (
                    <li key={c} className="rounded-md border p-3">
                      <p className="font-medium">{L(COUNTRY_INFO[c].name[0], COUNTRY_INFO[c].name[1])}</p>
                      <p className="text-sm text-muted-foreground">{L(COUNTRY_INFO[c].trait[0], COUNTRY_INFO[c].trait[1])}</p>
                      <Button asChild variant="link" className="px-0 h-auto">
                        <Link to="/countries">{L('Explore country pages', 'تصفح صفحات الدول')} <ArrowRight className="h-3 w-3 ms-1" /></Link>
                      </Button>
                    </li>
                  ))}
                </ul>
                {!import.meta.env.VITE_TURNSTILE_SITE_KEY ? (
                  <p className="text-sm text-muted-foreground border-t pt-4">{L('Saving your result is temporarily unavailable.', 'حفظ النتيجة غير متاح حاليًا.')}</p>
                ) : saveState === 'done' ? (
                  <p className="text-sm text-green-600">{L('Received. Your details have been saved.', 'تم الاستلام. بياناتك اتحفظت.')}</p>
                ) : (
                  <form onSubmit={save} className="space-y-2 border-t pt-4">
                    <p className="text-sm text-muted-foreground">{L('Optionally, leave your name and email to save your result.', 'اختياري: سيب اسمك وإيميلك عشان تحفظ نتيجتك.')}</p>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={L('Name', 'الاسم')} required maxLength={120} />
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    <TurnstileWidget onToken={setTurnstileToken} action="quiz-lead" />
                    <Button type="submit" disabled={saveState === 'saving' || !turnstileToken}>{saveState === 'saving' ? L('Saving...', 'جاري الحفظ...') : L('Save my result', 'احفظ نتيجتي')}</Button>
                    {saveState === 'error' && <p className="text-sm text-destructive">{L('Check your details and try again.', 'اتأكد من بياناتك وحاول تاني.')}</p>}
                  </form>
                )}
                <Button variant="ghost" onClick={restart}>{L('Retake the quiz', 'أعد الكويز')}</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
