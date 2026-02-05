 import { useParams, Link } from 'react-router-dom';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { ArrowLeft, Building, TrendingUp, Users, Globe, ExternalLink, CheckCircle } from 'lucide-react';
 import VideoThumbnail from '@/components/VideoThumbnail';
 import { countriesData } from '@/data/countriesData';
 
 const CountryPage = () => {
   const { countryId } = useParams<{ countryId: string }>();
   const country = countriesData.find(c => c.id.toLowerCase() === countryId?.toLowerCase());
 
   if (!country) {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <main className="pt-20 px-4 text-center">
           <h1 className="text-2xl font-bold">Country not found</h1>
           <Button asChild className="mt-4">
             <Link to="/countries">Back to Countries</Link>
           </Button>
         </main>
         <Footer />
       </div>
     );
   }
 
   const partnerUrls: { [key: string]: string } = {
     'Privatily': 'https://privatily.com/ref/Deeemoz/',
     'ITIN': 'https://theitin.com/ref/80',
     'Clemta': 'https://clemta.com/?ref=njbhzwf',
     'Startglobal': 'http://startglobal.co/?via=mohamed-sayed',
     'Firstbase': 'https://firstbase.pxf.io/RGaDzX',
     'doola': 'https://partnersps.doola.com/yukcm0gd526a',
     '1stFormations': 'https://1st-formations-limited.sjv.io/4GKB30',
     'Rapid Formation': 'https://rapid-formations.sjv.io/XmEo53',
     '1office': 'https://my1office.co/en/company/register?ref=mdzknzu',
     'FoundStart Legal Team': '/auth?country=EG'
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="pt-20">
         <section className="py-12 px-4 sm:px-6 lg:px-8">
           <div className="container mx-auto max-w-5xl">
             <div className="mb-8">
               <Button variant="outline" asChild>
                 <Link to="/countries">
                   <ArrowLeft className="w-4 h-4 mr-2" />
                   Back to All Countries
                 </Link>
               </Button>
             </div>
 
             {/* Hero Section */}
             <div className="text-center mb-12">
               <div className="text-8xl mb-4">{country.flag}</div>
               <h1 className="text-4xl md:text-5xl font-bold mb-4">
                 Start Your Business in <span className="gradient-text">{country.name}</span>
               </h1>
               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                 {country.description}
               </p>
             </div>
 
             {/* Pricing Card */}
             <Card className="glass-card mb-12">
               <CardHeader className="text-center">
                 <CardTitle className="text-2xl">Formation Package</CardTitle>
               </CardHeader>
               <CardContent className="text-center space-y-6">
                 <div className="flex justify-center items-center gap-4">
                   <Badge variant="default" className="text-2xl px-6 py-3">
                     Starting from {country.price}
                   </Badge>
                   <Badge variant="secondary" className="text-lg px-4 py-2">
                     {country.timeframe}
                   </Badge>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button size="lg" asChild className="text-lg px-8">
                     <Link to={`/auth?country=${country.id}`}>
                       Sign Up & Start Formation
                     </Link>
                   </Button>
                   <Button size="lg" variant="outline" asChild className="text-lg px-8">
                     <Link to="/auth">
                       Already have an account? Sign In
                     </Link>
                   </Button>
                 </div>
               </CardContent>
             </Card>
 
             {/* Video Demo */}
             {country.videoUrl && (
               <div className="mb-12">
                 <h2 className="text-2xl font-bold mb-4 text-center">Watch Formation Demo</h2>
                 <VideoThumbnail 
                   videoUrl={country.videoUrl}
                   title={`${country.name} Company Formation Demo`}
                   className="w-full h-64 md:h-96"
                 />
               </div>
             )}
 
             {/* Key Statistics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
               <Card className="text-center p-4 glass-card">
                 <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                 <div className="text-lg font-bold">{country.keyStats.gdp}</div>
                 <div className="text-sm text-muted-foreground">GDP</div>
               </Card>
               <Card className="text-center p-4 glass-card">
                 <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                 <div className="text-lg font-bold">{country.keyStats.population}</div>
                 <div className="text-sm text-muted-foreground">Population</div>
               </Card>
               <Card className="text-center p-4 glass-card">
                 <Globe className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                 <div className="text-lg font-bold">{country.keyStats.easeOfBusiness}</div>
                 <div className="text-sm text-muted-foreground">Ease of Business</div>
               </Card>
               <Card className="text-center p-4 glass-card">
                 <Building className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                 <div className="text-lg font-bold">{country.keyStats.corporateTax}</div>
                 <div className="text-sm text-muted-foreground">Corporate Tax</div>
               </Card>
             </div>
 
             {/* Benefits */}
             <Card className="glass-card mb-12">
               <CardHeader>
                 <CardTitle className="text-xl">Why Choose {country.name}?</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {country.benefits.map((benefit, index) => (
                     <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                       <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                       <span>{benefit}</span>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
 
             {/* Formation Partners */}
             <Card className="glass-card mb-12">
               <CardHeader>
                 <CardTitle className="text-xl flex items-center gap-2">
                   <Building className="w-5 h-5" />
                   Formation Partners
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   {country.partners.map((partner, index) => (
                     <Button
                       key={index}
                       variant="outline"
                       className="h-auto py-4 hover:bg-primary hover:text-primary-foreground"
                       onClick={() => {
                         const url = partnerUrls[partner];
                         if (url?.startsWith('/')) {
                           window.location.href = url;
                         } else if (url) {
                           window.open(url, '_blank');
                         }
                       }}
                     >
                       {partner}
                       <ExternalLink className="w-4 h-4 ml-2" />
                     </Button>
                   ))}
                 </div>
               </CardContent>
             </Card>
 
             {/* Final CTA */}
             <div className="text-center py-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
               <h2 className="text-3xl font-bold mb-4">Ready to Start Your {country.name} Business?</h2>
               <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                 Join thousands of entrepreneurs who have successfully formed their companies with FoundStart.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button size="lg" asChild className="text-lg px-8">
                   <Link to={`/auth?country=${country.id}`}>
                     Register & Start Now
                   </Link>
                 </Button>
                 <Button size="lg" variant="outline" asChild>
                   <Link to="/pricing-calculator">
                     Calculate Your Costs
                   </Link>
                 </Button>
               </div>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default CountryPage;