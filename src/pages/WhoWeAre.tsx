import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Globe, Award, Heart, Lightbulb } from 'lucide-react';

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Who <span className="gradient-text">We Are</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're FoundStart, the all-in-one platform that empowers entrepreneurs to launch their businesses 
            in minutes, not months. Our mission is to democratize business formation and make entrepreneurship 
            accessible to everyone, everywhere.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Heart className="w-8 h-8 text-primary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To eliminate the barriers that prevent talented individuals from starting their businesses. 
                We believe that entrepreneurship should be accessible, affordable, and achievable for everyone, 
                regardless of their location or background.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Lightbulb className="w-8 h-8 text-primary" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's leading platform for business formation and digital entrepreneurship, 
                helping millions of people turn their ideas into successful companies while fostering 
                innovation and economic growth globally.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  <span>Company Formation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We simplify the complex process of company formation across multiple jurisdictions, 
                  making it fast, affordable, and hassle-free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-primary" />
                  <span>Digital Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From banking setup to AI-powered business tools, we provide comprehensive 
                  digital services to help your business thrive in the modern economy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-primary" />
                  <span>Partner Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We've built a global network of trusted partners to provide you with 
                  the best services and solutions for your business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Transparency", description: "We believe in clear, honest communication and fair pricing." },
              { title: "Innovation", description: "We continuously improve our platform with cutting-edge technology." },
              { title: "Accessibility", description: "We make business formation accessible to entrepreneurs worldwide." },
              { title: "Support", description: "We provide exceptional customer support every step of the way." }
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    <Award className="w-4 h-4 mr-2" />
                    {value.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-4">
                FoundStart is powered by a diverse team of entrepreneurs, developers, legal experts, 
                and business professionals who are passionate about helping others succeed.
              </p>
              <p className="text-muted-foreground">
                Our team combines decades of experience in business formation, technology, and 
                customer service to deliver the best possible experience for our users.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;