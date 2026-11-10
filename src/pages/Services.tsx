import FormationScope from '@/components/FormationScope';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, CreditCard, FolderOpen, LayoutDashboard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { formationCountries, minPrice } from '@/data/formationCatalog';
import { catalogT } from '@/data/formationCatalogAr';

// One service: company formation. Prices come straight from the formation catalog.
const Services = () => {
  const L = useL();
  const { language, isRTL } = useTranslation();

  const included = [
    { i: <Building2 className="h-5 w-5" />, t: L('Company formation in 9 countries', 'تأسيس شركة في 9 دول'), d: L('Choose a country and company type. Service fees exclude government charges and renewals.', 'اختر الدولة ونوع الشركة. أتعاب الخدمة لا تشمل الرسوم الحكومية والتجديد.') },
    { i: <CreditCard className="h-5 w-5" />, t: L('Pay online', 'ادفع أونلاين'), d: L('Secure card checkout through Stripe.', 'دفع آمن بالبطاقة عبر Stripe.') },
    { i: <FolderOpen className="h-5 w-5" />, t: L('Documents in one place', 'المستندات في مكان واحد'), d: L('Upload your documents privately from your dashboard.', 'ارفع مستنداتك بشكل خاص من لوحة التحكم.') },
    { i: <LayoutDashboard className="h-5 w-5" />, t: L('Track your request', 'تابع طلبك'), d: L('See all your orders and companies with their recorded status.', 'شاهد كل طلباتك وشركاتك بالحالة المسجلة.') },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{L('FoundStart Services: compare formation in 9 countries', 'خدمات FoundStart: قارن التأسيس في 9 دول')}</title>
        <meta name="description" content={L('Compare formation in 9 countries. Confirm service scope, government charges, renewals and refund terms before payment.', 'قارن التأسيس في 9 دول. أكد نطاق الخدمة والرسوم الحكومية والتجديد والاسترداد قبل الدفع.')} />
      </Helmet>
      <Header />
      <main>
        <PageHero
          title={L('Open Your Company', 'افتح شركتك')}
          highlight={L('In 9 Countries', 'في 9 دول')}
          subtitle={L('One service: company formation, with our own clear prices.', 'خدمة واحدة: تأسيس الشركات، بأسعارنا الواضحة.')}
        />

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
              {included.map((x, n) => (
                <Card key={n}><CardContent className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{x.i}</div>
                  <h3 className="mb-1 font-semibold">{x.t}</h3>
                  <p className="text-sm text-muted-foreground">{x.d}</p>
                </CardContent></Card>
              ))}
            </div>

              <FormationScope />
            <h2 className="mb-5 text-2xl font-bold">{L('Countries and prices', 'الدول والأسعار')}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formationCountries.map(c => (
                <Link key={c.code} to={`/country/${c.code.toUpperCase()}`} className="group rounded-xl border bg-card p-5 transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{c.flag} {catalogT(c.name, language)}</div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{c.entities.map(e => catalogT(e.name, language)).join(' · ')}</div>
                  <div className="mt-3 font-semibold text-primary">{L('From', 'من')} ${minPrice(c)}</div>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {L('Prices are FoundStart service fees in USD. Government and notary fees, where they apply, are separate; obtain a written breakdown before payment.', 'الأسعار هي رسوم خدمة FoundStart بالدولار. الرسوم الحكومية ورسوم التوثيق، حيث تنطبق، منفصلة؛ اطلب بيانها كتابة قبل الدفع.')}
            </p>

            <div className="mt-12 rounded-2xl bg-muted/30 p-8 text-center">
              <h3 className="mb-2 text-2xl font-bold">{L('Ready to start?', 'جاهز تبدأ؟')}</h3>
              <p className="mx-auto mb-5 max-w-xl text-muted-foreground">{L('Confirm your country, service scope and full costs before payment.', 'أكد الدولة ونطاق الخدمة والتكاليف الكاملة قبل الدفع.')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild><Link to="/auth?mode=signup">{L('Register & Start Formation', 'سجل وابدأ التأسيس')}</Link></Button>
                <Button size="lg" variant="outline" asChild><Link to="/pricing-calculator">{L('Price calculator', 'حاسبة الأسعار')}</Link></Button>
                <WhatsAppButton variant="outline" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
