import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Landmark } from 'lucide-react';
import { useL } from '@/hooks/useL';

interface Resource { country: [string, string]; flag: string; label: [string, string]; url: string; note?: [string, string] }

// Verified 2026-10-31: each URL fetched and confirmed to show the named official registry resource.
const RESOURCES: Resource[] = [
  { country: ['United Kingdom', 'المملكة المتحدة'], flag: '🇬🇧', label: ['Model articles of association - GOV.UK (Companies House)', 'نماذج النظام الأساسي للشركات - GOV.UK'], url: 'https://www.gov.uk/guidance/model-articles-of-association-for-limited-companies' },
  { country: ['United States', 'الولايات المتحدة'], flag: '🇺🇸', label: ['Form SS-4, EIN application - IRS', 'نموذج SS-4 لطلب الرقم الضريبي EIN - IRS'], url: 'https://www.irs.gov/forms-pubs/about-form-ss-4' },
  { country: ['Egypt', 'مصر'], flag: '🇪🇬', label: ['Investor eServices - GAFI', 'الخدمات الإلكترونية للمستثمرين - الهيئة العامة للاستثمار'], url: 'https://gafi.gov.eg/English/eServices' },
  { country: ['Estonia', 'إستونيا'], flag: '🇪🇪', label: ['e-Business Register portal', 'بوابة السجل التجاري الإلكتروني'], url: 'https://www.rik.ee/en/e-business-register/e-business-register-portal' },
  { country: ['Finland', 'فنلندا'], flag: '🇫🇮', label: ['Trade Register forms - PRH', 'نماذج السجل التجاري - PRH'], url: 'https://www.prh.fi/en/forms/lomakkeet.html' },
  { country: ['Sweden', 'السويد'], flag: '🇸🇪', label: ['Aktiebolag forms and templates - Bolagsverket', 'نماذج وقوالب الشركات المساهمة - Bolagsverket'], url: 'https://bolagsverket.se/sjalvservice/blanketterochmallar/aktiebolag.1713.html', note: ['Swedish language', 'باللغة السويدية'] },
  { country: ['Latvia', 'لاتفيا'], flag: '🇱🇻', label: ['Register a company - Enterprise Register', 'تسجيل شركة - السجل التجاري اللاتفي'], url: 'https://www.ur.gov.lv/en/services/register-company-organisation-contract-commercial-pledge' },
  { country: ['Lithuania', 'ليتوانيا'], flag: '🇱🇹', label: ['Incorporate a company - Registru centras', 'تأسيس شركة - Registru centras'], url: 'https://www.registrucentras.lt/en/service/juridinio-asmens-iregistravimas-kai-steigia-fizinis-asmuo' },
  { country: ['Ireland', 'أيرلندا'], flag: '🇮🇪', label: ['CRO forms - Companies Registration Office', 'نماذج مكتب تسجيل الشركات - CRO'], url: 'https://cro.ie/publications/forms-cro/' },
];

const OfficialResources = () => {
  const L = useL();
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" /> {L('Official resources by country', 'مصادر رسمية حسب الدولة')}</CardTitle>
        <CardDescription>{L('Links to official government registries and their published forms and guides.', 'روابط للسجلات الحكومية الرسمية وما تنشره من نماذج وأدلة.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-md border p-3 text-sm hover:bg-muted/50 transition-colors">
                <span className="text-lg leading-none">{r.flag}</span>
                <span className="flex-1">
                  <span className="font-medium">{L(r.country[0], r.country[1])}</span>
                  <span className="block text-muted-foreground">
                    {L(r.label[0], r.label[1])}
                    {r.note ? ` (${L(r.note[0], r.note[1])})` : ''}
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{L('These are official registry resources. Requirements, fees and form versions change - always confirm the current requirements on the registry site before relying on any document. Not every form on a registry site applies to every entity type or situation; this is not legal advice.', 'دي روابط لمصادر رسمية للسجلات الحكومية. المتطلبات والرسوم وإصدارات النماذج بتتغير - لازم تتأكد من المتطلبات الحالية على موقع السجل قبل الاعتماد على أي مستند. مش كل نموذج على موقع السجل بينطبق على كل نوع شركة أو حالة؛ ده مش استشارة قانونية.')}</p>
      </CardContent>
    </Card>
  );
};

export default OfficialResources;
