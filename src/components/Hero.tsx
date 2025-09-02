
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Play, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t, isRTL, language } = useTranslation();
  
  // Demo video URL - same for both languages
  const demoVideoUrl = "https://www.youtube.com/embed/dvyjdyrKFUw?si=kyghwxE8wrjCIGyI";
  
  const jurisdictions = [
    { name: t.usa, flag: "🇺🇸" },
    { name: t.uk, flag: "🇬🇧" },
    { name: t.canada, flag: "🇨🇦" },
    { name: t.estonia, flag: "🇪🇪" },
    { name: t.finland, flag: "🇫🇮" },
    { name: t.sweden, flag: "🇸🇪" },
    { name: t.latvia, flag: "🇱🇻" },
    { name: t.lithuania, flag: "🇱🇹" },
    { name: t.egypt, flag: "🇪🇬" }
  ];

  const handleWatchDemo = () => {
    setShowVideo(true);
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 animate-fade-in ${isRTL ? 'lg:order-2' : ''}`}>
            <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
              <div className={`inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <CheckCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.trustedBy}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t.heroTitle}{" "}
                <span className="gradient-text">{t.heroTitleHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.heroDescription}
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
              {jurisdictions.map((jurisdiction) => (
                <Link
                  key={jurisdiction.name}
                  to="/countries"
                  className={`flex items-center justify-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span className={`text-lg ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform`}>{jurisdiction.flag}</span>
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">{jurisdiction.name}</span>
                </Link>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <Link to="/countries">
                  {t.startYourBusiness}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 group"
                onClick={handleWatchDemo}
              >
                <Youtube className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform`} />
                {t.watchDemo}
              </Button>
            </div>

            <div className={`flex items-center space-x-8 text-sm text-muted-foreground ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.noHiddenFees}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.support24}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.moneyBackGuarantee}</span>
              </div>
            </div>
          </div>

          <div className={`space-y-6 ${isRTL ? 'lg:order-1' : ''}`}>
            {/* YouTube Video Widget */}
            <div className="glass-card rounded-2xl p-6 animate-float">
              <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-center'}`}>
                <h3 className="text-lg font-semibold gradient-text">
                  {language === 'ar' ? 'شاهد الفيديو التوضيحي' : 'Watch CEO Demo'}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={demoVideoUrl}
                    title="FoundStart CEO Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="text-3xl font-bold gradient-text">5-10 {isRTL ? 'دقائق' : 'minutes'}</div>
                <div className="text-muted-foreground">{t.averageSetupTime}</div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="text-2xl font-bold gradient-text">370+</div>
                <div className="text-muted-foreground">Trusted Partners</div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="text-2xl font-bold gradient-text">9</div>
                <div className="text-muted-foreground">Jurisdictions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
