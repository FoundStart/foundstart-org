import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ExternalLink, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

// Real partners already listed on FoundStart (same links as the partner pages).
type Fin = { name: string; en: string; ar: string; url: string };
const gateways: Fin[] = [
  { name: 'Stripe', en: 'Payment gateway: accept card payments online', ar: 'بوابة دفع: استقبل مدفوعات البطاقات أونلاين', url: 'https://stripe.com' },
];
const banks: Fin[] = [
  { name: 'Mercury', en: 'US business bank account', ar: 'حساب بنكي أمريكي للأعمال', url: 'https://shortet.com/Mercury' },
  { name: 'Wise', en: 'Multi-currency account for international transfers', ar: 'حساب متعدد العملات للتحويلات الدولية', url: 'https://shortet.com/Wise' },
  { name: 'WorldFirst', en: 'Global business account for cross-border payments', ar: 'حساب أعمال عالمي للمدفوعات عبر الحدود', url: 'https://shortet.com/Worldfirst' },
  { name: 'Kast', en: 'USD account and virtual card', ar: 'حساب دولار وبطاقة افتراضية', url: 'https://shortet.com/Kast' },
  { name: 'Grey', en: 'Global accounts to receive international payments', ar: 'حسابات عالمية لاستقبال المدفوعات الدولية', url: 'https://shortet.com/Grey' },
  { name: 'Novel Bank', en: 'Online bank account', ar: 'حساب بنكي أونلاين', url: 'https://shortet.com/Novel' },
];
const wallets: Fin[] = [
  { name: 'Payeer', en: 'Digital wallet', ar: 'محفظة رقمية', url: 'https://shortet.com/Payeer' },
  { name: 'Airtm', en: 'Digital wallet', ar: 'محفظة رقمية', url: 'https://shortet.com/airtm' },
  { name: 'RedotPay', en: 'Digital wallet and card', ar: 'محفظة رقمية وبطاقة', url: 'https://shortet.com/RedotPay' },
];

const Section = ({ icon: Icon, title, items }: { icon: any; title: string; items: Fin[] }) => (
  <section className="space-y-4">
    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2"><Icon className="w-6 h-6 text-primary" />{title}</h2>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <Card key={f.name}><CardContent className="p-4 space-y-2">
          <div className="font-semibold">{f.name}</div>
          <Desc f={f} />
          <a href={f.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">{f.name}<ExternalLink className="w-3.5 h-3.5" /></a>
        </CardContent></Card>
      ))}
    </div>
  </section>
);
const Desc = ({ f }: { f: Fin }) => {
  const { isRTL } = useTranslation();
  return <p className="text-sm text-muted-foreground">{isRTL ? f.ar : f.en}</p>;
};

const Fintech = () => {
  const { isRTL } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">{isRTL ? 'طرق الدفع وحلول الفينتك' : 'Payment ways & fintech solutions'}</h1>
            <p className="text-muted-foreground text-lg">
              {isRTL
                ? 'بعد ما تفتح شركتك، تحتاج طريقة تستقبل بها فلوسك. دي بوابات الدفع والحسابات البنكية والمحافظ التي نوصي بها من شركائنا، بروابطنا المعتادة.'
                : 'Once your company is open, you need a way to get paid. These are the payment gateways, business bank accounts and wallets we recommend from our partners, through our usual links.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button size="lg" asChild><a href="#gateways">{isRTL ? 'شوف طرق الدفع' : 'See payment options'}<CreditCard className="w-4 h-4 ml-2" /></a></Button>
              <Button size="lg" variant="outline" asChild><Link to="/countries">{isRTL ? 'افتح شركتك عبر حلول الدول' : 'Open your company via our country solutions'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
          </div>
          <div id="gateways" className="space-y-10 scroll-mt-24">
            <Section icon={CreditCard} title={isRTL ? 'بوابات الدفع' : 'Payment gateways'} items={gateways} />
            <Section icon={Landmark} title={isRTL ? 'حسابات بنكية للأعمال' : 'Business bank accounts'} items={banks} />
            <Section icon={Wallet} title={isRTL ? 'محافظ رقمية' : 'Digital wallets'} items={wallets} />
          </div>
          <div className="text-center py-10 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl space-y-4">
            <h2 className="text-2xl font-bold">{isRTL ? 'لسه مفتحتش شركتك؟' : "Haven't opened your company yet?"}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{isRTL ? 'افتحها مع FoundStart في 10 دول بسعر واضح واحد، وبعدها فعّل طرق الدفع دي.' : 'Open it with FoundStart in 10 countries at one clear price, then set up these payment ways.'}</p>
            <Button size="lg" asChild><Link to="/countries">{isRTL ? 'الدول والأسعار' : 'Countries & prices'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Fintech;
