import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Sparkles, CreditCard } from 'lucide-react';
import heroImg from '@/assets/blog-payment-gateways-2026.jpg';
import { withUtm } from '@/utils/utm';

const CAMPAIGN = 'payment-gateways-2026';
const tag = (url: string, content: string) =>
  withUtm(url, { source: 'blog', medium: 'inline', campaign: CAMPAIGN, content });

const TITLE = 'أفضل بوابات الدفع في 2026: Stripe وPaddle وChargebee وAirwallex وDeel وغيرها';
const DESCRIPTION =
  'دليل MoMoAI لعام 2026 لأفضل بوابات الدفع ومنصات الفوترة لشركات SaaS والاشتراكات والأسواق الرقمية والمنتجات الرقمية والمدفوعات الدولية \u2014 Stripe وPaddle وChargebee وAirwallex وDeel وTipalti وPolar وDodo وFreemius وZift.';

type Gateway = {
  name: string;
  category: string;
  description: string;
  url: string;
  best: string;
};

const GATEWAYS: Gateway[] = [
  { name: 'Stripe', category: 'معالجة البطاقات / SaaS', description: 'البنية التحتية الافتراضية للمدفوعات للأعمال عبر الإنترنت \u2014 البطاقات والاشتراكات وConnect والفوترة.', url: 'https://stripe.com', best: 'شركات SaaS والأسواق الرقمية المسجلة كـ US LLC أو UK Ltd' },
  { name: 'Paddle', category: 'Merchant of Record', description: 'تاجر معتمد لشركات SaaS \u2014 يتولى الضرائب العالمية (VAT/GST) والامتثال بدلاً منك.', url: 'https://paddle.com', best: 'شركات SaaS التي تبيع عالمياً بدون كيان تجاري في أمريكا أو أوروبا' },
  { name: 'Chargebee', category: 'فوترة الاشتراكات', description: 'إدارة فوترة الاشتراكات والإيرادات بالربط مع Stripe أو Braintree أو Adyen.', url: 'https://www.chargebee.com/', best: 'شركات SaaS ذات الاشتراكات الدورية مع خطط وفترات تجريبية وتحصيل معقد' },
  { name: 'Airwallex', category: 'المدفوعات العالمية والعملات', description: 'حسابات عالمية متعددة العملات وبطاقات وتداول عملات وبوابة دفع.', url: 'https://Airwallex.com/', best: 'المتاجر الإلكترونية والمنصات الدولية' },
  { name: 'Freemius', category: 'Merchant of Record', description: 'تاجر معتمد متخصص للإضافات والقوالب في WordPress والمنتجات الرقمية.', url: 'https://freemius.com/', best: 'بائعو الإضافات والقوالب لمنصة WordPress' },
  { name: 'Deel', category: 'الرواتب ومدفوعات المستقلين', description: 'التوظيف المتوافق قانونياً والرواتب والمدفوعات الجماعية للمستقلين في أكثر من 150 دولة.', url: 'https://www.deel.com/', best: 'دفع مستحقات فرق العمل عن بُعد والمستقلين عالمياً' },
  { name: 'Tipalti', category: 'أتمتة الحسابات الدائنة', description: 'مدفوعات جماعية عالمية مؤتمتة وتجهيز الموردين والامتثال الضريبي.', url: 'https://tipalti.com/', best: 'الأسواق الرقمية ومدفوعات التسويق بالعمولة وصناع المحتوى بمستويات ضخمة' },
  { name: 'Dodo Payments', category: 'Merchant of Record', description: 'تاجر معتمد حديث للمنتجات الرقمية وSaaS والمبيعات الفردية مع إتمام دفع عالمي فوري.', url: 'https://dodopayments.com/', best: 'مؤسسو مشاريع SaaS المستقلون وبائعو المنتجات الرقمية' },
  { name: 'Polar', category: 'Merchant of Record (Devs)', description: 'مدفوعات واشتراكات مصممة للمطورين ومنتجات المصدر المفتوح.', url: 'https://polar.sh', best: 'أدوات المطورين والمشاريع مفتوحة المصدر والبرمجيات المدعومة' },
  { name: 'Zift', category: 'منصة مدفوعات', description: 'منصة مدفوعات لمزودي البرمجيات المستقلين (ISVs) \u2014 دمج المعالجة وتقسيم المدفوعات والتحويلات.', url: 'https://zift.io/', best: 'مزودو البرمجيات الذين يدمجون المدفوعات داخل برمجيات SaaS المتخصصة' },
  { name: 'Lemon Squeezy', category: 'Merchant of Record', description: 'تاجر معتمد لـ SaaS والمنتجات الرقمية والاشتراكات \u2014 يتكفل بضرائب VAT/GST عالمياً.', url: 'https://www.lemonsqueezy.com/', best: 'المؤسسون الفرديون الذين يبيعون منتجات رقمية' },
  { name: 'PayPal', category: 'بطاقات ومحفظة رقمية', description: 'محفظة عالمية ومعالج بطاقات \u2014 أعلى ثقة للدفع عبر الحدود للمستهلكين.', url: 'https://www.paypal.com/', best: 'التجارة الإلكترونية الموجهة للمستهلكين وعبر الحدود' },
  { name: 'Wise Business', category: 'مدفوعات متعددة العملات', description: 'حسابات متعددة العملات وتحويلات دولية برسوم منخفضة.', url: 'https://wise.com/business', best: 'المستقلون والوكالات الذين يستلمون مدفوعات عالمية' },
  { name: 'Adyen', category: 'معالج مدفوعات للمؤسسات', description: 'منصة مدفوعات عالمية موحدة للتجار والمؤسسات الكبرى.', url: 'https://www.adyen.com/', best: 'المؤسسات الكبرى والتجارة متعددة القنوات' },
  { name: 'Mollie', category: 'معالج مدفوعات أوروبي', description: 'معالج مدفوعات يركز على أوروبا مع وسائل دفع محلية (iDEAL وBancontact وSEPA).', url: 'https://www.mollie.com/', best: 'التجارة الإلكترونية في الاتحاد الأوروبي ذات وسائل الدفع المحلية' },
  { name: 'Razorpay', category: 'معالج مدفوعات يركز على الهند', description: 'مدفوعات وتحويلات وخدمات مصرفية رقمية للشركات الهندية.', url: 'https://razorpay.com/', best: 'الشركات المسجلة في الهند' },
  { name: 'Kashier', category: 'معالج مدفوعات للشرق الأوسط وشمال أفريقيا', description: 'بوابة دفع لمصر والشرق الأوسط وشمال أفريقيا \u2014 بطاقات ومحافظ وتقسيط.', url: 'https://kashier.io/', best: 'التجار في مصر والشرق الأوسط وشمال أفريقيا' },
  { name: 'Paymob', category: 'معالج مدفوعات للشرق الأوسط وشمال أفريقيا', description: 'تنسيق وإدارة المدفوعات عبر مصر والدول الخليجية وأفريقيا.', url: 'https://paymob.com/', best: 'التجارة الإلكترونية في الشرق الأوسط وشمال أفريقيا وأفريقيا' },
];

