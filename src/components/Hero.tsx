
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Play, Youtube } from 'lucide-react';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  const jurisdictions = [
    { name: "USA", flag: "🇺🇸" },
    { name: "UK", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Estonia", flag: "🇪🇪" },
    { name: "Finland", flag: "🇫🇮" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Latvia", flag: "🇱🇻" },
    { name: "Lithuania", flag: "🇱🇹" }
  ];

  const handleWatchDemo = () => {
    setShowVideo(true);
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Entrepreneurs
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Launch Your Business in{" "}
                <span className="gradient-text">Minutes, Not Months</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From company formation to banking and payments - we handle everything. 
                Start your business in the USA, UK, Canada, Estonia, Finland, Sweden, Latvia, or Lithuania 
                with our AI-powered platform and integrated partner ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {jurisdictions.map((jurisdiction) => (
                <div
                  key={jurisdiction.name}
                  className="flex items-center justify-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-lg mr-2">{jurisdiction.flag}</span>
                  <span className="font-medium text-sm">{jurisdiction.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Start Your Business
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 group"
                onClick={handleWatchDemo}
              >
                <Youtube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo by MoMo Sa
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-center">Watch FoundStart CEO Demo</h3>
              <Card className="transition-all duration-300 hover:shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  {!showVideo ? (
                    <div 
                      className="text-center space-y-4 cursor-pointer"
                      onClick={handleWatchDemo}
                    >
                      <div className="relative mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center justify-center group hover:bg-red-700 transition-colors">
                        <Youtube className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold gradient-text mb-2">
                          Complete Business Formation Guide
                        </h4>
                        <p className="text-muted-foreground">
                          Watch FoundStart CEO Mr. MoMo Sa demonstrate our AI-powered platform 
                          and see how you can start your business in minutes.
                        </p>
                      </div>
                      <Button variant="outline" className="group">
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Watch Now
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI&autoplay=1"
                          title="FoundStart CEO Demo - Mr. MoMo Sa"
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
                        Close Video
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-float">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold gradient-text">5-10 minutes</div>
                <div className="text-muted-foreground">Average setup time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
