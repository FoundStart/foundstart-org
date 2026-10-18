import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogAdStrip from '@/components/sedo/BlogAdStrip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Building, CheckCircle, FileText, Shield, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LLCFormationGuideBlogAR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>الدليل الشامل لتأسيس شركة LLC في 2024 | FoundStart</title>
        <meta name="description" content="كل ما تحتاج لمعرفته حول تأسيس شركة LLC في عام 2024. تعرف على كيفية اختيار الولاية، وتقديم الأوراق، ومتطلبات الامتثال، والمزايا الضريبية." />
        <meta name="keywords" content="تأسيس شركة LLC، إنشاء شركة LLC، دليل LLC، تأسيس الشركات، Delaware LLC، Wyoming LLC" />
        <link rel="canonical" href="https://www.foundstart.org/blog/llc-formation-guide-ar" />
      </Helmet>

      <Header />
      
      <BlogAdStrip position="top" slug="llc-formation-guide" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              العودة إلى المدونة
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">تأسيس الشركات</Badge>
              <Badge variant="secondary">LLC</Badge>
              <Badge variant="secondary">دليل</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              الدليل الشامل لتأسيس شركة LLC في 2024
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              كل ما تحتاج لمعرفته حول تأسيس شركة LLC، بدءاً من اختيار الولاية وصولاً إلى تقديم الأوراق ومتطلبات الامتثال المستمرة.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>15 ديسمبر 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>بقلم MoMo Sa</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>قراءة في 8 دقائق</span>
              </div>
            </div>
          </header>

                        <img src="/blog/covers/llc-formation-guide.jpg" alt="دليل تأسيس شركة LLC" className="w-full rounded-xl shadow-lg mb-10 object-cover" loading="lazy" />

          <div className="prose prose-lg max-w-none space-y-8">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  أهم النقاط
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>توفر شركات LLC حماية للمسؤولية الشخصية ومرونة ضريبية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>تعد Delaware و Wyoming من أفضل الولايات لتأسيس شركة LLC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>تتراوح تكاليف التأسيس من 50 دولاراً إلى 500 دولار حسب الولاية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>الامتثال السنوي مطلوب للحفاظ على الوضع القانوني للشركة.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <section>
              <h2 className="text-3xl font-bold mb-4">ما هي شركة LLC؟</h2>
              <p className="mb-4">
                شركة المسؤولية المحدودة (LLC) هي هيكل تجاري يجمع بين حماية المسؤولية التي توفرها الشركات المساهمة وبين المزايا الضريبية والمرونة التي توفرها شركات التضامن. وهي واحدة من أكثر هياكل الأعمال شعبية لرواد الأعمال وأصحاب المشاريع الصغيرة.
              </p>
              <p className="mb-4">
                عندما تقوم بتأسيس شركة LLC، فإنك تنشئ فصلاً قانونياً بين أصولك الشخصية وأصول عملك. وهذا يعني أنه إذا واجه عملك دعاوى قضائية أو ديوناً، فإن ممتلكاتك الشخصية (المنزل، السيارة، المدخرات) تكون محمية بشكل عام.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-7 w-7 text-primary" />
                مميزات شركة LLC
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">حماية الأصول الشخصية</h4>
                  <p className="text-sm text-muted-foreground">
                    أصولك الشخصية محمية من التزامات وديون العمل.
                  </p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">مرونة ضريبية</h4>
                  <p className="text-sm text-muted-foreground">
                    اختر كيفية فرض الضرائب على شركتك: ملكية فردية، أو شراكة، أو S-Corp، أو C-Corp.
                  </p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">المصداقية</h4>
                  <p className="text-sm text-muted-foreground">
                    امتلاك شركة LLC يضفي طابعاً احترافياً ويعزز الثقة في تعاملاتك التجارية.
                  </p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">مرونة تشغيلية</h4>
                  <p className="text-sm text-muted-foreground">
                    إجراءات رسمية أقل من الشركات المساهمة مع مرونة أكبر في هيكل الإدارة.
                  </p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">اختيار الولاية المناسبة</h2>
              <p className="mb-4">
                بينما يمكنك تأسيس شركة LLC في أي ولاية، تقدم بعض الولايات مزايا كبيرة:
              </p>
              
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">🇺🇸 Delaware</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    تشتهر بقوانينها الصديقة للأعمال ومحكمة Chancery. مثالية للشركات التي تخطط لجمع استثمارات أو طرح أسهمها للاكتتاب العام.
                  </p>
                  <Badge variant="secondary" className="text-xs">الأفضل لـ: الشركات الناشئة والمستثمرين</Badge>
                </Card>
                
                <Card className="p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2">Wyoming</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    لا توجد ضريبة دخل على مستوى الولاية، وتوفر حماية قوية للخصوصية، ورسوم سنوية منخفضة. مثالية لشركات LLC ذات العضو الواحد وأصحاب الأعمال المهتمين بالخصوصية.
                  </p>
                  <Badge variant="secondary" className="text-xs">الأفضل لـ: الخصوصية والضرائب المنخفضة</Badge>
                </Card>
                
                <Card className="p-4 border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-2">Florida</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    لا توجد ضريبة دخل على مستوى الولاية، وهي رائعة للشركات التي تعمل بشكل أساسي في Florida.
                  </p>
                  <Badge variant="secondary" className="text-xs">الأفضل لـ: الشركات المحلية</Badge>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-7 w-7 text-primary" />
                خطوات تأسيس شركة LLC
              </h2>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: "اختر اسماً للشركة", desc: "اختر اسماً فريداً يتضمن اختصار LLC ويتوافق مع متطلبات الولاية." },
                  { step: 2, title: "تعيين وكيل مسجل", desc: "قم بتعيين شخص أو جهة لاستلام المستندات القانونية نيابة عن شركتك." },
                  { step: 3, title: "تقديم عقد التأسيس", desc: "أرسل مستندات التأسيس المطلوبة إلى سكرتير الولاية المعنية." },
                  { step: 4, title: "إنشاء اتفاقية التشغيل", desc: "قم بصياغة وثيقة داخلية تحدد الملكية وإجراءات التشغيل." },
                  { step: 5, title: "الحصول على رقم EIN", desc: "تقدم بطلب للحصول على رقم تعريف صاحب العمل من مصلحة الضرائب الأمريكية (IRS) لأغراض ضريبية." },
                  { step: 6, title: "فتح حساب بنكي تجاري", desc: "افصل بين أمورك المالية الشخصية والتجارية باستخدام حساب مخصص." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-7 w-7 text-primary" />
                تكاليف تأسيس شركة LLC
              </h2>
              <Card className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">$50-$500</p>
                    <p className="text-sm text-muted-foreground">رسوم التسجيل في الولاية</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">$100-$300</p>
                    <p className="text-sm text-muted-foreground">الوكيل المسجل/سنوياً</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">$0</p>
                    <p className="text-sm text-muted-foreground">طلب رقم EIN</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">$0-$800</p>
                    <p className="text-sm text-muted-foreground">التقرير السنوي</p>
                  </div>
                </div>
              </Card>
            </section>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-purple-600/5 border-2 border-primary/20">
              <CardContent className="p-0 text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">هل أنت مستعد لتأسيس شركة LLC الخاصة بك؟</h3>
                <p className="text-muted-foreground mb-6">
                  تجعل FoundStart عملية تأسيس شركة LLC بسيطة وبأسعار معقولة. ابدأ اليوم بتوجيهات خبرائنا وأسعارنا التنافسية.
                </p>
                <Link to="/countries">
                  <Button size="lg">ابدأ تأسيس شركة LLC الخاصة بك</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>

      <BlogAdStrip position="bottom" slug="llc-formation-guide" />
      <Footer />
    </div>
  );
};

export default LLCFormationGuideBlogAR;
