import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeTwoOptions = ({ language, isRTL }: { language: string; isRTL: boolean }) => (
  <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`space-y-4 mb-10 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'طريقتان لتأسيس شركتك' : 'Two ways to form your company'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar'
              ? 'اختار شريك تأسيس موثوق، أو سيبها علينا: سجل، ادفع أونلاين، وتابع كل خطوة من لوحة التحكم.'
              : 'Pick a trusted formation partner, or let us handle it: register, pay online, and track every step from your dashboard.'}
          </p>
        </div>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
          {language === 'ar'
            ? 'FoundStart منصة متكاملة لتأسيس الشركات وخدماتها: لوحة عميل مثل كبرى شركات التأسيس، خدمات إضافية، ومتطلبات كل دولة تظهر لك داخل اللوحة.'
            : "FoundStart is a complete platform for company formation and services: a client dashboard like the big formation companies, add-on services, and each country's requirements shown to you inside the dashboard."}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border p-6 md:p-8 flex flex-col gap-4 bg-card"
        >
          <Handshake className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold">
            {language === 'ar' ? 'افتحها مع شريك تأسيس' : 'Open it with a formation partner'}
          </h3>
          <p className="text-muted-foreground flex-1">
            {language === 'ar'
              ? 'قارن بين شركاء تأسيس موثوقين في كل دولة وافتح شركتك مباشرة مع الشريك اللي تختاره.'
              : 'Compare trusted formation partners in every country and open your company directly with the one you choose.'}
          </p>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link to="/countries">
              {language === 'ar' ? 'تصفح الدول والشركاء' : 'Browse countries & partners'}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-primary/50 p-6 md:p-8 flex flex-col gap-4 bg-card"
        >
          <CreditCard className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold">
            {language === 'ar' ? 'سيب التأسيس على FoundStart' : 'Let FoundStart form it for you'}
          </h3>
          <p className="text-muted-foreground flex-1">
            {language === 'ar'
              ? 'سجل في لوحة التحكم، اختار الدولة ونوع الشركة، شوف المتطلبات والسعر، ادفع بأمان، وتابع حالة شركتك خطوة بخطوة.'
              : 'Register in your dashboard, pick a country and company type, see the requirements and price, pay securely, and track your company step by step.'}
          </p>
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link to="/dashboard/formation">
              {language === 'ar' ? 'ابدأ التأسيس الآن' : 'Start formation now'}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HomeTwoOptions;
