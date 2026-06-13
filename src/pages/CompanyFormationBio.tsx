import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, ArrowLeft, CheckCircle2, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BIO_URL = 'https://shortet.com/Company-Formation/';

const jurisdictions = [
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇪🇪', name: 'Estonia' },
  { flag: '🇫🇮', name: 'Finland' },
  { flag: '🇸🇪', name: 'Sweden' },
  { flag: '🇱🇻', name: 'Latvia' },
  { flag: '🇱🇹', name: 'Lithuania' },
  { flag: '🇮🇪', name: 'Ireland' },
  { flag: '🇪🇬', name: 'Egypt' },
];

const CompanyFormationBio = () => {
  const open = () => window.open(BIO_URL, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Company Formation Bio Page — All Countries | FoundStart</title>
        <meta name="description" content="One bio link to start your company formation in 10+ countries. Access all FoundStart's trusted formation partners worldwide." />
        <link rel="canonical" href="https://foundstart-org.lovable.app/company-formation-bio" />
      </Helmet>
      <Header />
      <main className="pb-20 lg:pb-0">
        <PageHero
          title="Company Formation"
          highlight="Bio Link"
          subtitle="One link to all our country formation partners worldwide"
        />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/countries"><ArrowLeft className="w-4 h-4 mr-2" />Back to Countries</Link>
              </Button>
            </div>

            <Card className="glass-card mb-8">
              <CardContent className="p-8 text-center space-y-6">
                <Badge variant="outline" className="mx-auto"><Link2 className="w-3 h-3 mr-1" /> Official Bio Link</Badge>
                <h2 className="text-2xl md:text-3xl font-bold">
                  All Country Formations in <span className="gradient-text">One Page</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our curated bio page hosts every active country formation partner — share it anywhere
                  (Instagram, TikTok, LinkedIn, X) so your audience can pick a jurisdiction and start instantly.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm bg-muted/50 rounded-lg px-4 py-3 break-all">
                  <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono">{BIO_URL}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" onClick={open}>
                    Open Bio Page <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => { navigator.clipboard.writeText(BIO_URL); }}>
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold mb-4 text-center">Jurisdictions Included</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
              {jurisdictions.map((j) => (
                <Card key={j.name} className="text-center hover:shadow-lg transition-all cursor-pointer" onClick={open}>
                  <CardContent className="p-4">
                    <div className="text-3xl mb-1">{j.flag}</div>
                    <div className="text-sm font-semibold">{j.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold text-lg">Why use the bio link?</h3>
                {[
                  'Single shareable URL across all socials',
                  'Always up to date with new jurisdictions',
                  'Tracked clicks for affiliate attribution',
                  'Mobile-optimized landing experience',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyFormationBio;