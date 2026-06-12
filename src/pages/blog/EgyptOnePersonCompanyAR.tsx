import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Building2 } from 'lucide-react';

const EgyptOnePersonCompanyAR = () => {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden" dir="rtl">
      <Helmet>
        <title>تأسيس شركة الشخص الواحد في مصر — الدليل الكامل 2026 | FoundStart</title>
        <meta
          name="description"
          content="دليل شامل لتأسيس شركة الشخص الواحد في مصر: المستندات المطلوبة، مراحل التأسيس بالهيئة العامة للاستثمار، الشهر العقاري، السجل التجاري والبطاقة الضريبية."
        />
        <meta property="og:title" content="تأسيس شركة الشخص الواحد في مصر — الدليل الكامل" />
        <link rel="canonical" href="https://foundstart.com/blog/egypt-one-person-company-ar" />
      </Helmet>

      <Header />

      <PageHero
        title="تأسيس شركة الشخص الواحد"
        highlight="في مصر"
        subtitle="الدليل العملي خطوة بخطوة: المستندات، الهيئة العامة للاستثمار، الشهر العقاري، السجل التجاري والبطاقة الضريبية."
      />

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
          <Badge variant="secondary"><Building2 className="w-3 h-3 ml-1" />مصر</Badge>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />فريق FoundStart</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />12 يونيو 2026</span>
          <span>قراءة 10 دقائق</span>
        </div>

        <Card>
          <CardContent className="prose prose-invert max-w-none py-8 text-right leading-loose">
            <p>
              دايمًا بيقابلني ناس بتسأل عن تأسيس الشركات في مصر واستخراج السجل التجاري والبطاقة الضريبية.
              وبما إن دا مجال شغلي، حابب أساعد الناس اللي بتأسس شركتها لأول مرة.
            </p>

            <h2>أول نوع هنتكلم عليه: شركة الشخص الواحد</h2>
            <p>شركة الشخص الواحد بتتأسس داخل <strong>الهيئة العامة للاستثمار</strong>، ومميزاتها:</p>
            <ol>
              <li>المساهم (المالك) واحد فقط.</li>
              <li>ذمة مالية منفصلة عن صاحبها.</li>
              <li>ينفع تعيين أكثر من مدير.</li>
              <li>الحد الأدنى لرأس المال في السجل التجاري <strong>1000 جنيه</strong>.</li>
              <li>
                لازم تعمل شهادة بنكية برأس المال المذكور في السجل التجاري، وبعد إصدار البطاقة الضريبية
                والسجل التجاري تقدر تسترد المبلغ.
              </li>
              <li>المعاملة الضريبية: نسبة واحدة من صافي الربح.</li>
            </ol>

            <h2>المستندات المطلوبة</h2>
            <ol>
              <li>صورة بطاقة المالك.</li>
              <li>شهادة عدم التباس (تُستخرج من موقع مصر الرقمية).</li>
              <li>شهادة بنكية تفيد بسداد رأس المال (يُسترد بعد التأسيس).</li>
              <li>قبول تعيين باسم الشركة من مراقب حسابات.</li>
              <li>صورة كارنيه محامي استئناف (مستشار قانوني للشركة).</li>
              <li>توقيع إلكتروني للشخص اللي له صفة التوقيع على عقود الشركة أمام الهيئة العامة للاستثمار.</li>
            </ol>

            <h2>المرحلة الأولى — التقديم على الهيئة</h2>
            <p>رفع جميع المستندات على موقع الهيئة العامة للاستثمار، ثم التوجه للهيئة لاستكمال التأسيس.</p>
            <p>في حال متابعة الطلب إلكترونيًا بدون التوجه:</p>
            <ul>
              <li>مراجعة الطلب من قِبَل محامي الهيئة وإنشاء عقد التأسيس.</li>
              <li>إصدار عقد التأسيس وإرساله للعميل لمراجعة البنود والبيانات.</li>
              <li>سداد الرسوم إلكترونيًا في حال الموافقة على بنود العقد.</li>
              <li>توقيع العميل على المخرجات بالتوقيع الإلكتروني الخاص به.</li>
              <li>إعادة إرسال الطلب للهيئة بعد توقيع العميل على عقد التأسيس إلكترونيًا.</li>
            </ul>

            <h2>المرحلة الثانية — الشهر العقاري</h2>
            <ul>
              <li>إرسال محضر توثيق الشهر العقاري للعميل للتوقيع.</li>
              <li>توقيع الشهر العقاري بعد توقيع العميل على محضر التوثيق.</li>
            </ul>

            <h2>المرحلة الثالثة — متابعة الطلب</h2>
            <p>متابعة الطلب حتى تصدر الحالة <em>“في انتظار الغرفة التجارية”</em> أو <em>“في انتظار السجل التجاري”</em>،
              ثم التوجه للهيئة العامة للاستثمار لاستلام:</p>
            <ul>
              <li>عقد التأسيس.</li>
              <li>طلب القيد في السجل التجاري (بداخله رقم السجل التجاري).</li>
            </ul>

            <h2>المرحلة الرابعة — البطاقة الضريبية</h2>
            <p>التوجه إلى مصلحة الضرائب التابع لها العنوان لاستخراج البطاقة الضريبية، وبعدها شركتك تبقى جاهزة للعمل رسميًا.</p>

            <h2>محتاج مساعدة في التأسيس؟</h2>
            <p>
              فريق <strong>FoundStart</strong> يقدر يتولى المراحل دي نيابة عنك، من تجهيز المستندات لحد استلام السجل التجاري والبطاقة الضريبية.
              تواصل معنا على واتساب: <a href="https://wa.me/201002905764">+20 100 290 5764</a>.
            </p>
          </CardContent>
        </Card>
      </article>

      <Footer />
    </div>
  );
};

export default EgyptOnePersonCompanyAR;