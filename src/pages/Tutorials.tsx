
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, Star } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Tutorials = () => {
  const { language } = useTranslation();

  const featuredVideo = {
    title: "FoundStart Platform Demo by MoMo Sa - CEO & Founder",
    description: "Complete walkthrough of the FoundStart platform by our CEO MoMo Sa, covering business formation, banking setup, and AI-powered features.",
    duration: "15 min",
    views: "10,2K",
    rating: 4.9,
    videoUrl: language === 'ar' 
      ? "https://youtu.be/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI"
      : "https://youtu.be/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI",
    thumbnail: "/lovable-uploads/23e6b7a9-ef93-4946-945e-8196c41070bd.png"
  };

  const tutorials = [
    {
      id: 1,
      title: "LLC Formation Step-by-Step Guide",
      description: "Complete tutorial on forming your LLC using FoundStart's platform",
      duration: "12 min",
      category: "Business Formation",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Setting Up Business Banking",
      description: "How to connect and set up banking through our partner integrations",
      duration: "8 min",
      category: "Banking",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "AI Business Name Generator Tutorial",
      description: "Using our AI-powered tools to find the perfect business name",
      duration: "6 min",
      category: "AI Tools",
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "International Business Setup",
      description: "Expanding your business internationally with FoundStart",
      duration: "18 min",
      category: "International",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Payment Integration Masterclass",
      description: "Setting up Stripe, crypto payments, and virtual cards",
      duration: "22 min",
      category: "Payments",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "Tax Compliance and EIN Setup",
      description: "Understanding tax requirements and obtaining your EIN",
      duration: "14 min",
      category: "Tax & Legal",
      difficulty: "Intermediate"
    }
  ];

  const handlePlayVideo = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">FoundStart Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to use FoundStart's platform with step-by-step video tutorials 
            and expert guidance from our team.
          </p>
        </div>

        {/* Featured Video */}
        <Card className="mb-12 overflow-hidden border-2 border-primary/20">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative group cursor-pointer" onClick={() => handlePlayVideo(featuredVideo.videoUrl)}>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                  <Badge className="mb-2">Featured Tutorial</Badge>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'انقر لمشاهدة الفيديو العربي' : 'Click to watch English demo'}
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Badge variant="secondary">Platform Demo</Badge>
                <h2 className="text-2xl font-bold">{featuredVideo.title}</h2>
                <p className="text-muted-foreground">{featuredVideo.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredVideo.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {featuredVideo.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {featuredVideo.rating}
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full group"
                  onClick={() => handlePlayVideo(featuredVideo.videoUrl)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'مشاهدة الفيديو العربي' : 'Watch English Demo'}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Tutorial Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{tutorial.category}</Badge>
                  <Badge variant="outline">{tutorial.difficulty}</Badge>
                </div>
                
                <CardTitle className="group-hover:text-primary transition-colors">
                  {tutorial.title}
                </CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Personal Guidance?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a one-on-one session with our experts to get personalized help 
              with your business formation journey.
            </p>
            <Button size="lg">
              Schedule Free Consultation
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Tutorials;
