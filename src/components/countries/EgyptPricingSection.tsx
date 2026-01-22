import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Building2, ArrowRight } from 'lucide-react';
import { egyptCompanyPackages } from '@/data/egyptFormationData';
import { Link } from 'react-router-dom';

const EgyptPricingSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">أسعار تأسيس الشركات</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-2">Company Formation Prices</p>
          <Badge variant="secondary" className="text-base px-4 py-1">
            اقل تكلفه بأقل رأس مال • Lowest Cost with Minimum Capital
          </Badge>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {egyptCompanyPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400" />
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-8 h-8 text-primary" />
                  <Badge className="bg-primary/10 text-primary">
                    {pkg.currency}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <span className="block text-primary">{pkg.arabicName}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{pkg.name}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-primary/5 rounded-lg">
                  <span className="text-3xl font-bold text-primary">
                    {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground ml-2">EGP</span>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  {pkg.arabicDescription}
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  {pkg.description}
                </p>
                
                <div className="space-y-2">
                  {pkg.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <a 
                    href="https://wa.me/201501556629" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            جميع الأسعار شاملة المصاريف الحكومية والتسجيل التجاري والضريبي
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            All prices include government fees, commercial registration, and tax registration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://wa.me/201501556629" target="_blank" rel="noopener noreferrer">
                تواصل معنا على الواتساب
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact-sales">
                Request Custom Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EgyptPricingSection;
