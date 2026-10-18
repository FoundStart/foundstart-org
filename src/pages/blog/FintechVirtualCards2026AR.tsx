import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import VideoModal from '@/components/VideoModal';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Sparkles, PlayCircle, CreditCard } from 'lucide-react';
import heroImg from '@/assets/blog-fintech-virtual-cards-2026.jpg';
import { withUtm } from '@/utils/utm';

const CAMPAIGN = 'fintech-virtual-cards-2026';
const tag = (url: string, content: string) =>
  withUtm(url, { source: 'blog', medium: 'inline', campaign: CAMPAIGN, content });

const TITLE = 'أفضل حلول التكنولوجيا المالية في 2026: البطاقات الافتراضية، والحسابات البنكية بالدولار، ومحافظ العملات الرقمية';
const DESCRIPTION =
  'دليل MoMoAI لعام 2026 لأفضل منصات التكنولوجيا المالية — حسابات بنكية مجانية بالدولار، وبطاقات Visa / Mastercard افتراضية، وخدمات بنكية عالمية، ومحافظ عملات رقمية، ومنصات P2P لمؤسسي المشاريع عبر الإنترنت، والمستقلين، والرحالة الرقميين.';

type Partner = {
  name: string;
  url: string;
  category: string;
  description: string;
  coupon?: string;
  video?: string;
};

