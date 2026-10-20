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
          className="mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-purple-400"
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
            <div className="flex text-left" dir={ar ? 'rtl' : 'ltr'}>
              <div className="hidden sm:block w-44 shrink-0 border-white/10 p-3 space-y-1 border-e">
                <div className="mb-3 px-2 text-sm font-bold text-white">FoundStart</div>
                {nav.map((n, i) => (
                  <div key={n} className={`rounded-lg px-2.5 py-1.5 text-xs ${i === 1 ? 'bg-purple-600/25 text-purple-200' : 'text-white/50'}`}>{n}</div>
                ))}
              </div>
              <div className="flex-1 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{ar ? 'تأسيس شركة جديدة' : 'New company formation'}</div>
                  <span className="rounded-full bg-purple-600/25 px-2.5 py-0.5 text-[10px] text-purple-200">{ar ? 'ادفع عبر Stripe' : 'Secure Stripe checkout'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {steps.map((st, i) => (
                    <div key={st} className="flex-1">
                      <div className={`h-1.5 rounded-full ${i < 3 ? 'bg-purple-500' : 'bg-white/10'}`} />
                      <div className={`mt-1.5 text-[9px] sm:text-[10px] ${i < 3 ? 'text-white/80' : 'text-white/35'}`}>{st}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { f: '🇺🇸', n: ar ? 'أمريكا' : 'United States', p: 'LLC $450' },
                    { f: '🇬🇧', n: ar ? 'بريطانيا' : 'United Kingdom', p: 'LTD $500' },
                    { f: '🇪🇪', n: ar ? 'إستونيا' : 'Estonia', p: 'OÜ $335' },
                  ].map((c, i) => (
                    <div key={c.n} className={`rounded-xl border border-white/10 bg-white/[0.03] p-3 ${i === 2 ? 'hidden sm:block' : ''}`}>
                      <div className="text-lg">{c.f}</div>
                      <div className="mt-1 text-xs text-white/80">{c.n}</div>
                      <div className="text-[11px] text-purple-300">{c.p}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex items-center justify-between">
                  <div className="text-xs text-white/70">{ar ? 'المستندات، الفواتير وحالة الطلب في مكان واحد' : 'Documents, billing and order status in one place'}</div>
                  <span className="rounded-md bg-purple-600 px-2.5 py-1 text-[10px] font-semibold text-white">{ar ? 'ادفع الآن' : 'Pay now'}</span>
                </div>
              </div>
            </div>
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
