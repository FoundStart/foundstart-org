
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Building, TrendingUp, Users, Globe } from 'lucide-react';
import VideoThumbnail from '@/components/VideoThumbnail';

interface Country {
  id: string;
  flag: string;
  name: string;
  price: string;
  timeframe: string;
  currency: string;
  ctaUrl?: string;
  videoUrl?: string;
  description: string;
  benefits: string[];
  partners: string[];
  keyStats: {
    gdp: string;
    population: string;
    easeOfBusiness: string;
    corporateTax: string;
  };
}

interface CountryDetailsProps {
  country: Country;
}

const CountryDetails = ({ country }: CountryDetailsProps) => {
  // Partner URLs mapping
  const partnerUrls: { [key: string]: string } = {
    'Privatily': 'https://privatily.com/ref/Deeemoz/',
    'ITIN': 'https://theitin.com/ref/80',
    'Clemta': 'https://clemta.com/?ref=njbhzwf',
    'Startglobal': 'http://startglobal.co/?via=mohamed-sayed',
    'Firstbase': 'https://firstbase.pxf.io/RGaDzX',
    'doola': 'https://partnersps.doola.com/yukcm0gd526a',
    '1stFormations': 'https://1st-formations-limited.sjv.io/4GKB30',
    'Rapid Formation': 'https://rapid-formations.sjv.io/XmEo53',
    '1office': 'https://my1office.co/en/company/register?ref=mdzknzu'
  };

  return (
    <div className="mt-12 animate-fade-in">
      <Card className="glass-card hover:shadow-xl transition-all duration-500 animate-scale-in">
        <CardHeader className="text-center pb-6">
          <div className="text-6xl mb-4 animate-bounce">{country.flag}</div>
          <CardTitle className="text-3xl gradient-text">{country.name}</CardTitle>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Badge variant="outline" className="text-lg px-4 py-2 hover-scale">
              {country.price}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 hover-scale">
              {country.timeframe}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <p className="text-lg text-muted-foreground text-center leading-relaxed animate-fade-in">
            {country.description}
          </p>

          {/* Video Demo */}
          {country.videoUrl && (
            <div className="animate-fade-in">
              <VideoThumbnail 
                videoUrl={country.videoUrl}
                title={`${country.name} Company Formation Demo`}
                className="w-full h-64 md:h-96"
              />
            </div>
          )}

          {/* Partner Formation Companies */}
          <div className="space-y-4 animate-slide-in">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Formation Partners
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {country.partners.map((partner, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="hover-scale group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open(partnerUrls[partner], '_blank')}
                >
                  {partner}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              ))}
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <Card className="text-center p-4 hover-scale glass-card">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-medium">{country.keyStats.gdp}</div>
              <div className="text-xs text-muted-foreground">GDP</div>
            </Card>
            <Card className="text-center p-4 hover-scale glass-card">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-medium">{country.keyStats.population}</div>
              <div className="text-xs text-muted-foreground">Population</div>
            </Card>
            <Card className="text-center p-4 hover-scale glass-card">
              <Globe className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-medium">{country.keyStats.easeOfBusiness}</div>
              <div className="text-xs text-muted-foreground">Ease of Business</div>
            </Card>
            <Card className="text-center p-4 hover-scale glass-card">
              <Building className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm font-medium">{country.keyStats.corporateTax}</div>
              <div className="text-xs text-muted-foreground">Corporate Tax</div>
            </Card>
          </div>

          {/* Benefits */}
          <div className="space-y-4 animate-slide-in">
            <h3 className="text-xl font-semibold">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {country.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover-scale"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-6">
            <Button 
              size="lg" 
              className="hover-scale group animate-pulse"
              onClick={() => country.ctaUrl && window.open(country.ctaUrl, '_blank')}
            >
              Start Formation in {country.name}
              <ExternalLink className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryDetails;
