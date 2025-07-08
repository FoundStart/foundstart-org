
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountrySelector from '@/components/countries/CountrySelector';
import CountryDetails from '@/components/countries/CountryDetails';
import CountryGrid from '@/components/countries/CountryGrid';
import EgyptFormationGuide from '@/components/countries/EgyptFormationGuide';
import { countriesData } from '@/data/countriesData';
import { useTranslation } from '@/contexts/TranslationContext';

const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const { t, isRTL } = useTranslation();

  const selectedCountryData = countriesData.find(c => c.id === selectedCountry) || countriesData[0];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className={`space-y-4 mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
              <h1 className="text-3xl md:text-4xl font-bold">
                {t.chooseJurisdiction} <span className="gradient-text">Business Jurisdiction</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.chooseJurisdictionDescription}
              </p>
            </div>

            <CountrySelector 
              countries={countriesData}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
            />

            {selectedCountry === 'EG' ? (
              <EgyptFormationGuide />
            ) : (
              <CountryDetails country={selectedCountryData} />
            )}

            <CountryGrid 
              countries={countriesData}
              onCountrySelect={setSelectedCountry}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Countries;
