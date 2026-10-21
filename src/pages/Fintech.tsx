import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ExternalLink, CreditCard, Landmark, Wallet } from 'lucide-react';
import { useState } from 'react';
import { COUNTRY_AR_NAMES } from '@/data/partnerPricing';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/contexts/TranslationContext';

// Real partners already listed on FoundStart (same links as the partner pages).
type Fin = { name: string; en: string; ar: string; url: string; partner?: boolean; country?: string };
const localGateways: Fin[] = [
  { name: 'Paymob', country: 'EG', en: 'Egyptian payment gateway: online checkout and POS for stores', ar: 'بوابة دفع مصرية: دفع أونلاين وماكينات POS للمحلات', url: 'https://paymob.com/en' },
  { name: 'Fawry', country: 'EG', en: 'Egyptian e-payments network: online and retail payments', ar: 'شبكة مدفوعات إلكترونية مصرية: دفع أونلاين ومن نقاط البيع', url: 'https://www.fawry.com' },
  { name: 'Kashier', country: 'EG', en: 'Egyptian online payment platform for e-commerce and retail', ar: 'منصة دفع إلكتروني مصرية للتجارة الإلكترونية والمحلات', url: 'https://kashier.io' },
  { name: 'InstaPay', country: 'EG', en: 'Egypt: instant bank-to-bank transfers (not a merchant gateway)', ar: 'مصر: تحويلات فورية بين البنوك (ليست بوابة دفع للتجار)', url: 'https://www.instapay.eg/' },
  { name: 'PayTabs', country: 'EG', en: 'Payment infrastructure for merchants across MENA', ar: 'بنية مدفوعات للتجار في الشرق الأوسط وشمال أفريقيا', url: 'https://www.paytabs.com' },
  { name: 'MyFatoorah', en: 'Payment gateway for Kuwait and the GCC', ar: 'بوابة دفع للكويت ودول الخليج', url: 'https://myfatoorah.com' },
  { name: 'Tap', en: 'Payment gateway for the GCC (Saudi, Kuwait, UAE and more)', ar: 'بوابة دفع لدول الخليج (السعودية والكويت والإمارات وغيرها)', url: 'https://tap.company' },
  { name: 'HyperPay', en: 'Payment gateway serving MENA merchants', ar: 'بوابة دفع تخدم تجار الشرق الأوسط وشمال أفريقيا', url: 'https://hyperpay.com' },
  { name: 'Moyasar', en: 'Saudi payment gateway', ar: 'بوابة دفع سعودية', url: 'https://moyasar.com' },
  { name: 'Telr', en: 'Payment gateway for the UAE and wider region', ar: 'بوابة دفع للإمارات والمنطقة', url: 'https://telr.com' },
  { name: 'Geidea', en: 'Saudi payment solutions: online and POS', ar: 'حلول دفع سعودية: أونلاين ونقاط بيع', url: 'https://geidea.net' },
  { name: 'Flutterwave', en: 'Payments for businesses across Africa', ar: 'مدفوعات للأعمال في أفريقيا', url: 'https://flutterwave.com' },
  { name: 'Paystack', en: 'Payments for businesses in Africa (a Stripe company)', ar: 'مدفوعات للأعمال في أفريقيا (تابعة لـ Stripe)', url: 'https://paystack.com' },
];
const globalGateways: Fin[] = [
  { name: 'Stripe', country: 'US', en: 'Payment gateway: accept card payments online worldwide', ar: 'بوابة دفع: استقبل مدفوعات البطاقات أونلاين عالميا', url: 'https://stripe.com' },
  { name: 'PayPal', country: 'US', en: 'Global online payments for businesses', ar: 'مدفوعات أونلاين عالمية للأعمال', url: 'https://www.paypal.com/business' },
  { name: 'Adyen', en: 'Enterprise payments platform for global companies', ar: 'منصة مدفوعات للشركات العالمية الكبرى', url: 'https://www.adyen.com' },
  { name: 'Square', country: 'US', en: 'Online and in-person payments (US and selected countries)', ar: 'مدفوعات أونلاين وفي المتاجر (أمريكا ودول محددة)', url: 'https://squareup.com' },
  { name: 'Checkout.com', country: 'UK', en: 'Global payment processing for online businesses', ar: 'معالجة مدفوعات عالمية للأعمال أونلاين', url: 'https://www.checkout.com' },
  { name: '2Checkout (Verifone)', country: 'US', en: 'Global online payments and merchant of record options', ar: 'مدفوعات عالمية وخيارات تاجر مسجل', url: 'https://www.2checkout.com' },
  { name: 'Authorize.net', country: 'US', en: 'US payment gateway (a Visa solution)', ar: 'بوابة دفع أمريكية (من حلول Visa)', url: 'https://www.authorize.net' },
  { name: 'Braintree', country: 'US', en: 'Online and mobile payments (a PayPal service)', ar: 'مدفوعات أونلاين وموبايل (خدمة من PayPal)', url: 'https://www.braintreepayments.com' },
  { name: 'Razorpay', en: 'Payments for businesses in India', ar: 'مدفوعات للأعمال في الهند', url: 'https://razorpay.com' },
  { name: 'Mollie', country: 'IE', en: 'European payment service provider', ar: 'مزود مدفوعات أوروبي', url: 'https://www.mollie.com' },
  { name: 'Worldpay', country: 'UK', en: 'Global payment processing for businesses of all sizes', ar: 'معالجة مدفوعات عالمية لكل أحجام الأعمال', url: 'https://www.worldpay.com' },
  { name: 'Paddle', country: 'UK', en: 'Merchant of Record for SaaS: handles global VAT and sales tax', ar: 'تاجر مسجل لشركات SaaS: يتولى ضرائب VAT العالمية', url: 'https://www.paddle.com' },
  { name: 'LemonSqueezy', country: 'US', en: 'Merchant of Record for digital products', ar: 'تاجر مسجل للمنتجات الرقمية', url: 'https://www.lemonsqueezy.com' },
];
const banks: Fin[] = [
  { name: 'Payoneer', country: 'US', en: 'Receive international payments and withdraw locally', ar: 'استقبل مدفوعات دولية واسحبها محليا', url: 'https://www.payoneer.com' },
  { name: 'Mercury', partner: true, en: 'US business bank account', ar: 'حساب بنكي أمريكي للأعمال', url: 'https://shortet.com/Mercury' },
  { name: 'Wise', partner: true, en: 'Multi-currency account for international transfers', ar: 'حساب متعدد العملات للتحويلات الدولية', url: 'https://shortet.com/Wise' },
  { name: 'WorldFirst', partner: true, en: 'Global business account for cross-border payments', ar: 'حساب أعمال عالمي للمدفوعات عبر الحدود', url: 'https://shortet.com/Worldfirst' },
  { name: 'Kast', partner: true, en: 'USD account and virtual card', ar: 'حساب دولار وبطاقة افتراضية', url: 'https://shortet.com/Kast' },
  { name: 'Grey', partner: true, en: 'Global accounts to receive international payments', ar: 'حسابات عالمية لاستقبال المدفوعات الدولية', url: 'https://shortet.com/Grey' },
  { name: 'Novel Bank', partner: true, en: 'Online bank account', ar: 'حساب بنكي أونلاين', url: 'https://shortet.com/Novel' },
];
const extras: Fin[] = [
  { name: 'Refresh me', partner: true, en: 'Personal finance management: track balances and spending', ar: 'إدارة مالية شخصية: تابع أرصدتك ومصاريفك', url: 'https://get.refresh.me/0jswhxxxuxd4' },
  { name: 'Binance', partner: true, en: 'Crypto exchange and wallet', ar: 'منصة ومحفظة عملات رقمية', url: 'https://shortet.com/binance' },
  { name: 'Bybit', partner: true, en: 'Crypto exchange and wallet', ar: 'منصة ومحفظة عملات رقمية', url: 'https://shortet.com/bybit' },
  { name: 'OKX', partner: true, en: 'Crypto exchange and wallet', ar: 'منصة ومحفظة عملات رقمية', url: 'https://shortet.com/OKX' },
];
const wallets: Fin[] = [
  { name: 'Payeer', partner: true, en: 'Digital wallet', ar: 'محفظة رقمية', url: 'https://shortet.com/Payeer' },
  { name: 'Airtm', partner: true, en: 'Digital wallet', ar: 'محفظة رقمية', url: 'https://shortet.com/airtm' },
  { name: 'RedotPay', partner: true, en: 'Digital wallet and card', ar: 'محفظة رقمية وبطاقة', url: 'https://shortet.com/RedotPay' },
];