const PaymentGateways2026AR: React.FC = () => {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    image: [heroImg],
    datePublished: '2026-06-29',
    author: { '@type': 'Organization', name: 'MoMoAI' },
    publisher: { '@type': 'Organization', name: 'FoundStart' },
    mainEntityOfPage: 'https://foundstart.org/blog/payment-gateways-2026',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'ما هو التاجر المعتمد (Merchant of Record أو MoR) وهل أحتاجه؟', acceptedAnswer: { '@type': 'Answer', text: 'التاجر المعتمد MoR (مثل Paddle وLemon Squeezy وDodo وPolar وFreemius) هو البائع القانوني لمنتجك للعملاء النهائيين، حيث يتولى تحصيل وتقديم ضريبة القيمة المضافة/المبيعات (VAT/GST) عالمياً بدلاً منك. إذا كنت تبيع منتجات SaaS أو منتجات رقمية عالمياً بدون شركة مسجلة في أمريكا أو أوروبا، فإن نظام MoR يرفع عن كاهلك معظم العبء الضريبي والامتثال.' } },
      { '@type': 'Question', name: 'مقارنة بين Stripe وPaddle \u2014 أيهما أفضل في 2026؟', acceptedAnswer: { '@type': 'Answer', text: 'Stripe أرخص وأكثر مرونة إذا كنت تستطيع إدارة الامتثال الضريبي بنفسك (عادة من خلال شركة US LLC أو UK Ltd). بينما يستحق Paddle الرسوم الأعلى إذا كنت تريد تجنب العبء الضريبي تماماً وإدارة ضريبة القيمة المضافة/المبيعات تلقائياً.' } },
      { '@type': 'Question', name: 'ما هي أفضل بوابة لدفع مستحقات المستقلين عن بُعد؟', acceptedAnswer: { '@type': 'Answer', text: 'تُعد Deel وTipalti الرائدتين في إدارة الرواتب العالمية المتوافقة قانونياً والمدفوعات الجماعية للمستقلين. بينما تُعد Wise Business الخيار الإداري الذاتي الأقل تكلفة للفرق الأصغر حجماً.' } },
    ],
  };

  const Gw: React.FC<{ p: Gateway }> = ({ p }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base">{p.name}</h4>
          <Badge variant="secondary" className="text-xs">{p.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <p className="text-xs"><span className="font-semibold">أفضل لـ:</span> {p.best}</p>
        <Button asChild size="sm">
          <a href={tag(p.url, p.name)} target="_blank" rel="noopener noreferrer sponsored">
            زيارة <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{TITLE} | مدونة FoundStart</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="keywords" content="payment gateway 2026, Stripe, Paddle, Chargebee, Airwallex, Deel, Tipalti, Dodo Payments, Polar, Freemius, Zift, Lemon Squeezy, Adyen, Mollie, Razorpay, Kashier, Paymob, merchant of record" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={heroImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://foundstart.org/blog/payment-gateways-2026" />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 ml-1 rotate-180" /> العودة إلى المدونة
            </Link>
            <Badge className="mb-3"><Sparkles className="w-3 h-3 ml-1" /> المدفوعات</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-muted-foreground mb-6">{DESCRIPTION}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center"><User className="w-4 h-4 ml-1.5" /> MoMoAI</span>
              <span className="inline-flex items-center"><Calendar className="w-4 h-4 ml-1.5" /> 29 يونيو 2026</span>
              <span className="inline-flex items-center"><Clock className="w-4 h-4 ml-1.5" /> قراءة في 13 دقيقة</span>
            </div>
            <img src={heroImg} alt="مقارنة بوابات الدفع 2026" width={1536} height={896} className="w-full rounded-xl border shadow-lg mb-10" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                اختيار بوابة الدفع المناسبة في عام 2026 يتوقف على سؤالين رئيسيين: <strong>أين يوجد كيانك القانوني (شركتك المسجلة)</strong>،
                و<strong>ما مدى قدرتك على تحمل الامتثال الضريبي بنفسك</strong>؟ يعرض هذا الدليل من MoMoAI نحو 18 بوابة دفع مقسمة بناءً على هذين المحورين لتتمكن من الاختيار في دقائق.
              </p>

              <h2><CreditCard className="inline w-6 h-6 ml-2" />فوترة SaaS والاشتراكات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /SaaS|Subscription|Merchant of Record|معالجة البطاقات|فوترة الاشتراكات/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>المدفوعات العالمية والعملات والشركات الكبرى</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /Global|Enterprise|Multi-Currency|European|Wallet|Payments Platform|المدفوعات العالمية|معالج مدفوعات للمؤسسات|منصة مدفوعات|بطاقات ومحفظة رقمية/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>التحويلات والرواتب ومعالجات المدفوعات الإقليمية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /Payroll|Payouts|India|MENA|الرواتب|أتمتة|الشرق الأوسط|الهند|مدفوعات متعددة/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>مجموعة حلول المدفوعات المقترحة من MoMoAI</h2>
              <ul>
                <li><strong>شركات SaaS المسجلة كـ US LLC أو UK Ltd:</strong> استخدام Stripe + Chargebee لإدارة الاشتراكات والفوترة المعقدة.</li>
                <li><strong>شركات SaaS العالمية بدون كيان تجاري:</strong> استخدام Paddle أو Lemon Squeezy (بنظام التاجر المعتمد MoR).</li>
                <li><strong>المشاريع المستقلة والمنتجات الرقمية:</strong> استخدام Dodo Payments أو Polar.</li>
                <li><strong>التعامل بالعملات المتعددة والتحويلات عبر الحدود:</strong> استخدام Airwallex + Wise Business.</li>
                <li><strong>دفع مستحقات المستقلين والفرق العالمية:</strong> استخدام Deel أو Tipalti.</li>
                <li><strong>التجار في منطقة الشرق الأوسط وشمال أفريقيا:</strong> استخدام Kashier أو Paymob.</li>
              </ul>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PaymentGateways2026AR;
