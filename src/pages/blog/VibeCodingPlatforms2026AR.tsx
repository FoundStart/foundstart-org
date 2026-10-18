import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import VideoModal from '@/components/VideoModal';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Sparkles, PlayCircle, Code2 } from 'lucide-react';
import heroImg from '@/assets/blog-vibe-coding-2026.jpg';
import { withUtm } from '@/utils/utm';

const CAMPAIGN = 'vibe-coding-platforms-2026';
const tag = (url: string, content: string) =>
  withUtm(url, { source: 'blog', medium: 'inline', campaign: CAMPAIGN, content });

const TITLE = 'أفضل منصات Vibe Coding في 2026: ابنِ تطبيقات الويب والموبايل المتكاملة بالذكاء الاصطناعي';
const DESCRIPTION =
  'دليل MoMoAI لعام 2026 لأفضل منصات Vibe Coding بالذكاء الاصطناعي \u2014 ابنِ تطبيقات ويب متكاملة، وتطبيقات موبايل، ومتاجر إلكترونية في دقائق باستخدام Lovable وEmergent وBase44 وBlackbox وRork وBuilder.io وغيرها.';

type Platform = {
  name: string;
  category: string;
  description: string;
  url: string;
  video?: string;
};

const categoryMap: Record<string, string> = {
  'Full-Stack Web & Mobile': 'تطبيقات ويب وموبايل متكاملة',
  'AI No-Code Full-Stack': 'منصة متكاملة بدون كود بالذكاء الاصطناعي',
  'AI No-Code App & Web': 'تطبيقات وويب بدون كود بالذكاء الاصطناعي',
  'Full-Stack Apps': 'تطبيقات متكاملة',
  'Products That Sell': 'منتجات قابلة للبيع',
  'Claude Code Templates': 'قوالب Claude Code',
  'Mobile Apps': 'تطبيقات الموبايل',
  'Instant Apps': 'تطبيقات فورية',
  'Visual Deployment': 'نشر بصري',
  'Website → Mobile App': 'تحويل الموقع إلى تطبيق',
  'No-Code Apps': 'تطبيقات بدون كود',
  'Business in 10 Minutes': 'مشروعك في 10 دقائق',
  'AI App Platform': 'منصة تطبيقات الذكاء الاصطناعي',
  'Community & Templates': 'مجتمع وقوالب',
  'Backend / Database': 'خلفية برمجية / قاعدة بيانات',
  'E-Commerce': 'تجارة إلكترونية',
  'CPA Landing Pages': 'صفحات هبوط CPA',
  'Clone to Page Builder': 'نسخ المواقع إلى أدوات البناء',
  'Airtable / Sheets Apps': 'تطبيقات Airtable / Sheets',
  'Digitize Business': 'رقمنة الأعمال',
  'Website Chat Builder': 'بناء المواقع بالمحادثة',
  'Build/Host/Export Sites': 'بناء واستضافة وتصدير المواقع',
  'Prompt Engineering': 'هندسة الأوامر (Prompts)',
  'AI Web Building': 'بناء المواقع بالذكاء الاصطناعي',
  'SEO / AI Visibility': 'تحسين محركات البحث والظهور للذكاء الاصطناعي',
  'Autonomous LLM': 'وكيل ذكاء اصطناعي مستقل',
};

