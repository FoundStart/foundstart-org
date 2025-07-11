import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DigitalPartnersHeader from '@/components/partners/DigitalPartnersHeader';
import DigitalPartnersFilters from '@/components/partners/DigitalPartnersFilters';
import DigitalPartnersGrid from '@/components/partners/DigitalPartnersGrid';
import { digitalPartnersData } from '@/data/digitalPartnersData';

const DigitalPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add pop-under ad script to head
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl27137303.profitableratecpm.com/80/e6/a5/80e6a5909d296502b1621bb8bfe52d34.js';
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(digitalPartnersData.map(p => p.category)))];

  const filteredPartners = digitalPartnersData.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.niche?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <DigitalPartnersHeader filteredPartnersCount={filteredPartners.length} />
            
            <DigitalPartnersFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            <DigitalPartnersGrid partners={filteredPartners} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalPartners;
