import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, Landmark } from 'lucide-react';
import { useL } from '@/hooks/useL';

interface OfficialDownload { label: [string, string]; url: string; format: 'PDF' | 'DOC'; note?: [string, string] }
interface Resource { country: [string, string]; flag: string; label: [string, string]; url: string; note?: [string, string]; downloads?: OfficialDownload[] }

// Verified 2026-11-02: each URL fetched and confirmed to show the named official registry resource.
// Downloads: direct file URLs on the registry's own infrastructure, fetch-verified 2026-11-02
// (HTTP 200 with the expected file content type). Files are hosted, versioned and revised by the
// registries themselves; we never mirror or redistribute them.
const RESOURCES: Resource[] = [
  { country: ['United Kingdom', 'المملكة المتحدة'], flag: '🇬🇧', label: ['Model articles of association - GOV.UK (Companies House)', 'نماذج النظام الأساسي للشركات - GOV.UK'], url: 'https://www.gov.uk/guidance/model-articles-of-association-for-limited-companies',
    downloads: [
      { label: ['Model articles - private company limited by shares', 'النموذج الأساسي - شركة خاصة محدودة بالأسهم'], url: 'https://assets.publishing.service.gov.uk/media/5a750aefe5274a59fa716f12/model_articles_private_ltd_by_shares.doc', format: 'DOC' },
      { label: ['Model articles - private company limited by guarantee', 'النموذج الأساسي - شركة خاصة محدودة بالضمان'], url: 'https://assets.publishing.service.gov.uk/media/5a7ed89240f0b62305b838b9/model_articles_private_ltd_by_guarantee.doc', format: 'DOC' },
      { label: ['Model articles - public companies', 'النموذج الأساسي - الشركات العامة'], url: 'https://assets.publishing.service.gov.uk/media/5a7f71c5ed915d74e33f6789/model_articles_for_public_companies_after28April2013.doc', format: 'DOC' },
    ] },
  { country: ['United States', 'الولايات المتحدة'], flag: '🇺🇸', label: ['Form SS-4, EIN application - IRS', 'نموذج SS-4 لطلب الرقم الضريبي EIN - IRS'], url: 'https://www.irs.gov/forms-pubs/about-form-ss-4',
    downloads: [
      { label: ['Form SS-4 (fillable PDF)', 'نموذج SS-4 (PDF قابل للتعبئة)'], url: 'https://www.irs.gov/pub/irs-pdf/fss4.pdf', format: 'PDF' },
    ] },
  { country: ['Egypt', 'مصر'], flag: '🇪🇬', label: ['Investor eServices - GAFI', 'الخدمات الإلكترونية للمستثمرين - الهيئة العامة للاستثمار'], url: 'https://gafi.gov.eg/English/eServices' },
  { country: ['Estonia', 'إستونيا'], flag: '🇪🇪', label: ['e-Business Register portal', 'بوابة السجل التجاري الإلكتروني'], url: 'https://www.rik.ee/en/e-business-register/e-business-register-portal',
    note: ['Per the official portal guidance, the establishment application is prepared and signed on the portal with Estonian e-identity (ID-card, Smart-ID or Mobile-ID)', 'وفقاً لإرشادات البوابة الرسمية، يتم إعداد طلب التأسيس وتوقيعه داخل البوابة بالهوية الإلكترونية الإستونية (بطاقة الهوية أو Smart-ID أو Mobile-ID)'] },
  { country: ['Finland', 'فنلندا'], flag: '🇫🇮', label: ['Trade Register forms - PRH', 'نماذج السجل التجاري - PRH'], url: 'https://www.prh.fi/en/forms/lomakkeet.html',
    downloads: [
      { label: ['Y1 - start-up notification, limited liability company', 'Y1 - إشعار بدء النشاط للشركة المحدودة'], url: 'https://www.prh.fi/material/sites/ytj/attachments/saavutettavat-y-lomakkeet/en/rqkm38u88/Y1-form.pdf', format: 'PDF' },
      { label: ['Y3 - start-up notification, private trader', 'Y3 - إشعار بدء النشاط للتاجر الفرد'], url: 'https://www.prh.fi/material/sites/ytj/attachments/saavutettavat-y-lomakkeet/en/ve0hzdej8/Y3-form.pdf', format: 'PDF' },
    ] },
  { country: ['Sweden', 'السويد'], flag: '🇸🇪', label: ['Aktiebolag forms and templates - Bolagsverket', 'نماذج وقوالب الشركات المساهمة - Bolagsverket'], url: 'https://bolagsverket.se/sjalvservice/blanketterochmallar/aktiebolag.1713.html',
    downloads: [
      { label: ['Form 816 - registration of a new limited company (Swedish)', 'نموذج 816 - تسجيل شركة مساهمة جديدة (بالسويدية)'], url: 'https://bolagsverket.se/download/18.46f4138717c599ee403aa9d2/1773819703574/816.pdf', format: 'PDF' },
      { label: ['Form 816e - registration of a new limited company (English)', 'نموذج 816e - تسجيل شركة مساهمة جديدة (بالإنجليزية)'], url: 'https://bolagsverket.se/download/18.46f4138717c599ee403ab3fa/1675933779846/816e.pdf', format: 'PDF' },
    ] },
  { country: ['Latvia', 'لاتفيا'], flag: '🇱🇻', label: ['Register a company - Enterprise Register', 'تسجيل شركة - السجل التجاري اللاتفي'], url: 'https://www.ur.gov.lv/en/services/register-company-organisation-contract-commercial-pledge',
    note: ['Per the official registration guidance, the KR4 application is completed through the register\u2019s e-service and must be signed by all founders', 'وفقاً لإرشادات التسجيل الرسمية، يتم إكمال طلب KR4 عبر الخدمة الإلكترونية للسجل ويجب توقيعه من جميع المؤسسين'] },
  { country: ['Lithuania', 'ليتوانيا'], flag: '🇱🇹', label: ['Incorporate a company - Registru centras', 'تأسيس شركة - Registru centras'], url: 'https://www.registrucentras.lt/en/service/juridinio-asmens-iregistravimas-kai-steigia-fizinis-asmuo' },
  { country: ['Ireland', 'أيرلندا'], flag: '🇮🇪', label: ['CRO forms - Companies Registration Office', 'نماذج مكتب تسجيل الشركات - CRO'], url: 'https://cro.ie/publications/forms-cro/',
    downloads: [
      { label: ['Info Leaflet 1 - Company Incorporation (guide)', 'النشرة المعلوماتية 1 - تأسيس الشركات (دليل)'], url: 'https://www.cro.ie/wp-content/uploads/2024/04/Info-Leaflet-1-v8.2-2014-Act.pdf', format: 'PDF' },
    ],
    note: ['Incorporation applications are filed online via the CRO\u2019s CORE portal; the leaflet is the official published guide', 'تُقدَّم طلبات التأسيس إلكترونياً عبر بوابة CORE التابعة لـ CRO؛ والنشرة هي الدليل الرسمي المنشور'] },
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
              {r.downloads && r.downloads.length > 0 && (
                <ul className="mt-1 space-y-1 ps-2">
                  {r.downloads.map((d) => (
                    <li key={d.url}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-md border border-dashed p-2 text-xs hover:bg-muted/50 transition-colors">
                        <Download className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                        <span className="flex-1">
                          {L(d.label[0], d.label[1])}
                          {d.note ? ` (${L(d.note[0], d.note[1])})` : ''}
                        </span>
                        <span className="shrink-0 rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">{d.format}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{L('These are official registry resources. Direct downloads open the registry\u2019s own file on the registry\u2019s own site - we never host or modify them. Requirements, fees and form versions change - always confirm the current requirements on the registry site before relying on any document. Not every form on a registry site applies to every entity type or situation; this is not legal advice.', 'دي روابط لمصادر رسمية للسجلات الحكومية. روابط التحميل المباشرة بتفتح الملف الرسمي على موقع السجل نفسه - إحنا لا بنستضيف ولا بنعدّل أي ملف. المتطلبات والرسوم وإصدارات النماذج بتتغير - لازم تتأكد من المتطلبات الحالية على موقع السجل قبل الاعتماد على أي مستند. مش كل نموذج على موقع السجل بينطبق على كل نوع شركة أو حالة؛ ده مش استشارة قانونية.')}</p>
      </CardContent>
    </Card>
  );
};

export default OfficialResources;
