import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, highlight, subtitle, children }: PageHeroProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[hsl(222,84%,4.9%)]">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
        >
          {title}{' '}
          {highlight && (
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto mb-6"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
