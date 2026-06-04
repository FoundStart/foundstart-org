import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PartnerCard from '@/components/partners/PartnerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { freelancerPartnersData } from '@/data/freelancerPartnersData';

const FreelancerPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const freelancerPartners = freelancerPartnersData;

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