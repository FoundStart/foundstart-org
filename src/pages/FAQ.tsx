import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { faqCategories, faqCount } from '@/data/faqData';

const FAQ = () => {
  const L = useL();
  const { language, isRTL } = useTranslation();
  const ar = language === 'ar';
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');

  const view = useMemo(() => {
    const s = query.trim().toLowerCase();
    return faqCategories
      .filter(c => cat === 'all' || c.id === cat)
      .map(c => ({
        id: c.id,
        title: ar ? c.titleAr : c.title,
        items: c.items
          .map(i => ({ q: ar ? i.qAr : i.q, a: ar ? i.aAr : i.a }))
          .filter(i => !s || i.q.toLowerCase().includes(s) || i.a.toLowerCase().includes(s)),
      }))
      .filter(c => c.items.length > 0);
  }, [query, cat, ar]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: ar ? 'ar' : 'en',
    mainEntity: faqCategories.flatMap(c =>
      c.items.map(i => ({
        '@type': 'Question',
        name: ar ? i.qAr : i.q,
        acceptedAnswer: { '@type': 'Answer', text: ar ? i.aAr : i.a },
      }))
    ),
  };

  const shown = view.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{L('FoundStart FAQ: company formation questions answered', 'الأسئلة الشائعة - FoundStart: إجابات عن تأسيس الشركات')}</title>
        <meta name="description" content={L(
          `${faqCount} answers about opening a company abroad: US LLC, UK, Canada, Estonia, Finland, Sweden, Latvia, Lithuania, Ireland and Egypt. Prices, documents, banking, taxes and how FoundStart works.`,
          `${faqCount} إجابة عن فتح شركة في الخارج: LLC أمريكية، بريطانيا، كندا، إستونيا، فنلندا، السويد، لاتفيا، ليتوانيا، أيرلندا ومصر. الأسعار والمستندات والبنوك والضرائب وطريقة عمل FoundStart.`
        )} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Header />
      <main>
        <PageHero
          title={L('Frequently Asked', 'الأسئلة')}
          highlight={L('Questions', 'الشائعة')}
          subtitle={L(
            'Answers about opening a company abroad: countries, prices, documents, banking and taxes.',
            'إجابات عن فتح شركة في الخارج: الدول والأسعار والمستندات والبنوك والضرائب.'
          )}
        />

        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={L('Search questions...', 'ابحث في الأسئلة...')}
                className="h-12 w-full rounded-xl border bg-background ps-10 pe-4 text-base outline-none focus:ring-2 focus:ring-primary/40"
                aria-label={L('Search questions', 'ابحث في الأسئلة')}
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {[{ id: 'all', t: L('All', 'الكل') }, ...faqCategories.map(c => ({ id: c.id, t: ar ? c.titleAr : c.title }))].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${cat === c.id ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                >
                  {c.t}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {view.map(section => (
                <div key={section.id} id={section.id}>
                  <h2 className="mb-2 text-xl font-semibold text-primary">{section.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((faq, index) => (
                      <AccordionItem key={index} value={`${section.id}-${index}`}>
                        <AccordionTrigger className="text-start">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
              {shown === 0 && (
                <p className="py-10 text-center text-muted-foreground">{L('No questions match your search.', 'لا توجد أسئلة مطابقة لبحثك.')}</p>
              )}
            </div>

            <p className="mt-10 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              {L(
                'General information only. This is not legal or tax advice. Rules, fees and requirements change, so confirm the details for your situation with a licensed professional.',
                'معلومات عامة فقط. هذه ليست استشارة قانونية أو ضريبية. القواعد والرسوم والمتطلبات تتغير، فتأكد من التفاصيل لحالتك مع مختص مرخص.'
              )}
            </p>

            <div className="mt-8 rounded-2xl bg-muted/30 p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">{L('Still have questions?', 'لسه عندك أسئلة؟')}</h3>
              <p className="mb-4 text-muted-foreground">{L('Message us and we will help.', 'راسلنا وسنساعدك.')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild><Link to="/contact-us">{L('Contact Us', 'تواصل معنا')}</Link></Button>
                <WhatsAppButton variant="outline" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild><Link to="/countries">{L('Countries & prices', 'الدول والأسعار')}</Link></Button>
              <Button variant="outline" asChild><Link to="/auth?mode=signup">{L('Register & Start Formation', 'سجل وابدأ التأسيس')}</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
