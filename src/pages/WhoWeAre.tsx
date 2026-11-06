import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FormationScope from '@/components/FormationScope';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
export default function WhoWeAre() {
 const L=useL(); const {isRTL}=useTranslation();
 return <div className="min-h-screen bg-background" dir={isRTL?'rtl':'ltr'}><Header/><main><PageHero title={L('About','عن')} highlight="FoundStart" subtitle={L('Guides, comparison tools and formation enquiries for founders.','أدلة وأدوات مقارنة واستفسارات تأسيس للمؤسسين.')}/><div className="max-w-4xl mx-auto px-4 py-10"><h2 className="text-2xl font-bold mb-4">{L('What we do','ماذا نقدم')}</h2><p className="leading-relaxed">{L('FoundStart publishes bilingual guides and tools to compare company-formation options. The site has a direct FoundStart order route and separate third-party partner links. A partner listing is not a promise that its services are included in a direct order.','ينشر FoundStart أدلة وأدوات بالعربية والإنجليزية لمقارنة خيارات تأسيس الشركات. يحتوي الموقع على مسار طلب مباشر من FoundStart وروابط منفصلة لشركاء. وجود عرض شريك لا يعني شمول خدماته في طلب مباشر.')}</p><p className="mt-4 leading-relaxed">{L('Before a direct order, ask who is responsible for filing, which provider will deliver each service, and which written terms apply. This page does not present verified customer testimonials or identify a filing provider for a particular order.','قبل الطلب المباشر، اسأل عن المسؤول عن الإيداع ومقدم كل خدمة والشروط المكتوبة المطبقة. هذه الصفحة لا تعرض شهادات عملاء موثقة ولا تحدد مقدم تنفيذ لطلب بعينه.')}</p><FormationScope/></div></main><Footer/></div>;
}
