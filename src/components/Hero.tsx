import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Globe, Building2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t, language } = useTranslation();

  const jurisdictions = [
    { id: "USA", name: t.usa, flag: "🇺🇸" },
    { id: "UK", name: t.uk, flag: "🇬🇧" },
    { id: "CA", name: t.canada, flag: "🇨🇦" },
    { id: "EE", name: t.estonia, flag: "🇪🇪" },
    { id: "FI", name: t.finland, flag: "🇫🇮" },
    { id: "SE", name: t.sweden, flag: "🇸🇪" },
    { id: "LV", name: t.latvia, flag: "🇱🇻" },
    { id: "LT", name: t.lithuania, flag: "🇱🇹" },
    { id: 'IE', name: language === 'ar' ? 'أيرلندا' : 'Ireland', flag: "🇮🇪" },
    { id: "EG", name: t.egypt, flag: "🇪🇬" },
  ];

  const quickActions: { label: string; to: string }[] = [
    { label: 'Form a US LLC', to: '/country/USA' },
    { label: 'UK Company Formation', to: '/country/UK' },
    { label: 'Estonia e-Residency', to: '/country/EE' },
    { label: 'Ireland Low-Tax Setup', to: '/country/IE' },
    { label: 'Premium Domains', to: '/domains' },
  ];

  const ar = language === 'ar';
  const nav = ar
    ? ['لوحة التحكم', 'تأسيس شركة', 'شركاتي', 'المستندات', 'الفواتير']
    : ['Dashboard', 'Formation', 'My Companies', 'Documents', 'Billing'];
  const steps = ar
    ? ['الدولة', 'نوع الشركة', 'البيانات', 'المراجعة', 'الدفع']
    : ['Country', 'Entity', 'Details', 'Review', 'Pay'];

  return (
    <section className="relative overflow-hidden bg-[#05050a]" dir={ar ? 'rtl' : 'ltr'}>
      {/* purple glow arc */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]">
        <div className="absolute left-1/2 bottom-[-55%] h-[120%] w-[190%] sm:w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.55)_0%,rgba(109,40,217,0.28)_38%,transparent_68%)] blur-2xl" />
        <div className="absolute left-1/2 bottom-[-62%] h-[120%] w-[170%] sm:w-[115%] -translate-x-1/2 rounded-[50%] border-t border-purple-400/60 shadow-[0_-10px_90px_rgba(168,85,247,0.55)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 md:pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className={`mb-5 text-xs sm:text-sm font-semibold uppercase ${ar ? 'tracking-normal' : 'tracking-[0.18em]'} text-purple-400`}
        >
          {ar ? 'للفريلانسرز · التجارة الإلكترونية · SaaS' : 'Freelancers · E-commerce · SaaS'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto max-w-4xl text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          {ar ? (<>افتح شركتك<br />مع FoundStart</>) : (<>Open Your Company<br />with FoundStart</>)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-white/60"
        >
          {ar
            ? 'سجل، ادفع أونلاين، وتابع كل خطوة من لوحة واحدة. 10 دول، سعر واضح لكل نوع شركة.'
            : 'Register, pay online and track every step from one dashboard. 10 countries, one clear price per company type.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" className="h-12 w-full sm:w-auto rounded-full bg-purple-600 px-8 text-base font-semibold text-white hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.5)]" asChild>
            <Link to="/auth?mode=signup">
              {ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto rounded-full border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white" asChild>
            <Link to="/countries">{ar ? 'الدول والأسعار' : 'Countries & prices'}</Link>
          </Button>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-12 md:mt-16 max-w-4xl"
          dir="ltr"
        >
          <div className="rounded-t-2xl border border-white/10 border-b-0 bg-[#0c0c14]/95 shadow-[0_-20px_80px_rgba(139,92,246,0.35)] backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-white/40">foundstart.org/dashboard</span>
            </div>
            <picture>
              <source media="(max-width: 639px)" srcSet={`/hero/dashboard-m-${ar ? 'ar' : 'en'}.webp`} width={560} height={1148} />
              <img
                src={`/hero/dashboard-${ar ? 'ar' : 'en'}.webp`}
                width={1200} height={712}
                alt={ar ? 'لوحة تحكم FoundStart الحقيقية: الشركات والطلبات وحالة التأسيس' : 'The real FoundStart dashboard: companies, orders and formation status'}
                className="block w-full max-h-[460px] sm:max-h-none object-cover object-top"
                loading="eager" fetchPriority="high" decoding="async"
              />
            </picture>
          </div>
        </motion.div>
      </div>

      <button type="button" onClick={() => setShowVideo(true)} className="sr-only">{t.watchDemo}</button>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowVideo(false)}>
          <div className="w-full max-w-4xl mx-4 aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/dvyjdyrKFUw?autoplay=1"
              title="FoundStart Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
