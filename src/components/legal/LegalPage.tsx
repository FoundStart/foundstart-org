import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/contexts/TranslationContext';

export interface LegalSection {
  title: [string, string];
  paras?: [string, string][];
  items?: [string, string][];
}

interface Props {
  path: string;
  title: [string, string];
  intro: [string, string];
  updated: [string, string];
  sections: LegalSection[];
  note: [string, string];
}

const LegalPage = ({ path, title, intro, updated, sections, note }: Props) => {
  const { isRTL } = useTranslation();
  const i = isRTL ? 1 : 0;
  const Arrow = isRTL ? ArrowRight : ArrowLeft;
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{`${title[i]} | FoundStart`}</title>
        <meta name="description" content={intro[i].slice(0, 155)} />
        <link rel="canonical" href={`https://www.foundstart.org${path}`} />
      </Helmet>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link to="/"><Arrow className="w-4 h-4 mx-2" />{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</Link>
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{title[i]}</h1>
            <p className="text-muted-foreground mb-6">{updated[i]}</p>
            <p className="text-lg mb-10">{intro[i]}</p>
            {sections.map((sec, n) => (
              <section key={n} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{n + 1}. {sec.title[i]}</h2>
                {sec.paras?.map((p, k) => <p key={k} className="mb-4 leading-relaxed">{p[i]}</p>)}
                {sec.items && (
                  <ul className={`list-disc mb-4 space-y-1 ${isRTL ? 'pr-6' : 'pl-6'}`}>
                    {sec.items.map((p, k) => <li key={k}>{p[i]}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <section className="mb-8 rounded-lg border border-border bg-muted/30 p-5">
              <h2 className="text-xl font-semibold mb-2">{isRTL ? 'تواصل معنا' : 'Contact us'}</h2>
              <p className="mb-3">{note[i]}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild><Link to="/contact-us">{isRTL ? 'صفحة التواصل' : 'Contact page'}</Link></Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/201002905764" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
