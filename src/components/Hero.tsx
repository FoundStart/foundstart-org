import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Globe, Building2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t, isRTL, language } = useTranslation();

  const jurisdictions = [
    { name: t.usa, flag: "🇺🇸" },
    { name: t.uk, flag: "🇬🇧" },
    { name: t.canada, flag: "🇨🇦" },
    { name: t.estonia, flag: "🇪🇪" },
    { name: t.finland, flag: "🇫🇮" },
    { name: t.sweden, flag: "🇸🇪" },
    { name: t.latvia, flag: "🇱🇻" },
    { name: t.lithuania, flag: "🇱🇹" },
    { name: language === 'ar' ? 'أيرلندا' : 'Ireland', flag: "🇮🇪" },
    { name: t.egypt, flag: "🇪🇬" },
  ];

  const quickActions = [
    'Form a US LLC',
    'UK Company Formation',
    'Estonia e-Residency',
    'Ireland Low-Tax Setup',
    'Premium Domains',
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[hsl(222,84%,4.9%)]">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          {language === 'ar' ? 'تأسيس شركتك في 10 دقائق' : 'Launch Your Business in 10 Jurisdictions'}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
        >
          {language === 'ar' ? 'أسس شركتك' : 'Build Your Business'}{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {language === 'ar' ? 'عالمياً' : 'Globally'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          {language === 'ar'
            ? 'FoundStart يساعدك على تأسيس شركتك في أمريكا وأوروبا والشرق الأوسط بسهولة.'
            : 'FoundStart helps you form companies in USA, UK, Europe & Middle East with trusted partners.'}
        </motion.p>

        {/* Search-style CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <Link to="/countries" className="block">
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group">
              <Globe className="w-5 h-5 text-white/40" />
              <Building2 className="w-5 h-5 text-purple-400/60" />
              <span className="text-white/40 text-left flex-1">
                {language === 'ar' ? 'اختر الدولة لتأسيس شركتك...' : 'Choose a jurisdiction to start your company...'}
              </span>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </motion.div>

        {/* Quick action pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {quickActions.map((action) => (
            <Link
              key={action}
              to="/countries"
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all"
            >
              {action}
            </Link>
          ))}
        </motion.div>

        {/* Jurisdiction flags row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {jurisdictions.map((j) => (
            <Link
              key={j.name}
              to="/countries"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/80 text-xs hover:bg-white/10 hover:scale-105 transition-all"
            >
              <span className="text-base">{j.flag}</span>
              <span>{j.name}</span>
            </Link>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button size="lg" className="text-base px-8 py-6 bg-white text-black hover:bg-white/90 font-semibold" asChild>
            <Link to="/countries">
              {t.startYourBusiness}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-base text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setShowVideo(true)}
          >
            <Youtube className="w-5 h-5 mr-2" />
            {t.watchDemo}
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 text-xs text-white/40"
        >
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400/60" />{t.noHiddenFees}</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400/60" />{t.support24}</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400/60" />10+ Jurisdictions</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400/60" />370+ Partners</span>
        </motion.div>
      </div>

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