const PLATFORMS: Platform[] = [
  { name: 'Emergent', category: 'Full-Stack Web & Mobile', description: 'ابنِ تطبيقات ويب وموبايل متكاملة في دقائق.', url: 'https://shortet.com/GetEmergen' },
  { name: 'Lovable', category: 'AI No-Code Full-Stack', description: 'أداة بناء تطبيقات متكاملة بدون كود بالذكاء الاصطناعي.', url: 'https://shortet.com/Lovable', video: 'https://www.youtube.com/watch?v=mOak_imYmqU' },
  { name: 'Blackbox', category: 'AI No-Code App & Web', description: 'منصة بناء المواقع والتطبيقات بدون كود بالذكاء الاصطناعي.', url: 'https://shortet.com/Blackbox', video: 'https://www.youtube.com/watch?v=6smHXL5DOMQ' },
  { name: 'Base44', category: 'Full-Stack Apps', description: 'ابنِ تطبيقات كاملة الوظائف باستخدام الذكاء الاصطناعي.', url: 'https://shortet.com/Base44', video: 'https://www.youtube.com/watch?v=osm8zUrbugc' },
  { name: 'Atoms Dev', category: 'Products That Sell', description: 'حوّل أفكارك إلى منتجات تجارية ناجحة.', url: 'https://shortet.com/atoms-dev', video: 'https://www.youtube.com/watch?v=ap43yKEDO0A' },
  { name: 'Rork', category: 'AI No-Code Full-Stack', description: 'أداة بناء تطبيقات متكاملة بدون كود بالذكاء الاصطناعي.', url: 'https://shortet.com/Rork', video: 'https://www.youtube.com/watch?v=VTg-TBAuHzA' },
  { name: 'Aitmpl', category: 'Claude Code Templates', description: 'سوق قوالب جاهزة لـ Claude Code.', url: 'https://shortet.com/Aitmpl', video: 'https://www.youtube.com/watch?v=zK3JznwUYdE' },
  { name: 'APPGen', category: 'Mobile Apps', description: 'ابنِ تطبيقات موبايل كاملة بالذكاء الاصطناعي.', url: 'https://shortet.com/APPGen', video: 'https://www.youtube.com/watch?v=vNf-v_a-W8A' },
  { name: 'Blink', category: 'Instant Apps', description: 'حوّل أي فكرة إلى تطبيق يعمل بجمالية وروعة خلال ثوانٍ.', url: 'https://shortet.com/Blink', video: 'https://www.youtube.com/watch?v=3RB6hBQbCA0' },
  { name: 'Builder.io', category: 'Visual Deployment', description: 'منصة نشر بصري للتطبيقات والمواقع.', url: 'https://shortet.com/Builder-IO', video: 'https://www.youtube.com/watch?v=ZQEGVhw9kog' },
  { name: 'Buildnatively', category: 'Website → Mobile App', description: 'حوّل أي موقع إلكتروني إلى تطبيق موبايل.', url: 'https://shortet.com/Buildnatively', video: 'https://www.youtube.com/watch?v=VfNRd5Rk0cM' },
  { name: 'FlutterFlow', category: 'No-Code Apps', description: 'أداة بناء تطبيقات بدون كود تصدر كود Flutter.', url: 'https://shortet.com/flutterflow', video: 'https://www.youtube.com/watch?v=RMGSXYp-eLk' },
  { name: 'HeyBoss', category: 'Business in 10 Minutes', description: 'أطلق مشروعك في 10 دقائق بالذكاء الاصطناعي.', url: 'https://shortet.com/HeyBoss', video: 'https://www.youtube.com/watch?v=RSTDhACFJtg' },
  { name: 'Medo Dev', category: 'Full-Stack Apps', description: 'ابنِ تطبيقات متكاملة بواسطة الذكاء الاصطناعي.', url: 'https://shortet.com/Medo-Dev', video: 'https://www.youtube.com/watch?v=PSP3_UbfuzQ' },
  { name: 'OnSpace', category: 'AI App Platform', description: 'OnSpace AI \u2014 ابنِ وانشر تطبيقات الذكاء الاصطناعي.', url: 'https://shortet.com/OnSpace', video: 'https://www.youtube.com/watch?v=AqUpzZRZAyA' },
  { name: 'Tempo', category: 'AI No-Code Full-Stack', description: 'أداة بناء تطبيقات متكاملة بدون كود بالذكاء الاصطناعي.', url: 'https://shortet.com/Tempo', video: 'https://www.youtube.com/watch?v=yVOUR256vz4' },
  { name: 'Twinr', category: 'No-Code Apps', description: 'منصة بناء تطبيقات موبايل بدون كود.', url: 'https://shortet.com/Twinr', video: 'https://www.youtube.com/watch?v=lwZHlIEhWW0' },
  { name: 'YouWare', category: 'Community & Templates', description: 'مجتمع وقوالب لـ Vibe Coding بالذكاء الاصطناعي.', url: 'https://shortet.com/YouWare', video: 'https://www.youtube.com/watch?v=wY3TLikRWEo' },
  { name: 'Convex', category: 'Backend / Database', description: 'قاعدة بيانات تفاعلية مفتوحة المصدر لمطوري التطبيقات.', url: 'https://shortet.com/convex' },
  { name: 'Emergent (Full Stack)', category: 'Full-Stack Web & Mobile', description: 'أداة بناء تطبيقات متكاملة بالذكاء الاصطناعي.', url: 'https://shortet.com/Emergent', video: 'https://www.youtube.com/watch?v=9gBMJqjXba8' },
  { name: 'Fourthwall', category: 'E-Commerce', description: 'متجر تجارة إلكترونية (طباعة عند الطلب، منتجات رقمية ومادية).', url: 'https://shortet.com/Fourthwall', video: 'https://www.youtube.com/watch?v=U5MT2DTGMiM' },
  { name: 'Passion', category: 'No-Code Apps', description: 'منصة بناء تطبيقات بدون كود.', url: 'https://shortet.com/Passion', video: 'https://www.youtube.com/watch?v=8LCzq1vEkOk' },
  { name: 'Purelanderas', category: 'CPA Landing Pages', description: 'إنشاء صفحات هبوط لعروض CPA.', url: 'https://shortet.com/Purelanderas', video: 'https://www.youtube.com/watch?v=-SEMZ6jJ8Dw' },
  { name: 'Softlite', category: 'Clone to Page Builder', description: 'انسخ أي موقع إلى أداة بناء الصفحات الخاصة بك بالذكاء الاصطناعي.', url: 'https://shortet.com/Softlite', video: 'https://www.youtube.com/watch?v=jeYBeqp-b3w' },
  { name: 'Softr', category: 'Airtable / Sheets Apps', description: 'أنشئ تطبيقات ويب وموبايل انطلاقاً من Airtable وSheets.', url: 'https://shortet.com/Softr', video: 'https://www.youtube.com/watch?v=h1gmBEnRj2k' },
  { name: 'Stacksmarket', category: 'Digitize Business', description: 'رقمن كل أعمالك بالذكاء الاصطناعي بنقرة واحدة.', url: 'https://shortet.com/Stacksmarket', video: 'https://www.youtube.com/watch?v=VqiVc4_0lSg' },
  { name: 'Stunning', category: 'Website Chat Builder', description: 'ابنِ مواقع إلكترونية عبر الدردشة مع الذكاء الاصطناعي.', url: 'https://shortet.com/Stunning', video: 'https://www.youtube.com/watch?v=PqIY_nEDPrI' },
  { name: 'EasySite', category: 'AI No-Code Full-Stack', description: 'أداة بناء مواقع وتطبيقات متكاملة بدون كود بالذكاء الاصطناعي.', url: 'https://shortet.com/EasySite', video: 'https://www.youtube.com/watch?v=d2CujxoK4p0' },
  { name: 'CodeDesign', category: 'Build/Host/Export Sites', description: 'أداة بناء مواقع بالذكاء الاصطناعي \u2014 ابنِ واستضِف وصدر.', url: 'https://shortet.com/Code-design', video: 'https://www.youtube.com/watch?v=JdruFdxyMb4' },
  { name: 'CopyCoder', category: 'Prompt Engineering', description: 'إنشاء أوامر قوية لأدوات البرمجة بالذكاء الاصطناعي.', url: 'https://shortet.com/Copycoder', video: 'https://www.youtube.com/watch?v=iezDhaTXlcw' },
  { name: 'Andromo', category: 'No-Code Apps', description: 'منصة بناء تطبيقات موبايل بدون كود.', url: 'https://shortet.com/Andromo', video: 'https://www.youtube.com/watch?v=ov8C7YlH40k' },
  { name: 'Appcreator24', category: 'No-Code Apps', description: 'أداة بناء تطبيقات Android بدون كود.', url: 'https://shortet.com/Appcreatore24', video: 'https://www.youtube.com/watch?v=wMHyLXp1y0o' },
  { name: 'Appsgeyser', category: 'No-Code Apps', description: 'منصة بناء تطبيقات Android بدون كود.', url: 'https://shortet.com/Appsgeyser', video: 'https://www.youtube.com/watch?v=BdwHcAPKPJY' },
  { name: 'Appy Pie', category: 'No-Code Apps', description: 'منصة بناء تطبيقات بدون كود.', url: 'https://shortet.com/appypie', video: 'https://www.youtube.com/watch?v=bRpp9_dcoEU' },
  { name: 'Blazr', category: 'E-Commerce', description: 'أداة بناء متاجر إلكترونية.', url: 'https://shortet.com/blazr', video: 'https://www.youtube.com/watch?v=B8a3VHaGXF8' },
  { name: 'Claude', category: 'AI Web Building', description: 'بناء مواقع مجانًا مع Claude AI.', url: 'https://shortet.com/Claude', video: 'https://www.youtube.com/watch?v=CSt23RTkmbQ' },
  { name: 'Easyorder', category: 'E-Commerce', description: 'أنشئ متجرك في 5 دقائق.', url: 'https://shortet.com/easy-orders', video: 'https://www.youtube.com/watch?v=2o8npPSGNXg' },
  { name: 'Lovablehtml', category: 'SEO / AI Visibility', description: 'تحسين محركات البحث والظهور لنماذج الذكاء الاصطناعي لمواقع Lovable.', url: 'https://shortet.com/lovablehtml', video: 'https://www.youtube.com/watch?v=Y9OUJUdr8vo' },
  { name: 'Manus', category: 'Autonomous LLM', description: 'وكيل Manus المستقل القائم على نماذج اللغات الضخمة.', url: 'https://shortet.com/Manus', video: 'https://www.youtube.com/watch?v=tV5jB38Jilo' },
  { name: 'Mobeasy', category: 'No-Code Apps', description: 'منصة بناء تطبيقات موبايل بدون كود.', url: 'https://shortet.com/Mobeasy', video: 'https://www.youtube.com/watch?v=U8UXGUZdNcU' },
  { name: 'Mobella', category: 'No-Code Apps', description: 'منصة بناء تطبيقات موبايل بدون كود.', url: 'https://shortet.com/Mobella', video: 'https://www.youtube.com/watch?v=anEvUJL0unI' },
];