const Section = ({ icon: Icon, title, items }: { icon: any; title: string; items: Fin[] }) => (
  items.length === 0 ? null : (
  <section className="space-y-4">
    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2"><Icon className="w-6 h-6 text-primary" />{title}</h2>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <Card key={f.name}><CardContent className="p-4 space-y-2">
          <div className="font-semibold">{f.name}</div>
          <Desc f={f} />
          <a href={f.url} target="_blank" rel={f.partner ? "noopener noreferrer sponsored" : "noopener noreferrer"} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">{f.name}<ExternalLink className="w-3.5 h-3.5" /></a>
          <CTA f={f} />
        </CardContent></Card>
      ))}
    </div>
  </section>
));
const COUNTRY_EN: Record<string, string> = { US: 'the USA', UK: 'the UK', CA: 'Canada', EE: 'Estonia', FI: 'Finland', SE: 'Sweden', LV: 'Latvia', LT: 'Lithuania', IE: 'Ireland', EG: 'Egypt' };
const CTA = ({ f }: { f: Fin }) => {
  const { isRTL } = useTranslation();
  const c = f.country;
  return (
    <Link to={c ? `/country/${c}` : '/countries'} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
      {c
        ? (isRTL ? `افتح شركة في ${COUNTRY_AR_NAMES[c] || c} مع ${f.name}` : `Open a company in ${COUNTRY_EN[c] || c} with ${f.name}`)
        : (isRTL ? `افتح شركتك مع ${f.name}` : `Open your company with ${f.name}`)}
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );
};
const Desc = ({ f }: { f: Fin }) => {
  const { isRTL } = useTranslation();
  return <p className="text-sm text-muted-foreground">{isRTL ? f.ar : f.en}</p>;
};

const Fintech = () => {
  const { isRTL } = useTranslation();
  const [query, setQuery] = useState('');
  const match = (f: Fin) => !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.en.toLowerCase().includes(query.toLowerCase());
  const filt = (l: Fin[]) => l.filter(match);
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
            <div className="max-w-md mx-auto"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isRTL ? 'ابحث عن مزود...' : 'Search providers...'} /></div>
            <Section icon={CreditCard} title={isRTL ? 'بوابات دفع محلية (مصر والشرق الأوسط وأفريقيا)' : 'Local payment gateways (Egypt, MENA & Africa)'} items={filt(localGateways)} />
            <Section icon={CreditCard} title={isRTL ? 'بوابات دفع عالمية' : 'Global payment gateways'} items={filt(globalGateways)} />
            <Section icon={Landmark} title={isRTL ? 'حسابات بنكية للأعمال' : 'Business bank accounts'} items={filt(banks)} />
            <Section icon={Wallet} title={isRTL ? 'محافظ رقمية' : 'Digital wallets'} items={filt(wallets)} />
            <Section icon={Wallet} title={isRTL ? 'خدمات إضافية' : 'Extras'} items={filt(extras)} />
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