const PARTNERS: Partner[] = [
  { name: 'Kast', category: 'حساب بنكي بالدولار وبطاقة افتراضية', description: 'احصل على حساب بنكي بالدولار وبطاقة افتراضية — فتح الحساب مجاني.', url: 'https://shortet.com/Kast', coupon: 'DD3ICNJ4', video: 'https://www.youtube.com/watch?v=ibXlV-y-3Qw' },
  { name: 'Grey', category: 'خدمات بنكية عالمية', description: 'خدمات بنكية عالمية شاملة مصممة خصيصاً لك.', url: 'https://shortet.com/Grey', coupon: '3CYA4J', video: 'https://www.youtube.com/watch?v=hUxo2mdrwjY' },
  { name: 'Wise', category: 'بنك / محفظة متعددة العملات', description: 'حساب متعدد العملات للمدفوعات الدولية.', url: 'https://shortet.com/Wise', video: 'https://www.youtube.com/watch?v=SGwqlPG-Yh0' },
  { name: 'Mercury', category: 'بنك أمريكي للشركات الناشئة', description: 'البنك المصمم للشركات الأمريكية (LLC) والشركات الناشئة.', url: 'https://shortet.com/Mercury', video: 'https://www.youtube.com/watch?v=4vuYPDLNgAw' },
  { name: 'WorldFirst', category: 'بنك عالمي', description: 'حساب عالمي متعدد العملات للبائعين عبر الإنترنت.', url: 'https://shortet.com/Worldfirst', video: 'https://www.youtube.com/watch?v=mBWiC_OtTsE' },
  { name: 'Novel Bank', category: 'بنك / محفظة رقمية', description: 'منصة بنكية رقمية ومحفظة حديثة.', url: 'https://shortet.com/Novel', video: 'https://www.youtube.com/watch?v=i2tv2PT1GJ0' },
  { name: 'RedotPay', category: 'محفظة رقمية وبطاقة دفع', description: 'محفظة عملات رقمية مدعومة ببطاقات دفع.', url: 'https://shortet.com/RedotPay', coupon: '1iz44', video: 'https://www.youtube.com/watch?v=eoh11eIkWi0' },
  { name: 'Airtm', category: 'محفظة رقمية', description: 'محفظة P2P عالمية للمستقلين والعاملين عن بُعد.', url: 'https://shortet.com/airtm', video: 'https://www.youtube.com/watch?v=5Jylv-ciVFA' },
  { name: 'Payeer', category: 'محفظة رقمية', description: 'محفظة إلكترونية متعددة العملات تدعم العملات الرقمية.', url: 'https://shortet.com/Payeer', video: 'https://www.youtube.com/watch?v=tkC58Pe3nks' },
  { name: 'ByBit', category: 'منصة تداول عملات رقمية و P2P', description: 'محفظة عملات رقمية، وتداول فوري ومشتقات مع سوق P2P.', url: 'https://shortet.com/bybit', video: 'https://www.youtube.com/watch?v=C0DRm910eAg' },
  { name: 'Binance', category: 'منصة تداول عملات رقمية و P2P', description: 'أكبر منصة لتداول العملات الرقمية وسوق P2P في العالم.', url: 'https://shortet.com/binance', video: 'https://www.youtube.com/watch?v=4n3GelvSiG4' },
  { name: 'OKX', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة عالمية للعملات الرقمية مع محفظة وتداول P2P.', url: 'https://shortet.com/OKX', video: 'https://www.youtube.com/watch?v=uAMHN9ZbebI' },
  { name: 'Bitget', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة عملات رقمية ومحفظة تركز على تداول النسخ.', url: 'https://shortet.com/Bitget', video: 'https://www.youtube.com/watch?v=0YgkPOeC87Q' },
  { name: 'BingX', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة تداول اجتماعي للعملات الرقمية مع سوق P2P.', url: 'https://shortet.com/BingX', video: 'https://www.youtube.com/watch?v=1fszTLSmU-8' },
  { name: 'BingX (Referral)', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة BingX مع تطبيق كود الإحالة للحصول على مكافأة.', url: 'https://shortet.com/Bingxdaog_1568148333284118599', video: 'https://www.youtube.com/watch?v=1fszTLSmU-8' },
  { name: 'Gate', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة عملات رقمية عريقة بسيولة عالية.', url: 'https://shortet.com/Gate', video: 'https://www.youtube.com/watch?v=EGXHadqc0ow' },
  { name: 'Gate (Crypto bonus)', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة Gate.io مع كود مكافأة للمستخدمين الجدد.', url: 'https://shortet.com/Gate-crypto', coupon: '1778642196063', video: 'https://www.youtube.com/watch?v=EGXHadqc0ow' },
  { name: 'KuCoin', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة عملات رقمية مع محفظة، وعقود آجلة، وتداول P2P.', url: 'https://shortet.com/Kucoin', video: 'https://www.youtube.com/watch?v=t3zOAAOVIT8' },
  { name: 'HTX', category: 'منصة تداول عملات رقمية و P2P', description: 'منصة عالمية للعملات الرقمية (Huobi سابقاً).', url: 'https://shortet.com/HTX', video: 'https://www.youtube.com/watch?v=bzKaiBSGXdE' },
  { name: 'TradingView', category: 'منصة تداول واستثمار', description: 'رسوم بيانية للتداول، وإشارات، ومجتمع لكل الأسواق المالية.', url: 'https://shortet.com/Tradingview', video: 'https://www.youtube.com/watch?v=rJj4ZbnzEGs' },
];

const GROUPS = [
  { title: 'البطاقات الافتراضية وحسابات الدولار', filter: (p: Partner) => /Card|USA Bank|Global Bank|Wallet/.test(p.category) && !/Crypto/.test(p.category) },
  { title: 'محافظ العملات الرقمية ومنصات P2P', filter: (p: Partner) => /Crypto/.test(p.category) },
  { title: 'منصات التداول', filter: (p: Partner) => /Trading/.test(p.category) },
];

const FintechVirtualCards2026AR: React.FC = () => {
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'ما هو أفضل حساب بنكي مجاني بالدولار مع بطاقة افتراضية في 2026؟', acceptedAnswer: { '@type': 'Answer', text: 'تقدم Kast حساباً بنكياً بالدولار وبطاقة افتراضية مجانية للمستخدمين حول العالم، بما في ذلك غير المقيمين في الولايات المتحدة. وتعد Grey وWorldFirst بدائل قوية للخدمات البنكية متعددة العملات.' } },
      { '@type': 'Question', name: 'أي بنك هو الأفضل لشركة أمريكية (US LLC)؟', acceptedAnswer: { '@type': 'Answer', text: 'تعد Mercury البنك الرقمي الرائد للشركات الأمريكية والشركات الناشئة، كما تعتبر Wise Business خياراً ممتازاً للمدفوعات العالمية متعددة العملات.' } },
      { '@type': 'Question', name: 'ما هي أفضل محافظ العملات الرقمية ومنصات P2P؟', acceptedAnswer: { '@type': 'Answer', text: 'تقدم كل من Binance وByBit وOKX وKuCoin وBitget وBingX وGate وHTX محافظ عملات رقمية مع أسواق P2P. اختر المنصة الأنسب بناءً على منطقتك، والسيولة، والعملات المحلية المدعومة.' } },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    image: [heroImg],
    datePublished: '2026-06-24',
    author: { '@type': 'Organization', name: 'MoMoAI' },
    publisher: { '@type': 'Organization', name: 'FoundStart' },
    mainEntityOfPage: 'https://foundstart.org/blog/fintech-virtual-cards-2026',
  };

  const PartnerCard: React.FC<{ p: Partner }> = ({ p }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base">{p.name}</h4>
          <Badge variant="secondary" className="text-xs">{p.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          {p.coupon && <Badge variant="destructive">\ud83c\udf9f {p.coupon}</Badge>}
          <Button asChild size="sm">
            <a href={tag(p.url, p.name)} target="_blank" rel="noopener noreferrer sponsored">
              زيارة <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
          {p.video && (
            <Button size="sm" variant="outline" onClick={() => setVideo({ url: p.video!, title: `${p.name} \u2014 عرض ومراجعة` })}>
              <PlayCircle className="w-4 h-4 mr-1.5" /> مشاهدة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{TITLE} | مدونة FoundStart</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <meta name="keywords" content="بطاقة افتراضية, حساب بنكي بالدولار, بطاقة افتراضية مجانية, Kast, Wise, Mercury, Grey, WorldFirst, محفظة كريبتو, منصة P2P, Binance, ByBit, OKX, KuCoin, Bitget, Gate, HTX, BingX, RedotPay, Airtm, Payeer, TradingView, تكنولوجيا مالية 2026" />
        <meta name="author" content="MoMoAI" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="FoundStart" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={heroImg} />
        <meta property="article:published_time" content="2026-06-24" />
        <meta property="article:author" content="MoMoAI" />
        <meta property="article:section" content="Fintech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={heroImg} />
        <link rel="canonical" href="https://foundstart.org/blog/fintech-virtual-cards-2026" />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> العودة للمدونة
            </Link>

            <Badge className="mb-3"><Sparkles className="w-3 h-3 mr-1" /> تكنولوجيا مالية</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-muted-foreground mb-6">{DESCRIPTION}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-1.5" /> MoMoAI</span>
              <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> 24 يونيو 2026</span>
              <span className="inline-flex items-center"><Clock className="w-4 h-4 mr-1.5" /> قراءة تستغرق 12 دقيقة</span>
            </div>

            <img
              src={heroImg}
              alt="بطاقات افتراضية، حسابات بنكية بالدولار ومحافظ كريبتو لمؤسسي المشاريع عبر الإنترنت"
              width={1536}
              height={896}
              className="w-full rounded-xl border shadow-lg mb-10"
            />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                في عام 2026، يحتاج كل مؤسس مشروع عبر الإنترنت، أو مستقل، أو رحالة رقمي إلى ثلاثة أشياء أساسية: <strong>حساب بنكي بالدولار</strong>،
                و<strong>بطاقة Visa / Mastercard افتراضية</strong> للاشتراكات العالمية، و<strong>محفظة عملات رقمية</strong> لتسويات مالية سريعة
                عبر الحدود. يقدم دليل MoMoAI هذا أفضل منصات التكنولوجيا المالية في كل فئة — والمستمدة من دليلنا الكامل في <a href={tag('https://shortet.com/Fintech', 'intro-source')} target="_blank" rel="noopener noreferrer sponsored">shortet.com/Fintech</a>.
              </p>

              <h2><CreditCard className="inline w-6 h-6 mr-2" />البطاقات الافتراضية والحسابات البنكية</h2>
              <p>افتح حساباً بالدولار أو حساباً متعدد العملات في دقائق، واحصل على بطاقة افتراضية يمكنك استخدامها في أي مكان يقبل بطاقات Visa أو Mastercard.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PARTNERS.filter(GROUPS[0].filter).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>محافظ العملات الرقمية ومنصات P2P</h2>
              <p>أفضل المنصات لشراء وبيع وتخزين العملات الرقمية — مع أسواق P2P تتيح لك التحويل إلى العملة المحلية في أي بلد بسهولة.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PARTNERS.filter(GROUPS[1].filter).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>منصات التداول والاستثمار</h2>
              <p>للحصول على الرسوم البيانية، والإشارات، وإدارة محفظتك الاستثمارية عبر الأسهم، والفوركس، والعملات الرقمية.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PARTNERS.filter(GROUPS[2].filter).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>مجموعة أدوات MoMoAI المالية</h2>
              <ul>
                <li><strong>استلام المدفوعات بالدولار:</strong> منصة Mercury (للشركات الأمريكية) + Wise (للمدفوعات العالمية) + WorldFirst (للتجارة الإلكترونية).</li>
                <li><strong>الإنفاق العالمي:</strong> بطاقة Kast أو Grey الافتراضية لخدمات SaaS، والإعلانات، والاشتراكات الشهرية.</li>
                <li><strong>تحويل العملات الرقمية من وإلى العملات النقدية:</strong> استخدام سوق P2P في Binance أو ByBit للتحويل إلى العملة المحلية.</li>
                <li><strong>التحويل من محفظة إلى أخرى:</strong> منصات RedotPay، أو Airtm، أو Payeer لمدفوعات المستقلين السريعة.</li>
                <li><strong>متابعة الأسواق والإشارات:</strong> منصة TradingView للرسوم البيانية المتقدمة عبر جميع فئات الأصول.</li>
              </ul>

              <div className="not-prose my-10 p-6 rounded-xl bg-primary/10 border border-primary/30 text-center">
                <h3 className="text-xl font-bold mb-2">تصفح دليل التكنولوجيا المالية الكامل</h3>
                <p className="text-muted-foreground mb-4">جميع البنوك المختارة، والبطاقات الافتراضية، والمحافظ والمنصات في مكان واحد.</p>
                <Button asChild size="lg">
                  <a href={tag('https://shortet.com/Fintech', 'directory-cta')} target="_blank" rel="noopener noreferrer sponsored">
                    استكشف دليل التكنولوجيا المالية <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>

      {video && (
        <VideoModal
          isOpen={!!video}
          onClose={() => setVideo(null)}
          videoUrl={video.url}
          title={video.title}
        />
      )}
    </>
  );
};

export default FintechVirtualCards2026AR;
