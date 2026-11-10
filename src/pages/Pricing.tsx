import ServicePrice, { ServicePriceText } from '@/components/ServicePrice';
import FormationScope from '@/components/FormationScope';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useL } from '@/hooks/useL';
import { formationCountries, minPrice } from '@/data/formationCatalog';
import { catalogT } from '@/data/formationCatalogAr';
import { useTranslation } from '@/contexts/TranslationContext';

// Prices come straight from the formation catalog, so this page always matches checkout.
const Pricing = () => {
  const L = useL();
  const { language } = useTranslation();
  const ct = (s: string) => catalogT(s, language);

  const included = [
    L('Register your company online in a few steps', 'سجل شركتك أونلاين في خطوات بسيطة'),
    L('Pay securely by card through Stripe', 'ادفع بأمان بالبطاقة عبر Stripe'),
    L('Track your request from your FoundStart dashboard', 'تابع طلبك من لوحة تحكم FoundStart'),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          title={L('Transparent', 'أسعار')}
          highlight={L('Pricing', 'واضحة')}
          subtitle={L(
            'FoundStart service fees by company type. Government charges and renewals are separate.',
            'أتعاب خدمة FoundStart حسب نوع الشركة. الرسوم الحكومية والتجديد منفصلة.'
          )}
        />

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">{L('Formation by Country', 'التأسيس حسب الدولة')}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {L('Open your company in any of our 9 countries. Base service fees are in USD; displayed conversions are indicative.', 'افتح شركتك في أي من دولنا التسع. أساس رسوم خدمة FoundStart بالدولار، والتحويل المعروض استرشادي.')}
              </p>
            </div>

            <Card className="mb-10 glass-card">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{L('How it works', 'كيف يعمل')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {included.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

              <FormationScope />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationCountries.map((c) => (
                <Card key={c.code} className="glass-card">
                  <CardHeader className="text-center pb-3">
                    <div className="text-4xl mb-2">{c.flag}</div>
                    <CardTitle className="text-lg">{ct(c.name)}</CardTitle>
                    <div className="text-sm text-muted-foreground">{L('from', 'من')} <span className="text-2xl font-bold gradient-text"><ServicePrice amount={minPrice(c)} /></span></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      {c.entities.map((e) => (
                        <div key={e.code} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{ct(e.name)}</span>
                          <span className="font-medium"><ServicePrice amount={e.price} /></span>
                        </div>
                      ))}
                    </div>
                    {c.note && <p className="text-xs text-muted-foreground">{L('Government, notary and registry fees are separate; request a written breakdown before payment.', 'الرسوم الحكومية ورسوم التوثيق والسجل منفصلة؛ اطلب بيانها كتابة قبل الدفع.')}</p>}
                    <Button asChild className="w-full">
                      <Link to={`/dashboard/formation?country=${c.code}`}>
                        {L('Start in', 'ابدأ في')} {ct(c.name)}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-10">
              {L('Prices are FoundStart service fees. Government and notary fees, where they apply, are separate; request a written breakdown before payment.', 'الأسعار هي رسوم خدمة FoundStart. الرسوم الحكومية ورسوم التوثيق، إن وجدت، منفصلة؛ اطلب بيانها كتابة قبل الدفع.')}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
