import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import '../HeroPreview.css';

export default function HomeDashboardPreview() {
  const { language } = useTranslation();
  const ar = language === 'ar';
  const reduceMotion = useReducedMotion();
  const skipIntro = true;
  return <section className="bg-[#05050a] px-4 sm:px-6 py-8" aria-label={ar ? 'عرض لوحة التحكم' : 'Dashboard preview'}>
        {/* Dashboard mockup */}
        <motion.div
          initial={skipIntro ? false : { opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="fs-dashboard-preview relative mx-auto mt-12 md:mt-16 max-w-4xl"
          data-motion={reduceMotion ? "reduced" : "active"}
          dir="ltr"
        >
          <div className="fs-dashboard-frame rounded-t-2xl border border-white/10 border-b-0 bg-[#0c0c14]/95 shadow-[0_-20px_80px_rgba(139,92,246,0.35)] backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-white/40">foundstart.org/dashboard</span>
            </div>
            <picture>
              <source media="(max-width: 639px)" srcSet={`/hero/dashboard-current-m-${ar ? 'ar' : 'en'}.webp`} width={560} height={1148} />
              <img
                src={`/hero/dashboard-current-${ar ? 'ar' : 'en'}.webp`}
                width={1200} height={790}
                alt={ar ? 'عرض توضيحي لواجهة لوحة تحكم FoundStart الحالية ببيانات نموذجية' : 'Current FoundStart dashboard interface with clearly labelled sample data'}
                className="block w-full max-h-[460px] sm:max-h-none object-cover object-top"
                loading="eager" fetchPriority="high" decoding="async"
              />
            </picture>
            <div className="fs-preview-sheen" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-5 pb-3" dir={ar ? 'rtl' : 'ltr'} aria-label={ar ? 'مزايا لوحة التحكم' : 'Dashboard features'}>
            {(ar ? ['الشركات والطلبات', 'قائمة خطوات التأسيس', 'المستندات والدعم'] : ['Companies & orders', 'Formation checklist', 'Documents & support']).map((label, i) => <span key={label} className="fs-preview-feature rounded-full border border-purple-300/15 bg-[#101020] px-3 py-1.5 text-[11px] font-medium text-purple-100/80" style={{ animationDelay: `${i * 2}s` }}><span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 mr-2" aria-hidden="true" />{label}</span>)}
          </div>
          <p className="pb-6 text-[11px] text-white/50" dir={ar ? 'rtl' : 'ltr'}>{ar ? 'واجهة لوحة التحكم الحالية · بيانات نموذجية للعرض فقط' : 'Current dashboard interface · Sample data for illustration only'}</p>
        </motion.div>
  </section>;
}
