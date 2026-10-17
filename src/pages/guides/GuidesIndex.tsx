import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bot, Building2, Code2, Megaphone, Workflow } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/TranslationContext';
import { guides } from '@/data/guidesData';

const icons: Record<string, typeof Building2> = { Building2, Bot, Code2, Megaphone, Workflow };

const GuidesIndex = () => {
  const { language, isRTL } = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">
            {language === 'ar' ? 'أدلة المؤسسين المجانية' : 'Free Founder Guides'}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {language === 'ar'
              ? 'تعلّم إزاي تأسس شركة، تبني بالذكاء الاصطناعي، وتسوّق وتدير شغلك - خطوة بخطوة وبأدوات تبدأ بيها مجانًا.'
              : 'Learn how to register a company, build with AI, market and run your work - step by step, with tools you can start for free.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = icons[guide.icon] ?? Building2;
            return (
              <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{guide.title[language]}</CardTitle>
                    <CardDescription>{guide.description[language]}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {language === 'ar' ? 'اقرأ الدليل' : 'Read the guide'}
                      <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-rotate-180" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesIndex;
