import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Globe, Award, Heart, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          title="Who"
          highlight="We Are"
          subtitle="We're FoundStart, the all-in-one platform that empowers entrepreneurs to launch their businesses in minutes, not months."
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl"><Heart className="w-8 h-8 text-primary" /><span>Our Mission</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To eliminate the barriers that prevent talented individuals from starting their businesses. We believe that entrepreneurship should be accessible, affordable, and achievable for everyone.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl"><Lightbulb className="w-8 h-8 text-primary" /><span>Our Vision</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To become the world's leading platform for business formation and digital entrepreneurship, helping millions of people turn their ideas into successful companies.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card><CardHeader><CardTitle className="flex items-center space-x-2"><Building2 className="w-6 h-6 text-primary" /><span>Company Formation</span></CardTitle></CardHeader><CardContent><p className="text-muted-foreground">We simplify company formation across 10+ jurisdictions, making it fast and hassle-free.</p></CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center space-x-2"><Globe className="w-6 h-6 text-primary" /><span>Digital Services</span></CardTitle></CardHeader><CardContent><p className="text-muted-foreground">From banking setup to AI-powered tools, we provide comprehensive digital services.</p></CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center space-x-2"><Users className="w-6 h-6 text-primary" /><span>Partner Network</span></CardTitle></CardHeader><CardContent><p className="text-muted-foreground">600+ trusted partners providing the best services and solutions for your business.</p></CardContent></Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Transparency", description: "Clear, honest communication and fair pricing." },
                { title: "Innovation", description: "Continuously improving with cutting-edge technology." },
                { title: "Accessibility", description: "Business formation accessible to entrepreneurs worldwide." },
                { title: "Support", description: "Exceptional customer support every step of the way." }
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader><Badge variant="secondary" className="mx-auto w-fit"><Award className="w-4 h-4 mr-2" />{value.title}</Badge></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{value.description}</p></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhoWeAre;