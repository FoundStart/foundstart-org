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


interface StandardSource { name: [string, string]; url: string; rowLabel: [string, string]; linkLabel: [string, string]; linkUrl: string; docs: OfficialDownload[]; note?: [string, string] }

// Standard third-party business templates. Verified 2026-11-02: every download URL fetch-checked
// (HTTP 200/206 with the expected file content type) and each source's current license/terms page read.
// Downloads open the source's own file on the source's own infrastructure; we never mirror or modify them.
// File content is English; jurisdictions are labeled per document.
const STANDARD_SOURCES: StandardSource[] = [
  { name: ['Common Paper standard agreements', 'اتفاقيات Common Paper القياسية'], url: 'https://commonpaper.com/standards/', rowLabel: ['License', 'الرخصة'], linkLabel: ['CC BY 4.0', 'CC BY 4.0'], linkUrl: 'https://creativecommons.org/licenses/by/4.0/',
    note: ['US-law standard terms maintained by an attorney committee; free to use under CC BY 4.0 with attribution', 'شروط قياسية بقانون أمريكي يديرها فريق محامين؛ مجانية بموجب رخصة CC BY 4.0 مع نسب المصدر'],
    docs: [
      { label: ['Mutual NDA v1.0 - full agreement, cover page + standard terms (English file)', 'اتفاقية عدم إفصاح متبادل v1.0 - الاتفاقية كاملة، صفحة الغلاف + الشروط القياسية (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/mutual-nda/1.0/mutual-nda-cover-page-and-standard-terms-docx', format: 'DOC' },
      { label: ['Mutual NDA v1.0 - full agreement, cover page + standard terms (English file)', 'اتفاقية عدم إفصاح متبادل v1.0 - الاتفاقية كاملة (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/mutual-nda/1.0/mutual-nda-cover-page-and-standard-terms-pdf', format: 'PDF' },
      { label: ['Cloud Service Agreement v3.0 - full agreement (English file)', 'اتفاقية الخدمات السحابية v3.0 - الاتفاقية كاملة (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/cloud-service-agreement/3.0/cover-page-and-standard-terms-docx', format: 'DOC' },
      { label: ['Data Processing Agreement v1.1 - full agreement (English file)', 'اتفاقية معالجة البيانات v1.1 - الاتفاقية كاملة (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/data-processing-agreement/1.1/cover-page-and-standard-terms-docx', format: 'DOC' },
      { label: ['Service Level Agreement v2.0 - full agreement (English file)', 'اتفاقية مستوى الخدمة v2.0 - الاتفاقية كاملة (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/cloud-service-agreement/2.0/sla-cover-page-and-standard-terms-docx', format: 'DOC' },
      { label: ['Design Partner Agreement v1.3 - full agreement (English file)', 'اتفاقية شريك التصميم v1.3 - الاتفاقية كاملة (ملف إنجليزي)'], url: 'https://commonpaper.com/standards/design-partner-agreement/1.3/cover-page-and-standard-terms-docx', format: 'DOC' },
    ] },
  { name: ['Y Combinator post-money SAFE (US)', 'نماذج Y Combinator الاستثمارية SAFE (الولايات المتحدة)'], url: 'https://www.ycombinator.com/documents', rowLabel: ['Source and terms', 'المصدر وشروط الاستخدام'], linkLabel: ['YC SAFE documents page (no separate license grant stated)', 'صفحة مستندات YC SAFE (لا يوجد منح رخصة منفصل معلن)'], linkUrl: 'https://www.ycombinator.com/documents',
    note: ['Drafted for US-incorporated startups; Canada, Cayman and Singapore variants are on the source page. YC advises consulting a lawyer licensed in your company\u2019s country before use', 'مصممة للشركات المؤسسة في الولايات المتحدة؛ نسخ كندا وجزر كايمان وسنغافورة موجودة في صفحة المصدر. YC تنصح باستشارة محامٍ مرخص في بلد تأسيس شركتك قبل الاستخدام'],
    docs: [
      { label: ['Post-money SAFE - Valuation Cap, no Discount, US (English file)', 'SAFE - حد أقصى للتقييم بدون خصم، الولايات المتحدة (ملف إنجليزي)'], url: 'https://bookface-static.ycombinator.com/assets/ycdc/Postmoney%20Safe%20-%20Valuation%20Cap%20Only%20-%20FINAL-f2a64add6d21039ab347ee2e7194141a4239e364ffed54bad0fe9cf623bf1691.docx', format: 'DOC' },
      { label: ['Post-money SAFE - Discount, no Valuation Cap, US (English file)', 'SAFE - خصم بدون حد أقصى للتقييم، الولايات المتحدة (ملف إنجليزي)'], url: 'https://bookface-static.ycombinator.com/assets/ycdc/Postmoney%20Safe%20-%20Discount%20Only%20-%20FINAL-b9ecb516615d60c6c4653507442aa2561023004368232b7d6e75edc9629acc99.docx', format: 'DOC' },
      { label: ['Post-money SAFE - MFN, no Valuation Cap no Discount, US (English file)', 'SAFE - MFN بدون حد تقييم ولا خصم، الولايات المتحدة (ملف إنجليزي)'], url: 'https://bookface-static.ycombinator.com/assets/ycdc/Postmoney%20Safe%20-%20MFN%20Only%20-%20FINAL-2bc87fa3d2ec5072a60d653aec9a885fb43879781e44341fa720a8e7d1cc42ff.docx', format: 'DOC' },
      { label: ['Pro Rata Side Letter (English file)', 'خطاب حق المشاركة النسبية الجانبي (ملف إنجليزي)'], url: 'https://bookface-static.ycombinator.com/assets/ycdc/Pro%20Rata%20Side%20Letter-d6dd8d827741862b18fba0f658da17fb4e787e5f2dda49584b9caea89bf42302.docx', format: 'DOC' },
      { label: ['SAFE User Guide (English file)', 'دليل استخدام SAFE (ملف إنجليزي)'], url: 'https://bookface-static.ycombinator.com/assets/ycdc/SAFE%20User%20Guide-a47c6588327d73aa2799e61ed7c2cae9f1a0ee9acfa9c43b62039dc06e715832.pdf', format: 'PDF' },
    ] },
  { name: ['FoundStart blank business documents', 'نماذج أعمال فارغة من إعداد FoundStart'], url: 'https://www.foundstart.org/templates/invoice-blank-foundstart.pdf', rowLabel: ['Author', 'الإعداد'], linkLabel: ['FoundStart (authored blank template)', 'FoundStart (نموذج فارغ من إعدادنا)'], linkUrl: 'https://www.foundstart.org/templates/invoice-blank-foundstart.pdf',
    note: ['Blank invoice template authored by FoundStart - not an official form and no tax or legal compliance claim; fill in your own details before use', 'نموذج فاتورة فارغ من إعداد FoundStart - ليس مستنداً رسمياً ولا ندّعي أي توافق ضريبي أو قانوني؛ املأ بياناتك قبل الاستخدام'],
    docs: [
      { label: ['Blank invoice - English (Word)', 'فاتورة فارغة - إنجليزي (Word)'], url: 'https://www.foundstart.org/templates/invoice-blank-foundstart.docx', format: 'DOC' },
      { label: ['Blank invoice - English (PDF)', 'فاتورة فارغة - إنجليزي (PDF)'], url: 'https://www.foundstart.org/templates/invoice-blank-foundstart.pdf', format: 'PDF' },
      { label: ['Blank invoice - Arabic, right-to-left (Word)', 'فاتورة فارغة - عربي من اليمين لليسار (Word)'], url: 'https://www.foundstart.org/templates/invoice-blank-foundstart-ar.docx', format: 'DOC' },
      { label: ['Blank invoice - Arabic, right-to-left (PDF)', 'فاتورة فارغة - عربي من اليمين لليسار (PDF)'], url: 'https://www.foundstart.org/templates/invoice-blank-foundstart-ar.pdf', format: 'PDF' },
    ] },
];

const OfficialResources = () => {
  const L = useL();
  return (
    <>
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" /> {L('Standard business templates', 'نماذج أعمال قياسية')}</CardTitle>
        <CardDescription>{L('Free standard agreements published by their authors, ready to download. File content is English; each document\u2019s jurisdiction is labeled.', 'اتفاقيات قياسية مجانية منشورة من أصحابها، جاهزة للتحميل. محتوى الملفات بالإنجليزية؛ وسلطة كل مستند القانونية موضحة.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 sm:grid-cols-2">
          {STANDARD_SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-md border p-3 text-sm hover:bg-muted/50 transition-colors">
                <span className="flex-1">
                  <span className="font-medium">{L(s.name[0], s.name[1])}</span>
                  <span className="block text-muted-foreground">
                    {L(s.note ? s.note[0] : '', s.note ? s.note[1] : '')}
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
              <p className="mt-1 ps-2 text-[11px] text-muted-foreground">
                {L(s.rowLabel[0], s.rowLabel[1])}: <a href={s.linkUrl} target="_blank" rel="noopener noreferrer" className="underline">{L(s.linkLabel[0], s.linkLabel[1])}</a>
              </p>
              <ul className="mt-1 space-y-1 ps-2">
                {s.docs.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 rounded-md border border-dashed p-2 text-xs hover:bg-muted/50 transition-colors">
                      <Download className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{L(d.label[0], d.label[1])}</span>
                      <span className="shrink-0 rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">{d.format}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{L('These are third-party standard templates. Downloads open the source\u2019s own file on the source\u2019s own site - we never host or modify them. Common Paper agreements are published under CC BY 4.0; YC publishes the SAFE as an open standard. Both are drafted for US-law contexts unless labeled otherwise - have a lawyer licensed in your company\u2019s country review any template before use. This is not legal advice.', 'دي نماذج قياسية من طرف ثالث. روابط التحميل بتفتح ملف المصدر نفسه على موقعه - إحنا لا بنستضيف ولا بنعدّل أي ملف. اتفاقيات Common Paper منشورة برخصة CC BY 4.0؛ وYC تنشر SAFE كمعيار مفتوح. الاثنان مصممان للقانون الأمريكي ما لم يُذكر غير ذلك - اعرض أي نموذج على محامٍ مرخص في بلد تأسيس شركتك قبل الاستخدام. ده مش استشارة قانونية.')}</p>
      </CardContent>
    </Card>
    </>
  );
};

export default OfficialResources;
