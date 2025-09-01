
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DigitalPartnersHeader from '@/components/partners/DigitalPartnersHeader';
import DigitalPartnersFilters from '@/components/partners/DigitalPartnersFilters';
import DigitalPartnersGrid from '@/components/partners/DigitalPartnersGrid';
import DigitalPartnersSidebar from '@/components/partners/DigitalPartnersSidebar';
import { digitalPartnersData } from '@/data/digitalPartnersData';

const DigitalPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(digitalPartnersData.map(p => p.category)))];

  // Count partners per category
  const partnersCount = useMemo(() => {
    const counts: Record<string, number> = {};
    digitalPartnersData.forEach(partner => {
      counts[partner.category] = (counts[partner.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredPartners = digitalPartnersData.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.niche?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Back Button */}
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <DigitalPartnersHeader filteredPartnersCount={filteredPartners.length} />
            
            <DigitalPartnersFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            <div className="grid lg:grid-cols-4 gap-8 mt-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <DigitalPartnersSidebar
                  categories={categories.slice(1)} // Remove 'All' from sidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  partnersCount={partnersCount}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <DigitalPartnersGrid partners={filteredPartners} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalPartners;
