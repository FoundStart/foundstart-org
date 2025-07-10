
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Play, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t, isRTL, language } = useTranslation();
  
  // Demo video URLs based on language
  const demoVideoUrl = language === 'ar' 
    ? "https://www.youtube.com/embed/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI&autoplay=1"
    : "https://www.youtube.com/embed/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI&autoplay=1";
  
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
                <div
                  key={jurisdiction.name}
                  className={`flex items-center justify-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span className={`text-lg ${isRTL ? 'ml-2' : 'mr-2'}`}>{jurisdiction.flag}</span>
                  <span className="font-medium text-sm">{jurisdiction.name}</span>
                </div>
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
            <div className="space-y-4">
              <h3 className={`text-2xl font-semibold ${isRTL ? 'text-right' : 'text-center'}`}>{t.watchDemoBy}</h3>
              <Card className="transition-all duration-300 hover:shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  {!showVideo ? (
                    <div 
                      className={`space-y-4 cursor-pointer ${isRTL ? 'text-right' : 'text-center'}`}
                      onClick={handleWatchDemo}
                    >
                      <div className="relative mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center justify-center group hover:bg-red-700 transition-colors">
                        <Youtube className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold gradient-text mb-2">
                          {t.completeGuideTitle}
                        </h4>
                        <p className="text-muted-foreground">
                          {t.completeGuideDescription}
                        </p>
                      </div>
                      <Button variant="outline" className="group">
                        <Play className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform`} />
                        {t.watchNow}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={demoVideoUrl}
                          title={language === 'ar' ? "FoundStart Arabic Demo - MoMo Sa" : "FoundStart English Demo - MoMo Sa"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowVideo(false)}
                        className="w-full"
                      >
                        {t.closeVideo}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-float">
              <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="text-3xl font-bold gradient-text">5-10 {isRTL ? 'دقائق' : 'minutes'}</div>
                <div className="text-muted-foreground">{t.averageSetupTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
