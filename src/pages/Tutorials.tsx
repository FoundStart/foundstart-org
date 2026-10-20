import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Play, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { walkthroughVideo } from '@/data/walkthroughVideo';
import { countryVideos } from '@/data/countryVideos';
import { formationCountries } from '@/data/formationCatalog';
import { catalogT } from '@/data/formationCatalogAr';

const Tutorials = () => {
  const L = useL();
  const { language, isRTL } = useTranslation();
  const ar = language === 'ar';
  const mainId = (ar ? walkthroughVideo.ar : walkthroughVideo.en) || walkthroughVideo.en;

  // Real country videos only, in catalog order.
  const countryList = formationCountries
    .map(c => ({ c, id: countryVideos[c.code.toUpperCase()]?.[ar ? 'ar' : 'en'] || countryVideos[c.code.toUpperCase()]?.en }))
    .filter(x => !!x.id);

  const steps = [
    L('Register your free account', 'سجل حسابك المجاني'),
    L('Choose a country and company type', 'اختر الدولة ونوع الشركة'),
    L('Enter your details and review the price', 'أدخل بياناتك وراجع السعر'),
    L('Pay securely online by card', 'ادفع بأمان أونلاين بالبطاقة'),
    L('Upload documents and track every step in your dashboard', 'ارفع المستندات وتابع كل خطوة من لوحة التحكم'),
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{L('FoundStart Tutorials: open a company step by step', 'شروحات FoundStart: افتح شركتك خطوة بخطوة')}</title>
        <meta name="description" content={L('Watch the full FoundStart walkthrough and country videos. Register, pick a country, pay online and track your company formation.', 'شاهد شرح FoundStart الكامل وفيديوهات الدول. سجل، اختر دولة، ادفع أونلاين وتابع تأسيس شركتك.')} />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text">{L('FoundStart Tutorials', 'شروحات FoundStart')}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {L('Open a company in any country: watch the full walkthrough, then see each country step by step.', 'افتح شركتك في أي دولة: شاهد الشرح الكامل ثم تعرف على كل دولة خطوة بخطوة.')}
          </p>
        </div>

        <Card className="mb-10 overflow-hidden border-primary/20">
          <div className="aspect-video bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${mainId}`}
              title={L('FoundStart full walkthrough', 'شرح FoundStart الكامل')}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <CardContent className="p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-1">{L('Full walkthrough: open a company in any country', 'الشرح الكامل: افتح شركتك في أي دولة')}</h2>
            {!walkthroughVideo.ar && ar && (
              <p className="text-sm text-muted-foreground">{L('', 'الفيديو الحالي بالإنجليزية. النسخة العربية قريباً.')}</p>
            )}
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">{L('How it works', 'كيف تعمل الخدمة')}</h2>
        <ol className="mb-12 grid gap-3 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={i} className="rounded-xl border bg-card p-4 text-sm">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{i + 1}</div>
              {s}
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold mb-4">{L('Videos by country', 'فيديوهات الدول')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {countryList.map(({ c, id }) => (
            <a key={c.code} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
              <div className="relative aspect-video">
                <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"><Play className="h-5 w-5 text-white" fill="currentColor" /></div>
                </div>
              </div>
              <div className="p-4 font-semibold">{c.flag} {catalogT(c.name, language)}</div>
            </a>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{L('Ready to start?', 'جاهز تبدأ؟')}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{L('Register, choose your country and track your formation from your dashboard.', 'سجل، اختر دولتك وتابع تأسيس شركتك من لوحة التحكم.')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild><Link to="/auth?mode=signup">{L('Register & Start Formation', 'سجل وابدأ التأسيس')} <ArrowRight className="ms-2 h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/countries">{L('Countries & prices', 'الدول والأسعار')}</Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/faq">{L('FAQ', 'الأسئلة الشائعة')}</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorials;
