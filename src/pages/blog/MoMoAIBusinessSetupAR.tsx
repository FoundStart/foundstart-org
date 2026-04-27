import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Calendar, User, Clock, CheckCircle,
  Building2, CreditCard, Banknote, Globe, Wallet, ShieldCheck,
} from 'lucide-react';
import heroImg from '@/assets/blog-momoai-business-setup-ar.jpg';

interface PartnerCTA { name: string; desc: string; url: string; }

const formationPartners: PartnerCTA[] = [
  { name: 'FoundStart', desc: 'تأسيس في الولايات المتحدة والمملكة المتحدة وأوروبا', url: 'https://shortet.com/foundstart' },
  { name: 'Doola', desc: 'حزمة LLC + EIN + حساب بنكي', url: 'https://shortet.com/doola' },
  { name: 'Clemta', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/clemta' },
  { name: 'Startglobal', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/startglobal' },
  { name: 'Tailorbrands', desc: 'LLC + هوية تجارية', url: 'https://shortet.com/tailorbrands' },
  { name: 'Startfleet', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/startfleet' },
  { name: 'Privatily', desc: 'تأسيس USA و UK', url: 'https://shortet.com/privatily' },
  { name: 'ITIN', desc: 'خدمة ITIN لغير المقيمين', url: 'https://shortet.com/theitin' },
  { name: 'Go Nomad HQ', desc: 'تأسيس USA و UK للرحّالة الرقميين', url: 'https://shortet.com/Go-Nomad-HQ' },
];

const ukPartners: PartnerCTA[] = [
  { name: '1stFormations', desc: 'تأسيس Ltd في المملكة المتحدة', url: 'https://shortet.com/1st-formations' },
  { name: 'Rapid Formations', desc: 'تأسيس Ltd في المملكة المتحدة', url: 'https://shortet.com/rapid-formations' },
  { name: 'Firstbase', desc: 'تأسيس شركة بريطانية وعالمية', url: 'https://shortet.com/firstbase' },
  { name: '1office', desc: 'UK + إستونيا + الدول الإسكندنافية', url: 'https://shortet.com/1office' },
];

const euPartners: PartnerCTA[] = [
  { name: '1office — إستونيا', desc: 'شركة أوروبية عبر الإقامة الرقمية', url: 'https://shortet.com/1office' },
  { name: '1office — فنلندا', desc: 'تأسيس شركة في الاتحاد الأوروبي', url: 'https://shortet.com/1office' },
  { name: '1office — السويد', desc: 'تأسيس شركة في الاتحاد الأوروبي', url: 'https://shortet.com/1office' },
  { name: '1office — لاتفيا', desc: 'تأسيس شركة في الاتحاد الأوروبي', url: 'https://shortet.com/1office' },
  { name: '1office — ليتوانيا', desc: 'تأسيس شركة في الاتحاد الأوروبي', url: 'https://shortet.com/1office' },
  { name: '1office — أيرلندا', desc: 'شركة أوروبية ناطقة بالإنجليزية', url: 'https://1office.co?fpr=momo' },
];

const bankingPartners: PartnerCTA[] = [
  { name: 'Mercury', desc: 'بنك أمريكي للشركات — بدون رسوم، متوافق مع Stripe', url: 'https://shortet.com/Mercury' },
  { name: 'Wise', desc: 'استلام بعملات متعددة (USD/EUR/GBP)', url: 'https://shortet.com/Wise' },
  { name: 'WorldFirst', desc: 'خدمات بنكية عالمية للشركات', url: 'https://shortet.com/Worldfirst' },
  { name: 'Kast', desc: 'بطاقات USD افتراضية للمشتريات الأونلاين', url: 'https://shortet.com/Kast' },
  { name: 'Grey', desc: 'خدمات بنكية عالمية للمؤسسين خارج الولايات المتحدة', url: 'https://shortet.com/Grey' },
  { name: 'Airtm', desc: 'محفظة رقمية (مناسبة للشرق الأوسط/أمريكا اللاتينية)', url: 'https://shortet.com/airtm' },
  { name: 'RedotPay', desc: 'محفظة رقمية مرتبطة بالعملات المشفرة', url: 'https://shortet.com/RedotPay' },
  { name: 'ByBit', desc: 'منصة تداول عملات مشفرة + P2P', url: 'https://shortet.com/bybit' },
];

const telecomPartners: PartnerCTA[] = [
  { name: 'Airalo', desc: 'eSIM للسفر — خصم 3€ على أول شراء', url: 'https://shortet.com/airalo' },
  { name: 'Bnesim', desc: 'eSIM في أي مكان وأي وقت', url: 'https://shortet.com/Bnesim' },
  { name: 'esim.me', desc: 'خدمة eSIM عالمية', url: 'https://shortet.com/esim' },
  { name: 'SMS Fast', desc: 'أرقام افتراضية + eSIM', url: 'https://shortet.com/smsfast' },
];

const paymentPartners: PartnerCTA[] = [
  { name: 'Wise', desc: 'استلام بعملات متعددة لمدفوعات Stripe', url: 'https://shortet.com/Wise' },
  { name: 'Mercury', desc: 'حساب بنكي أمريكي لاستقبال مدفوعات Stripe', url: 'https://shortet.com/Mercury' },
  { name: 'WorldFirst', desc: 'استلام مدفوعات عالمية', url: 'https://shortet.com/Worldfirst' },
  { name: 'Kast', desc: 'بطاقة USD لدفع SaaS والإعلانات', url: 'https://shortet.com/Kast' },
];

const PartnerGrid: React.FC<{ items: PartnerCTA[] }> = ({ items }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 not-prose">
    {items.map((p) => (
      <Card key={p.name} className="hover:border-primary/50 transition-colors">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2"><Badge variant="secondary">{p.name}</Badge></div>
          <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
          <Button size="sm" asChild className="w-full">
            <a href={p.url} target="_blank" rel="noopener noreferrer sponsored">
              زيارة {p.name}
              <ArrowRight className="ms-2 w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const MoMoAIBusinessSetupAR: React.FC = () => {
  const title = 'MoMoAI — دليل العمليات التجارية الشامل (التأسيس، البنوك وبوابات الدفع)';
  const description =
    'دليل MoMoAI 2026 الكامل للمؤسسين العرب: تأسيس شركة LLC أمريكية / Ltd بريطانية / شركة أوروبية، حسابات Mercury و Wise، إعداد Stripe و Shopify Payments، ومنظومة الدفع الموصى بها لكل حالة استخدام.';

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>{title} | FoundStart Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImg} />
        <link rel="canonical" href="https://foundstart.org/blog/momoai-business-setup-guide-ar" />
      </Helmet>

      <div className="min-h-screen bg-background" dir="rtl">
        <Header />

        <main className="w-full max-w-full overflow-x-hidden">
          <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
            <div className="container mx-auto max-w-4xl">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
                <ArrowRight className="w-4 h-4 ms-2" />
                العودة للمدونة
              </Link>
              <Badge className="mb-4">إعداد الأعمال</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center"><User className="w-4 h-4 ms-2" />MoMoAI x FoundStart</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 ms-2" />27 أبريل 2026</div>
                <div className="flex items-center"><Clock className="w-4 h-4 ms-2" />قراءة 18 دقيقة</div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <img
                src={heroImg}
                alt="غلاف دليل MoMoAI لإعداد الأعمال — التأسيس والبنوك وبوابات الدفع"
                width={1536}
                height={864}
                className="w-full h-auto rounded-2xl border shadow-lg"
              />
            </div>
          </section>

          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl prose prose-lg dark:prose-invert max-w-none text-right">

              <h2 className="flex items-center gap-3"><Building2 className="w-6 h-6 text-primary" />الجزء الأول — تأسيس الشركات</h2>
              <p>
                تأسيس الشركة في الولاية القضائية الصحيحة هو الأساس. الهيكل الصحيح يفتح لك Stripe و Shopify Payments
                و Mercury و PayPal Business وكل بوابات الدفع العالمية تقريباً.
              </p>

              <h3>1.1 شركة LLC أمريكية — الأفضل للمؤسسين الدوليين</h3>
              <ul>
                <li>اختر الولاية: Delaware للمستثمرين/SaaS، Wyoming للخصوصية، New Mexico بدون رسوم سنوية.</li>
                <li>سجّل عبر إحدى المنصات أدناه — تتولى عقد التأسيس والوكيل المسجل وعقد التشغيل.</li>
                <li>احصل على EIN. لمن يحتاج ITIN: <a href="https://shortet.com/theitin" target="_blank" rel="noopener noreferrer">shortet.com/theitin</a> مع كوبون <strong>SAYED50</strong>.</li>
                <li>افتح حساباً بنكياً تجارياً أمريكياً — Mercury موصى به.</li>
                <li>تقدم بطلب Stripe ببيانات LLC و EIN والحساب البنكي.</li>
              </ul>
              <PartnerGrid items={formationPartners} />

              <h3>1.2 شركة بريطانية (Ltd)</h3>
              <p>
                تمنحك Ltd البريطانية الوصول إلى Stripe UK و PayPal Business والأسواق الأوروبية — ممتازة لـ SaaS التي
                تستهدف العملاء الأوروبيين.
              </p>
              <PartnerGrid items={ukPartners} />

              <h3>1.3 شركات الاتحاد الأوروبي (إستونيا والدول الأخرى)</h3>
              <p>
                الإقامة الرقمية الإستونية تتيح إدارة شركة أوروبية بالكامل عن بُعد. لاتفيا وليتوانيا وفنلندا والسويد
                وأيرلندا متاحة عبر 1office.
              </p>
              <PartnerGrid items={euPartners} />

              <h2 className="flex items-center gap-3"><Banknote className="w-6 h-6 text-primary" />الجزء الثاني — الحسابات البنكية والمالية</h2>
              <p>
                بعد تأسيس شركتك تحتاج منظومة بنكية متكاملة: بنك أمريكي للشركات، استلام متعدد العملات، بطاقات افتراضية،
                ومنصات عملات مشفرة.
              </p>
              <PartnerGrid items={bankingPartners} />

              <h2 className="flex items-center gap-3"><CreditCard className="w-6 h-6 text-primary" />الجزء الثالث — بوابات الدفع</h2>
              <p>
                <strong>Stripe</strong> هو البوابة الأساسية الموصى بها لـ SaaS والمنتجات الرقمية (أكثر من 135 عملة + اشتراكات).
                خيارات أخرى غير مرتبطة بشراكتنا يمكنك التسجيل فيها مباشرة:{' '}
                <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>،{' '}
                <a href="https://www.shopify.com/payments" target="_blank" rel="noopener noreferrer">Shopify Payments</a>،{' '}
                <a href="https://www.paypal.com/business" target="_blank" rel="noopener noreferrer">PayPal Business</a>،{' '}
                <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">LemonSqueezy</a>، و{' '}
                <a href="https://www.paddle.com" target="_blank" rel="noopener noreferrer">Paddle</a>.
              </p>
              <p>
                لاستلام مدفوعات Stripe عالمياً اربطها بمنظومة شركائنا في البنوك والمحافظ:
              </p>
              <PartnerGrid items={paymentPartners} />

              <h3 className="flex items-center gap-3 mt-10"><Globe className="w-5 h-5 text-primary" />الاتصالات و eSIM (متطلبات KYC)</h3>
              <p>
                رقم هاتف نشط وخطة بيانات مطلوبان لـ Stripe و Mercury ومعظم تدفقات KYC. شركاؤنا في eSIM والأرقام الافتراضية يغطونك عالمياً.
              </p>
              <PartnerGrid items={telecomPartners} />

              <h3>متطلبات Stripe</h3>
              <ul>
                <li>شركة مسجلة (LLC أو Ltd أو ما يعادلها) في دولة مدعومة</li>
                <li>EIN (لـ LLC الأمريكية) أو رقم تسجيل الشركة</li>
                <li>حساب بنكي محلي للشركة — Mercury لشركات LLC الأمريكية</li>
                <li>هوية حكومية للمدير/المالك</li>
                <li>موقع ويب نشط بوصف واضح للمنتج/الخدمة</li>
              </ul>

              <h2 className="flex items-center gap-3"><Wallet className="w-6 h-6 text-primary" />الجزء الرابع — منظومة الدفع حسب حالة الاستخدام</h2>
              <ul>
                <li><strong>SaaS:</strong> Stripe Billing للاشتراكات + LemonSqueezy أو Paddle كـ MoR لإدارة الضرائب.</li>
                <li><strong>التجارة الإلكترونية:</strong> Shopify Payments (أو Stripe) + PayPal Business للثقة.</li>
                <li><strong>المنتجات الرقمية:</strong> LemonSqueezy أو Stripe Checkout.</li>
                <li><strong>دفع العمولات:</strong> Wise للتحويلات الدولية الرخيصة، PayPal Mass Pay للدفع بالجملة، PartnerStack لإدارة البرنامج.</li>
              </ul>

              <h2 className="flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-primary" />الجزء الخامس — قائمة المراجعة السريعة</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card><CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" />تأسيس الشركة</h4>
                  <ul className="space-y-2 text-sm">
                    {['اختر الولاية القضائية (LLC أمريكية / Ltd بريطانية / إستونيا)','سجّل عبر FoundStart أو Doola أو Clemta أو 1office','احصل على EIN أو المعرف الضريبي المعادل','اشترك في خدمة الوكيل المسجل','احفظ عقد التأسيس وعقد التشغيل'].map((i)=>(
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/><span>{i}</span></li>
                    ))}
                  </ul>
                </CardContent></Card>
                <Card><CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Banknote className="w-4 h-4 text-primary" />البنوك</h4>
                  <ul className="space-y-2 text-sm">
                    {['افتح حساب Mercury (مطلوب لـ LLC أمريكية)','افتح Wise Business (استلام متعدد العملات)','احصل على بطاقة Kast الافتراضية (USD)','تقدم بطلب Stripe مع KYC الكامل','اربط PayPal Business + LemonSqueezy/Paddle'].map((i)=>(
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/><span>{i}</span></li>
                    ))}
                  </ul>
                </CardContent></Card>
              </div>

              <Card className="mt-12 bg-gradient-to-r from-primary/10 to-emerald-500/10 border-primary/20 not-prose">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-3">جاهز لتأسيس عملك العالمي؟</h3>
                  <p className="text-muted-foreground mb-6">
                    تصفّح شركاءنا الموثوقين في التأسيس والبنوك والدفع — أو تحدث مع فريقنا مباشرة.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" asChild>
                      <Link to="/digital-partners"><Globe className="ms-2 w-4 h-4" />تصفح الشركاء الرقميين</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/countries">اختر الولاية القضائية <ArrowRight className="ms-2 w-4 h-4" /></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://wa.me/201002905764" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
                    </Button>
                  </div>
                  <div className="mt-4 text-sm">
                    <Link to="/blog/momoai-business-setup-guide-en" className="text-primary hover:underline">
                      → Read the English version
                    </Link>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MoMoAIBusinessSetupAR;
