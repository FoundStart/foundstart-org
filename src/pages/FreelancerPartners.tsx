
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PartnerCard from '@/components/partners/PartnerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FreelancerPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const freelancerPartners = [
    { category: "Freelancer & Micro Jobs", platform: "Khamsat", url: "https://khamsat.com/?r=2376622", language: "Arabic" },
    { category: "Freelancer & Micro Jobs", platform: "Mostaql", url: "mostaql.com/", language: "Arabic" },
    { category: "Freelancer & Micro Jobs", platform: "Kafil", url: "https://kafiil.com/ref/325c5ca896", language: "Arabic" },
    { category: "Freelancer & Micro Jobs", platform: "Nafezly", url: "https://nafezly.com/ref/657e29917bb93", language: "Arabic" },
    { category: "Freelancer & Micro Jobs", platform: "Frlanso", url: "https://www.forlanso.com/signup?code=mobpbyum", language: "Arabic" },
    { category: "Freelancer & Micro Jobs", platform: "Fiverr", url: "https://go.fiverr.com/visit/?bta=819322&brand=fiverrcpa", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Sproutgigs", url: "https://sproutgigs.com/?a=73cedb5c", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Upwork", url: "https://www.upwork.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Freelancer", url: "https://www.freelancer.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "hire talents", url: "https://www.hiretalents.com/?rf=1131479", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "People Per Hour", url: "https://www.peopleperhour.com/site/register?rfrd=10583958.5", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Remote Tasks", url: "https://www.remotasks.com/es", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "weworkremotely", url: "https://weworkremotely.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Indeed", url: "http://indeed.com", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Toloka", url: "https://we.toloka.ai/promo?referralCode=SGLOCQKT", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "flexjobs", url: "https://www.flexjobs.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "CareerVault", url: "http://CareerVault.io", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "2Captcha", url: "https://2captcha.com/?from=20034972", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Appen", url: "https://appen.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Aviso", url: "https://aviso.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "designhill", url: "https://www.designhill.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Freeward", url: "https://freeward.net/?ref=adk4m", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "GetPaid to", url: "https://www.getpaidto.com/refer/10933627/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Grabpoints", url: "https://grabpoints.com/#/?ref=TITP9N", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Guru", url: "https://www.guru.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Hivemicro", url: "https://hivemicro.com/", language: "English" },
    { category: "Freelancer & Micro Jobs", platform: "Pagazani", url: "https://www.pagazani.com/?ref=2558130", language: "RUS" },
    { category: "Freelancer & Micro Jobs", platform: "Rucombo", url: "https://rucombo.com/?ref=29498", language: "RUS" },
    { category: "Freelancer & Micro Jobs", platform: "Unu", url: "https://unu.im/users/2275736", language: "RUS" },
    { category: "Freelancer & Micro Jobs", platform: "Wmrfast", url: "https://wmrfast.com/?r=2055078", language: "RUS" },
    { category: "Earn Money online", platform: "60win", url: "https://www.60win.com/c-Y8BSxXki?lang=en", language: "English" },
    { category: "Earn Money online", platform: "Adbtc", url: "https://r.adbtc.top/3578765", language: "English" },
    { category: "Earn Money online", platform: "Cointiply", url: "http://cointiply.com/r/9P2V0o", language: "English" },
    { category: "Earn Money online", platform: "Free Cash", url: "https://freecash.com/r/4a3bd498bd", language: "English" },
    { category: "Earn Money online", platform: "PrizeRebel", url: "https://www.prizerebel.com/index.php?r=14575451", language: "English" },
    { category: "Earn Money online", platform: "Swag bucks", url: "https://www.swagbucks.com/profile/r_150942510?rp=1", language: "English" },
    { category: "Earn Money online", platform: "Time Bucks", url: "https://timebucks.com/?refID=223771610", language: "English" },
    { category: "Earn Money online", platform: "Ysense", url: "https://www.ysense.com/?rb=151276147", language: "English" }
  ];

  const languages = ['All', ...Array.from(new Set(freelancerPartners.map(p => p.language)))];

  const filteredPartners = freelancerPartners.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || partner.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl md:text-4xl font-bold">
                Freelancer <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with 100+ freelancer platforms across multiple languages to find the perfect talent for your projects.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search freelancer platforms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {languages.map(language => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPartners.map((partner, index) => (
                <PartnerCard 
                  key={index} 
                  partner={{
                    category: partner.language,
                    platform: partner.platform,
                    url: partner.url,
                    niche: partner.category
                  }} 
                />
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No freelancer platforms found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FreelancerPartners;
