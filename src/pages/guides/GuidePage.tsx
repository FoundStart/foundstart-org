import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/contexts/TranslationContext';
import { guides } from '@/data/guidesData';
import NotFound from '@/pages/NotFound';

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, isRTL } = useTranslation();
  const guide = guides.find((g) => g.slug === slug);
  const Arrow = isRTL ? ArrowRight : ArrowLeft;

  if (!guide) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/guides">
            <Arrow className="h-4 w-4" />
            {language === 'ar' ? 'كل الأدلة' : 'All guides'}
          </Link>
        </Button>

        <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">{guide.title[language]}</h1>
        <p className="mb-12 text-lg text-muted-foreground">{guide.description[language]}</p>

        <div className="space-y-10">
          {guide.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="mb-3 text-2xl font-bold">{section.heading[language]}</h2>
              <p className="leading-relaxed text-muted-foreground">{section.body[language]}</p>
            </section>
          ))}
        </div>

        {guide.tools.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-bold">
              {language === 'ar' ? 'الأدوات اللي بنرشحها' : 'Tools we recommend'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {guide.tools.map((tool) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="flex items-start justify-between gap-3 p-4">
                      <div>
                        <p className="font-semibold">{tool.name}</p>
                        <p className="text-sm text-muted-foreground">{tool.note[language]}</p>
                      </div>
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 rounded-lg border bg-muted/30 p-6 text-center">
          <p className="mb-4 text-lg font-semibold">
            {language === 'ar'
              ? 'عايز حد يمشي معاك خطوة بخطوة؟'
              : 'Want someone to walk you through it?'}
          </p>
          <Button asChild>
            <Link to="/cofounder">
              {language === 'ar' ? 'اسأل الشريك المؤسس بالذكاء الاصطناعي' : 'Ask the AI Co-founder'}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;
