import { Compass, MessagesSquare, Scale, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Compass,
    link: '/auth?mode=signup',
    en: ['Register', 'Create your free FoundStart account.'],
    ar: ['سجّل', 'أنشئ حسابك المجاني في FoundStart.'],
  },
  {
    icon: Scale,
    link: '/countries',
    en: ['Pick your country and company type', 'See the requirements and the FoundStart price before you pay.'],
    ar: ['اختر الدولة ونوع الشركة', 'شوف المتطلبات وسعر FoundStart قبل ما تدفع.'],
  },
  {
    icon: Rocket,
    link: '/auth',
    en: ['Pay online', 'Secure card checkout. One clear fee, no add-ons.'],
    ar: ['ادفع أونلاين', 'دفع آمن بالبطاقة. رسوم واحدة واضحة، بدون إضافات.'],
  },
  {
    icon: MessagesSquare,
    link: '/dashboard',
    en: ['Track every step', 'Upload documents and follow your company in the dashboard.'],
    ar: ['تابع كل خطوة', 'ارفع المستندات وتابع شركتك من لوحة التحكم.'],
  },
];

const HomeHowItWorks = ({ language, isRTL }: { language: string; isRTL: boolean }) => (
  <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b bg-muted/20">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
          {language === 'ar' ? 'إزاي تبدأ؟' : 'How it works'}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {language === 'ar'
            ? 'من الفكرة لشركة مسجلة في أربع خطوات'
            : 'From idea to a registered company in four steps'}
        </p>
      </motion.div>

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const [title, desc] = language === 'ar' ? step.ar : step.en;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link to={step.link} className="group block h-full rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">
                    {language === 'ar' ? `الخطوة ${i + 1}` : `Step ${i + 1}`}
                  </span>
                </div>
                <h3 className="font-bold mb-1.5 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <ArrowRight className={`mt-3 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? '-scale-x-100' : ''}`} />
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default HomeHowItWorks;
