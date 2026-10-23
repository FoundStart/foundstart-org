import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, TrendingUp, Users, Globe, ExternalLink, CheckCircle, Handshake, CreditCard } from 'lucide-react';
import { getCountryVideoUrl } from '@/data/countryVideos';
import VideoThumbnail from '@/components/VideoThumbnail';
import EgyptCountryDetails from '@/components/countries/EgyptCountryDetails';
import { waEgyptLink } from '@/lib/whatsapp';
import { countriesData } from '@/data/countriesData';
import PartnerPricing from '@/components/PartnerPricing';
import { COUNTRY_AR_NAMES, selectCountryPartners } from '@/data/partnerPricing';

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
                  <Badge variant="default" className="text-2xl px-6 py-3">{isEgypt ? (isRTL ? 'يبدأ من $249' : 'Starting from $249') : <>Starting from {country.price}</>}</Badge>
                  <Badge variant="secondary" className="text-lg px-4 py-2">{country.timeframe}</Badge>
                </div>

                <div className="rounded-xl border border-primary/50 p-5 flex flex-col gap-3 text-left max-w-xl mx-auto">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />{isRTL ? `افتح شركتك في ${country.name} مع FoundStart` : `Open your ${country.name} company with FoundStart`}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEgypt
                      ? (isRTL ? 'سجل في لوحة التحكم، ادفع بأمان أونلاين، وتابع كل خطوة أثناء تأسيس شركتك. رسوم الخدمة تبدأ من $249 والرسوم الحكومية منفصلة.' : 'Register to your dashboard, pay securely online, and track every step while we establish your company. Service fee starts from $249; government fees are separate.')
                      : (isRTL ? 'سجل في لوحة التحكم، شوف متطلبات الدولة والسعر، ادفع بأمان أونلاين، وتابع كل خطوة أثناء تأسيس شركتك.' : "Register to your dashboard, see the country's requirements and price, pay securely online, and track every step while we establish your company.")}
                  </p>
                  <Button size="lg" asChild className="w-full">
                    <Link to={user ? formationPath : '/auth'} state={registerState}>{isRTL ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}</Link>
                  </Button>
                  {isEgypt && <Button size="lg" variant="outline" asChild className="w-full"><a href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer">{isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a></Button>}
                </div>
              </CardContent>
            </Card>

            {getCountryVideoUrl(country.id, isRTL, country.videoUrl) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-center">{isRTL ? 'شاهد فيديو التأسيس' : 'Watch Formation Demo'}</h2>
                <VideoThumbnail videoUrl={getCountryVideoUrl(country.id, isRTL, country.videoUrl)!} title={`${country.name} Company Formation Demo`} className="w-full h-64 md:h-96" />
              </div>
            )}

            {selectCountryPartners(country.id, country.partners).length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-center">{isRTL ? 'أو افتحها عن طريق شركائنا' : 'Or open it via our partners'}</h2>
                <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
                  {selectCountryPartners(country.id, country.partners).map((p) => (
                    <div key={p.name} className="rounded-xl border border-border p-5 space-y-3">
                      <PartnerPricing countryId={country.id} partnerName={p.name} isRTL={isRTL} />
                      <Button variant="outline" className="w-full justify-between" asChild>
                        <a href={p.url} target="_blank" rel="noopener noreferrer sponsored">{isRTL ? `افتح شركة ${COUNTRY_AR_NAMES[country.id] || country.name} مع ${p.name}` : `Open ${country.name} company with ${p.name}`}<ExternalLink className="w-4 h-4" /></a>
                      </Button>
                    </div>
                  ))}
                </div>
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

            

            <div className="text-center py-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">{isRTL ? <>هل أنت مستعد لتأسيس شركتك في {COUNTRY_AR_NAMES[country.id] || country.name}؟</> : <>Ready to Start Your {country.name} Business?</>}</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{isRTL ? 'دع FoundStart تؤسس شركتك.' : 'Let FoundStart establish your company for you.'}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link to={user ? formationPath : '/auth'} state={registerState}>{isRTL ? 'سجل وابدأ الآن' : 'Register & Start Now'}</Link>
                </Button>
                {isEgypt ? (
                  <Button size="lg" variant="outline" asChild>
                    <a href={waEgyptLink(isRTL)} target="_blank" rel="noopener noreferrer">{isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" asChild><Link to="/pricing-calculator">Calculate Your Costs</Link></Button>
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