const VibeCodingPlatforms2026AR: React.FC = () => {
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    image: [heroImg],
    datePublished: '2026-06-28',
    author: { '@type': 'Organization', name: 'MoMoAI' },
    publisher: { '@type': 'Organization', name: 'FoundStart' },
    mainEntityOfPage: 'https://foundstart.org/blog/vibe-coding-platforms-2026',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'ما هي برمجة Vibe Coding؟', acceptedAnswer: { '@type': 'Answer', text: 'برمجة Vibe Coding هي ممارسة بناء تطبيقات الويب والموبايل المتكاملة عبر وصفها باللغة الطبيعية للذكاء الاصطناعي، والذي يتولى توليد الكود ونشره لك.' } },
      { '@type': 'Question', name: 'ما هي أفضل منصة متكاملة بدون كود بالذكاء الاصطناعي في عام 2026؟', acceptedAnswer: { '@type': 'Answer', text: 'تُعد Lovable وEmergent وBase44 وRork المنصات الرائدة في مجال التطبيقات المتكاملة بدون كود بالذكاء الاصطناعي، ولكل منها تركيز خاص على تطبيقات الويب أو تطبيقات الموبايل أو التطوير السريع للوصول للمنتج المناسب للسوق.' } },
      { '@type': 'Question', name: 'هل يمكنني بناء تطبيق موبايل بدون كتابة كود؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم \u2014 تتيح لك منصات مثل APPGen وFlutterFlow وRork وTwinr وBuildnatively بناء تطبيقات موبايل جاهزة للإطلاق دون كتابة أسطر برمجية.' } },
    ],
  };

  const PartnerCard: React.FC<{ p: Platform }> = ({ p }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base">{p.name}</h4>
          <Badge variant="secondary" className="text-xs">{categoryMap[p.category] || p.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <Button asChild size="sm">
            <a href={tag(p.url, p.name)} target="_blank" rel="noopener noreferrer sponsored">
              زيارة الموقع <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
          {p.video && (
            <Button size="sm" variant="outline" onClick={() => setVideo({ url: p.video!, title: `${p.name} \u2014 العرض التوضيحي والمراجعة` })}>
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
        <meta name="keywords" content="vibe coding, AI no-code, Lovable, Emergent, Base44, Blackbox, Rork, Builder.io, FlutterFlow, APPGen, Claude, full-stack AI, no-code apps 2026" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={heroImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://foundstart.org/blog/vibe-coding-platforms-2026" />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> العودة إلى المدونة
            </Link>
            <Badge className="mb-3"><Sparkles className="w-3 h-3 mr-1" /> Vibe Coding</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-muted-foreground mb-6">{DESCRIPTION}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-1.5" /> MoMoAI</span>
              <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> 28 يونيو 2026</span>
              <span className="inline-flex items-center"><Clock className="w-4 h-4 mr-1.5" /> قراءة في 15 دقيقة</span>
            </div>
            <img src={heroImg} alt="منصات Vibe Coding بالذكاء الاصطناعي 2026" width={1536} height={896} className="w-full rounded-xl border shadow-lg mb-10" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                في عام 2026، لم تعد تكتب التطبيقات سطرًا بسطر \u2014 بل <strong>تصفها فقط</strong>. تحول منصات "Vibe coding"
                الأوامر النصية إلى تطبيقات ويب متكاملة، أو تطبيقات موبايل، أو متاجر إلكترونية في غضون دقائق. هذا
                الدليل من MoMoAI يغطي أكثر من 40 منصة عبر جميع الفئات، مع فيديوهات توضيحية استعرضناها لتقييم كل منصة.
              </p>

              <h2><Code2 className="inline w-6 h-6 mr-2" />أدوات بناء تطبيقات الويب والموبايل المتكاملة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /Full-Stack|Instant|Business in|Products That|Chat Builder|AI App/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>أدوات بناء تطبيقات الموبايل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /No-Code Apps|Mobile Apps|Website \u2192 Mobile App/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>التجارة الإلكترونية وصفحات الهبوط</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /E-Commerce|CPA Landing|Clone to|Airtable/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>الخلفيات البرمجية والقوالب وأدوات الذكاء الاصطناعي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /Backend|Claude Code|Community|Prompt|SEO|Autonomous|Build\/Host|Digitize|Visual/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>حزمة Vibe-Coding الموصى بها من MoMoAI</h2>
              <ul>
                <li><strong>تطبيقات الويب أولاً:</strong> Lovable أو Emergent \u2014 أسرع مسار للوصول إلى بيئة الإنتاج.</li>
                <li><strong>تطبيقات الموبايل المرافقة:</strong> Rork أو APPGen إذا كنت بحاجة إلى تطبيقات أصيلة (Native).</li>
                <li><strong>الخلفية البرمجية:</strong> Convex لقواعد البيانات التفاعلية.</li>
                <li><strong>التجارة الإلكترونية:</strong> Fourthwall للمتاجر الإلكترونية (الطباعة عند الطلب، والمنتجات المادية والرقمية).</li>
                <li><strong>القوالب والأوامر:</strong> Aitmpl + CopyCoder لتسريع صياغة الأوامر وتحسين النتائج.</li>
              </ul>
            </div>
          </article>
        </main>
        <Footer />
      </div>

      {video && (
        <VideoModal isOpen={!!video} onClose={() => setVideo(null)} videoUrl={video.url} title={video.title} />
      )}
    </>
  );
};

export default VibeCodingPlatforms2026AR;
