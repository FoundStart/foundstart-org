import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, CheckCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { waEgyptLink } from '@/lib/whatsapp';
import { Link } from 'react-router-dom';

const types: [string, string][] = [
  ['Sole Proprietorship', 'منشأة فردية'],
  ['General Partnership', 'شركة التضامن'],
  ['Limited Partnership', 'شركة التوصية البسيطة'],
  ['Partnership Limited by Shares', 'شركة التوصية بالأسهم'],
  ['Limited Liability Company (LLC)', 'شركة ذات مسئولية محدودة'],
  ['Joint Stock Company', 'شركة مساهمة'],
];

const steps: [string, string][] = [
  ['Message us on WhatsApp and tell us what you plan to do.', 'راسلنا على واتساب وأخبرنا بنشاطك المخطط.'],
  ['We help you pick the right company type for your case.', 'نساعدك في اختيار نوع الشركة المناسب لحالتك.'],
  ['We confirm the documents, timeline and costs with you before you start.', 'نؤكد معك المستندات والمدة والتكلفة قبل أن تبدأ.'],
  ['Your formation is handled step by step and we keep you updated.', 'يتم تأسيس شركتك خطوة بخطوة ونوافيك بالمستجدات.'],
];

const EgyptCountryDetails = () => {
  const { isRTL } = useTranslation();
  const i = isRTL ? 1 : 0;
  const cta = (
    <Button size="lg" asChild className="text-lg px-8 bg-green-600 hover:bg-green-700 text-white">
      <a href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-5 h-5 mx-2" />
        {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      </a>
    </Button>
  );
  return (
    <div className="mb-12 space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="glass-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isRTL ? 'تأسيس شركة في مصر عبر واتساب' : 'Set up your Egypt company on WhatsApp'}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isRTL ? 'تواصل معنا مباشرة وسنرد عليك بالتفاصيل والتكلفة المناسبة لحالتك.' : 'Message us directly and we will reply with the details and the cost that fits your case.'}
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/dashboard/formation?country=eg">{isRTL ? 'ابدأ أونلاين من لوحة التحكم' : 'Start online in your dashboard'}</Link>
              </Button>
              {cta}
            </div>
            <a dir="ltr" href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline">+20 100 290 5764</a>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><Building className="w-5 h-5" />{isRTL ? 'أنواع الشركات في مصر' : 'Company types in Egypt'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {types.map((t, k) => (
              <div key={k} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t[i]}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {isRTL
              ? 'رسوم الخدمة تبدأ من $249 (منشأة فردية) حتى $1,499 (شركة منطقة حرة)، والرسوم الحكومية منفصلة. الأسعار الدقيقة ومتطلبات كل نوع موجودة في معالج التأسيس داخل لوحة التحكم.'
              : 'Service fees range from $249 (sole establishment) to $1,499 (free zone company); government fees are separate. Exact per-type prices and requirements are listed in the formation wizard in your dashboard.'}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-xl">{isRTL ? 'كيف نعمل' : 'How it works'}</CardTitle></CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {steps.map((s, k) => (
              <li key={k} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">{k + 1}</span>
                <span>{s[i]}</span>
              </li>
            ))}
          </ol>
          <div className="text-center mt-6">{cta}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgyptCountryDetails;
