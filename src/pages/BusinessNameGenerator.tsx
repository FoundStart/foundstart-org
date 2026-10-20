import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ExternalLink, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';

const BusinessNameGenerator = () => {
  const L = useL();
  const { isRTL } = useTranslation();

  const tips = [
    [L('Keep it short and easy to say', 'خلّيه قصير وسهل النطق'), L('Two or three syllables are easier to remember and to type.', 'مقطعان أو ثلاثة أسهل في الحفظ والكتابة.')],
    [L('Check the domain first', 'افحص الدومين أولاً'), L('Search the .com before you fall in love with a name. Our Domains page lists names that are ready to buy.', 'ابحث عن الـ .com قبل ما تتعلق بالاسم. صفحة الدومينات عندنا فيها أسماء جاهزة للشراء.')],
    [L('Check the name rules of your country', 'راجع قواعد الأسماء في دولتك'), L('Each registry has its own rules and may require endings such as LLC or Ltd. The registry decides if a name is available.', 'لكل سجل شركات قواعده وقد يطلب لاحقة مثل LLC أو Ltd. السجل هو اللي يقرر إن كان الاسم متاحاً.')],
    [L('Search for similar brands', 'ابحث عن علامات مشابهة'), L('Look for existing trademarks and social handles with a similar name before you register.', 'ابحث عن علامات تجارية وحسابات سوشيال بنفس الاسم أو قريبة منه قبل التسجيل.')],
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{L('Business Name Generator | FoundStart', 'مولّد أسماء الشركات | FoundStart')}</title>
        <meta name="description" content={L(
          'Find a brandable business name with AI name tools, then check the domain and open your company with FoundStart.',
          'اعثر على اسم تجاري مميز بأدوات الذكاء الاصطناعي، ثم افحص الدومين وافتح شركتك مع FoundStart.'
        )} />
        <link rel="canonical" href="https://www.foundstart.org/business-name-generator" />
      </Helmet>
      <Header />
      <main className="pb-20 md:pb-0">
        <PageHero
          title={L('Find the Perfect', 'اعثر على')}
          highlight={L('Business Name', 'اسم شركتك')}
          subtitle={L(
            'Generate brandable names with AI, then check the domain and register your company.',
            'ولّد أسماء مميزة بالذكاء الاصطناعي، ثم افحص الدومين وسجّل شركتك.'
          )}
        />
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl space-y-8">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h2 className="text-xl font-bold">{L('Name generators', 'أدوات توليد الأسماء')}</h2>
              <p className="text-muted-foreground">{L(
                'Type your keywords in one of these tools and get dozens of name ideas with domain hints.',
                'اكتب كلماتك المفتاحية في إحدى هذه الأدوات واحصل على عشرات الأفكار للأسماء مع تلميحات الدومين.'
              )}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1"><a href="https://namelizer.com/" target="_blank" rel="noopener noreferrer">NameLizer<ExternalLink className="w-4 h-4 ms-2" /></a></Button>
                <Button asChild variant="outline" className="flex-1"><a href="https://namelix.com/" target="_blank" rel="noopener noreferrer">Namelix<ExternalLink className="w-4 h-4 ms-2" /></a></Button>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" />{L('Before you pick a name', 'قبل ما تختار الاسم')}</h2>
              {tips.map(([h, p]) => (
                <div key={h} className="rounded-lg border bg-card p-4">
                  <div className="font-semibold">{h}</div>
                  <p className="text-sm text-muted-foreground mt-1">{p}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg"><Link to="/domains">{L('Browse domains', 'تصفح الدومينات')}</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/auth">{L('Register & start formation', 'سجل وابدأ التأسيس')}</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessNameGenerator;
