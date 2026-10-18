import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Globe, Megaphone, Search, Video, Palette, Bot, Mail, MessageCircle, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { waLink } from '@/lib/whatsapp';

type Pair = [string, string];
const services: { icon: any; title: Pair; text: Pair }[] = [
  { icon: Globe, title: ['Websites & web apps', 'مواقع وتطبيقات ويب'],
    text: ['Business sites, landing pages, dashboards and booking platforms built on Next.js/React with free-tier hosting to start.', 'مواقع شركات، صفحات هبوط، لوحات تحكم ومنصات حجز بتقنيات حديثة واستضافة مجانية للبداية.'] },
  { icon: Megaphone, title: ['Digital marketing', 'التسويق الرقمي'],
    text: ['Facebook/Instagram ad campaigns, audience research, creatives and weekly reporting.', 'حملات فيسبوك وإنستجرام، دراسة جمهور، تصاميم وتقارير أسبوعية.'] },
  { icon: Search, title: ['SEO & content', 'السيو والمحتوى'],
    text: ['Keyword research, articles in Arabic and English, on-page SEO and AI-search (AEO) optimisation.', 'بحث كلمات مفتاحية، مقالات عربي وإنجليزي، تحسين سيو وظهور في محركات الذكاء الاصطناعي.'] },
  { icon: Video, title: ['Video & short-form', 'فيديو وشورتس'],
    text: ['Promo videos, product explainers and AI-avatar shorts with Arabic/English voice-over.', 'فيديوهات ترويجية وشرح منتجات وشورتس بأفاتار ذكاء اصطناعي بتعليق عربي وإنجليزي.'] },
  { icon: Palette, title: ['Branding & design', 'الهوية والتصميم'],
    text: ['Logo, colours, social templates and a one-page brand guide.', 'شعار وألوان وقوالب سوشيال ودليل هوية من صفحة.'] },
  { icon: Bot, title: ['Automation & AI', 'الأتمتة والذكاء الاصطناعي'],
    text: ['Chatbots, lead capture, spreadsheets and workflow automation to save manual work.', 'شات بوت، التقاط عملاء، جداول وأتمتة مهام لتوفير الشغل اليدوي.'] },
];
const steps: Pair[] = [
  ['Brief: you tell us the goal; we reply with scope and quote.', 'الطلب: تحكي الهدف ونرد بنطاق الشغل وعرض السعر.'],
  ['Build: first version fast, shared for feedback.', 'التنفيذ: نسخة أولى سريعة ونشاركها للملاحظات.'],
  ['Revise: agreed rounds of changes.', 'التعديل: جولات تعديل متفق عليها.'],
  ['Deliver: files, access and handover notes.', 'التسليم: الملفات والصلاحيات وشرح الاستلام.'],
];

const DigitalServices = () => {
  const { isRTL } = useTranslation();
  const i = isRTL ? 1 : 0;
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', service: services[0].title[0], brief: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contact = form.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    setSending(true);
    const parts = form.name.trim().split(/\s+/);
    const { error } = await supabase.from('sales_inquiries').insert({
      first_name: (parts[0] || form.name).slice(0, 100),
      last_name: parts.slice(1).join(' ').slice(0, 100) || null,
      // the table requires an email; keep WhatsApp numbers in phone and use a placeholder address
      email: isEmail ? contact : 'whatsapp-lead@foundstart.org',
      phone: isEmail ? null : contact.slice(0, 40),
      package: 'digital-services',
      jurisdiction: form.service,
      message: form.brief.trim() || '-',
    });
    setSending(false);
    if (error) {
      toast({ title: isRTL ? 'تعذر الإرسال حاليًا' : 'Could not send right now', description: isRTL ? 'حاول لاحقًا أو راسلنا على واتساب.' : 'Please try again later or message us on WhatsApp.', variant: 'destructive' });
      return;
    }
    toast({ title: isRTL ? 'وصلنا طلبك' : 'Request received', description: isRTL ? 'وهنرد عليك قريبًا.' : 'We will reply soon.' });
    setForm({ name: '', contact: '', service: services[0].title[0], brief: '' });
  };

  const pageTitle = isRTL ? 'خدمات رقمية للأعمال | FoundStart' : 'Digital Services for Business | FoundStart';
  const desc = isRTL ? 'مواقع وتسويق ومحتوى وفيديو وهوية وأتمتة لشغلك، من الفكرة للتسليم. اطلب عرض سعر.' : 'Websites, marketing, content, video, branding and automation for your business, delivered end to end. Request a quote.';

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href="https://www.foundstart.org/digital-services" />
      </Helmet>
      <Header />
      <PageHero
        title={isRTL ? 'مواقع وتسويق ومحتوى' : 'Websites, marketing and content'}
        highlight={isRTL ? 'لشغلك، من الفكرة للتسليم' : 'for your business, end to end'}
        subtitle={isRTL ? 'شريك واحد للبرمجة والتسويق والمحتوى والفيديو. نطاق واضح، مخرجات محددة، تسليم سريع.' : 'One partner for code, marketing, content and video. Clear scope, fixed deliverables, fast turnaround.'}
      >
        <Button size="lg" asChild><a href="#quote">{isRTL ? 'اطلب عرض سعر' : 'Get a quote'}</a></Button>
      </PageHero>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 max-w-6xl">
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">{isRTL ? 'الخدمات' : 'Services'}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, k) => {
              const Icon = s.icon;
              return (
                <Card key={k} className="glass-card">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className="text-xl">{s.title[i]}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground">{s.text[i]}</p></CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">{isRTL ? 'طريقة الشغل' : 'How we work'}</h2>
          <ol className="max-w-2xl mx-auto space-y-4">
            {steps.map((s, k) => (
              <li key={k} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">{k + 1}</span>
                <span className="pt-1">{s[i]}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="quote" className="scroll-mt-24">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardHeader><CardTitle className="text-2xl">{isRTL ? 'اطلب عرض سعر' : 'Request a quote'}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ds-name">{isRTL ? 'الاسم' : 'Name'}</Label>
                  <Input id="ds-name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-contact">{isRTL ? 'إيميل أو واتساب' : 'Email or WhatsApp'}</Label>
                  <Input id="ds-contact" required maxLength={120} dir="ltr" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-service">{isRTL ? 'الخدمة' : 'Service'}</Label>
                  <select id="ds-service" className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    {services.map((s, k) => <option key={k} value={s.title[0]}>{s.title[i]}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-brief">{isRTL ? 'تفاصيل الطلب' : 'Project details'}</Label>
                  <Textarea id="ds-brief" rows={4} maxLength={2000} value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} />
                </div>
                <Button type="submit" className="w-full" disabled={sending}><Send className="w-4 h-4 mx-2" />{isRTL ? 'إرسال' : 'Send'}</Button>
              </form>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a className="flex items-center gap-2 text-primary hover:underline" href="mailto:Momo@foundstart.org"><Mail className="w-4 h-4" />Momo@foundstart.org</a>
                <a className="flex items-center gap-2 text-primary hover:underline" href={waLink(isRTL)} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /><span dir="ltr">WhatsApp +20 100 290 5764</span></a>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">{isRTL ? 'الأسعار بتتحدد لكل مشروع.' : 'Prices are quoted per project.'}</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DigitalServices;
