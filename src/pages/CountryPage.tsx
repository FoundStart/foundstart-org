import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, TrendingUp, Users, Globe, ExternalLink, CheckCircle, Handshake, CreditCard } from 'lucide-react';
import VideoThumbnail from '@/components/VideoThumbnail';
import EgyptCountryDetails from '@/components/countries/EgyptCountryDetails';
import { waEgyptLink } from '@/lib/whatsapp';
import { countriesData } from '@/data/countriesData';

const CountryPage = () => {
  const { isRTL } = useTranslation();
  const { user } = useAuth();
  const { countryId } = useParams<{ countryId: string }>();
  const country = countriesData.find(c => c.id.toLowerCase() === countryId?.toLowerCase());

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 px-4 text-center">
          <h1 className="text-2xl font-bold">Country not found</h1>
          <Button asChild className="mt-4"><Link to="/countries">Back to Countries</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isEgypt = country.id === 'EG';
  const formationPath = `/dashboard/formation?country=${country.id}`;
  const registerState = { redirectTo: formationPath };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/countries"><ArrowLeft className="w-4 h-4 mr-2" />Back to All Countries</Link>
              </Button>
            </div>

            <div className="text-center mb-12">
              <div className="text-8xl mb-4">{country.flag}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Start Your Business in <span className="gradient-text">{country.name}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{country.description}</p>
            </div>

            <Card className="glass-card mb-12">
              <CardHeader className="text-center"><CardTitle className="text-2xl">Formation Package</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="default" className="text-2xl px-6 py-3">{isEgypt ? (isRTL ? 'اطلب عرض سعر' : 'Get a quote') : <>Starting from {country.price}</>}</Badge>
                  <Badge variant="secondary" className="text-lg px-4 py-2">{country.timeframe}</Badge>
                </div>

                {isEgypt ? (
                  <div className="flex justify-center">
                    <Button size="lg" asChild className="text-lg px-8">
                      <a href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer">{isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="rounded-xl border p-5 flex flex-col gap-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2"><Handshake className="w-5 h-5 text-primary" />Open it with a formation partner</h3>
                      <p className="text-sm text-muted-foreground flex-1">
                        Compare trusted formation partners for {country.name} and open your company directly with the one you pick.
                      </p>
                      <Button size="lg" variant="outline" asChild className="w-full">
                        <a href="#partners">{isRTL ? 'اختر شريك التأسيس' : 'Choose a Formation Partner'}</a>
                      </Button>
                    </div>
                    <div className="rounded-xl border border-primary/50 p-5 flex flex-col gap-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />Let FoundStart form it for you</h3>
                      <p className="text-sm text-muted-foreground flex-1">
                        Register to your dashboard, pay securely online, and track every step while we establish your company.
                      </p>
                      <Button size="lg" asChild className="w-full">
                        <Link to={user ? formationPath : '/auth'} state={registerState}>{isRTL ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {country.videoUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Watch Formation Demo</h2>
                <VideoThumbnail videoUrl={country.videoUrl} title={`${country.name} Company Formation Demo`} className="w-full h-64 md:h-96" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="text-center p-4 glass-card"><TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" /><div className="text-lg font-bold">{country.keyStats.gdp}</div><div className="text-sm text-muted-foreground">GDP</div></Card>
              <Card className="text-center p-4 glass-card"><Users className="w-6 h-6 text-blue-500 mx-auto mb-2" /><div className="text-lg font-bold">{country.keyStats.population}</div><div className="text-sm text-muted-foreground">Population</div></Card>
              <Card className="text-center p-4 glass-card"><Globe className="w-6 h-6 text-purple-500 mx-auto mb-2" /><div className="text-lg font-bold">{country.keyStats.easeOfBusiness}</div><div className="text-sm text-muted-foreground">Ease of Business</div></Card>
              <Card className="text-center p-4 glass-card"><Building className="w-6 h-6 text-orange-500 mx-auto mb-2" /><div className="text-lg font-bold">{country.keyStats.corporateTax}</div><div className="text-sm text-muted-foreground">Corporate Tax</div></Card>
            </div>

            <Card className="glass-card mb-12">
              <CardHeader><CardTitle className="text-xl">Why Choose {country.name}?</CardTitle></CardHeader>
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

            {isEgypt && <EgyptCountryDetails />}

            {country.partners.length > 0 && <Card id="partners" className="glass-card mb-12 scroll-mt-24">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Building className="w-5 h-5" />Formation Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {country.partners.map((partner, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      asChild
                      className="h-auto py-4 hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href={partner.url} target={partner.url.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer">
                        {partner.name}
                        <ExternalLink className="w-4 h-4 mx-2" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>}

            <div className="text-center py-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your {country.name} Business?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{isRTL ? 'اختر شريك تأسيس موثوقًا أو دع FoundStart تؤسس شركتك.' : 'Pick a formation partner, or let FoundStart establish your company for you.'}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isEgypt ? (
                  <Button size="lg" asChild className="text-lg px-8">
                    <a href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer">{isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild className="text-lg px-8">
                      <Link to={user ? formationPath : '/auth'} state={registerState}>Register & Start Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild><Link to="/pricing-calculator">Calculate Your Costs</Link></Button>
                  </>
                )}
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
