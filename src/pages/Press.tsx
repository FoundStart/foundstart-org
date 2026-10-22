import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

interface PressLink {
  en: string;
  ar: string;
  href: string;
  external?: boolean;
}

interface Property {
  name: string;
  descEn: string;
  descAr: string;
  links: PressLink[];
}

const properties: Property[] = [
  {
    name: 'FoundStart',
    descEn: 'Company formation, banking and digital services - our main blog, guides and videos live here.',
    descAr: 'تأسيس الشركات والخدمات البنكية والرقمية - مدونتنا الرئيسية وأدلتنا وفيديوهاتنا هنا.',
    links: [
      { en: 'Blog', ar: 'المدونة', href: '/blog' },
      { en: 'Founder Guides', ar: 'أدلة المؤسسين', href: '/guides' },
      { en: 'Media & Videos', ar: 'الوسائط والفيديوهات', href: '/media' },
      { en: 'Tutorials', ar: 'الشروحات', href: '/tutorials' },
      { en: 'Learning', ar: 'التعلم', href: '/learning' },
    ],
  },
  {
    name: 'Namelizer',
    descEn: 'Domain portfolio manager for domain investors - bilingual blog on domains, pricing and sales.',
    descAr: 'مدير محفظة دومينات للمستثمرين - مدونة ثنائية اللغة عن الدومينات والتسعير والمبيعات.',
    links: [
      { en: 'Blog', ar: 'المدونة', href: 'https://www.namelizer.com/blog', external: true },
      { en: 'Features', ar: 'المميزات', href: 'https://www.namelizer.com/features', external: true },
    ],
  },
  {
    name: 'HeyKeyword',
    descEn: 'Brand mention monitoring with AI verification - blog, videos and free SEO tools.',
    descAr: 'مراقبة mentions براندك بالذكاء الاصطناعي - مدونة وفيديوهات وأدوات SEO مجانية.',
    links: [
      { en: 'Blog', ar: 'المدونة', href: 'https://heykeyword.com/blog', external: true },
      { en: 'Videos', ar: 'الفيديوهات', href: 'https://heykeyword.com/videos', external: true },
      { en: 'Free Tools', ar: 'أدوات مجانية', href: 'https://heykeyword.com/tools', external: true },
    ],
  },
  {
    name: 'Shortet',
    descEn: 'URL shortener, bio pages and QR codes with analytics.',
    descAr: 'اختصار روابط وصفحات bio ورموز QR مع إحصائيات.',
    links: [
      { en: 'Website', ar: 'الموقع', href: 'https://shortet.com', external: true },
    ],
  },
  {
    name: 'Cartgy',
    descEn: 'Digital store - home of the domain trading guide in English and Arabic.',
    descAr: 'متجر رقمي - وفيه دليل تجارة الدومينات بالإنجليزية والعربية.',
    links: [
      { en: 'Store', ar: 'المتجر', href: 'https://cartgy.com', external: true },
      { en: 'Domain Trading Guide (EN)', ar: 'دليل تجارة الدومينات (إنجليزي)', href: 'https://cartgy.com/products/domain-trading-digital-real-estate-the-complete-guide-to-buying-valuing-and-selling-domain-names', external: true },
      { en: 'الدليل العربي لتجارة الدومينات', ar: 'الدليل العربي لتجارة الدومينات', href: 'https://cartgy.com/products/tgr-ldomynt-laakrt-lrkmy-ldlyl-laarby-lkml', external: true },
    ],
  },
  {
    name: 'ClotheCart',
    descEn: 'Online clothing store.',
    descAr: 'متجر ملابس أونلاين.',
    links: [
      { en: 'Store', ar: 'المتجر', href: 'https://clothecart.com', external: true },
    ],
  },
];

const listings: PressLink[] = [
  { en: 'Product Hunt', ar: 'Product Hunt', href: 'https://www.producthunt.com/products/foundstart?launch=foundstart-2-0', external: true },
  { en: 'LaunchBuff', ar: 'LaunchBuff', href: 'https://launchbuff.com/products/foundstart-1mmzs2', external: true },
];

const Press = () => {
  const { language } = useTranslation();
  const L = (en: string, ar: string) => (language === 'ar' ? ar : en);

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      <PageHero
        title={L('Blogs &', 'المدونات')}
        highlight={L('Media', 'والوسائط')}
        subtitle={L(
          'Blogs, guides, videos and media from FoundStart and our sister products - all in one place.',
          'المدونات والأدلة والفيديوهات والوسائط من FoundStart وكل منتجاتنا الشقيقة - في مكان واحد.'
        )}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((p) => (
              <Card key={p.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  <CardDescription>{L(p.descEn, p.descAr)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {p.links.map((l) =>
                      l.external ? (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-1">
                            {L(l.en, l.ar)}
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      ) : (
                        <Link key={l.href} to={l.href}>
                          <Button variant="outline" size="sm" className="gap-1">
                            {L(l.en, l.ar)}
                            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                          </Button>
                        </Link>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {L('Featured on', 'مذكورون على')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {L('Launch platforms where FoundStart is listed.', 'منصات الإطلاق اللي FoundStart متسجل عليها.')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {listings.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-1">
                    {l.en}
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Press;
