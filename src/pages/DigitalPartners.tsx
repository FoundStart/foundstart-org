
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PartnerCard from '@/components/partners/PartnerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DigitalPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const partners = [
    { category: "Company Establish", platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "(UK-USA-CA) company Establish" },
    { category: "Company Establish", platform: "Firstbase", url: "https://firstbase.pxf.io/RGaDzX", niche: "UK company Establish" },
    { category: "Company Establish", platform: "ITIN", url: "https://theitin.com/ref/80", niche: "USA company Establish" },
    { category: "Company Establish", platform: "1stFormations", url: "https://1st-formations-limited.sjv.io/4GKB30", niche: "UK company Establish" },
    { category: "Company Establish", platform: "Clemta", url: "https://clemta.com/?ref=njbhzwf", niche: "USA company Establish" },
    { category: "Company Establish", platform: "startglobal", url: "http://startglobal.co/?via=mohamed-sayed", niche: "USA company Establish" },
    { category: "Financial", platform: "Mercury", url: "https://mercury.com/r/deeemoz-llc", niche: "USA Bank" },
    { category: "Financial", platform: "Wise", url: "https://wise.com/invite/u/mohamedsayeda7", niche: "Bank/Wallet" },
    { category: "Financial", platform: "Redotpay", url: "https://url.hk/i/en/q1xmy", niche: "Virtual cards" },
    { category: "Financial", platform: "Airtm", url: "https://app.airtm.com/ivt/msa2023", niche: "Bank/Wallet" },
    { category: "Financial", platform: "Payeer", url: "https://payeer.com/?session=29670378", niche: "Digital Wallet" },
    { category: "Financial", platform: "Novel bank", url: "https://trynovel.com/?lmref=HaLvsA", niche: "Bank/Wallet" },
    { category: "Crypto & P2P", platform: "Gate", url: "https://www.gate.com/signup/BAJHU1EJ?ref_type=103", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Crypto & P2P", platform: "Binance", url: "https://www.binance.com/referral/mystery-box/2025-pizza-day/claim?ref=GRO_16987_J6YH9", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Crypto & P2P", platform: "ByBit", url: "https://www.bybit.com/invite?ref=NY47LOY", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Crypto & P2P", platform: "BingX", url: "https://bingx.com/invite/WXBU1R/", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Crypto & P2P", platform: "Bitget", url: "https://newshare.bwb.global/en/invite_earn_coin?inviteCode=nQXZQE", niche: "Crypto Wallet - Exchange P2P" },
    { category: "LLMs", platform: "Claude", url: "https://claude.ai/referral/kOoRtNzkSg", niche: "Claude LLM" },
    { category: "LLMs", platform: "Manus", url: "https://manus.im/invitation/XDECAJVSG9VE", niche: "Manus LLMs" },
    { category: "AI UGC", platform: "Creatify", url: "https://creatify.ai/?via=momo", niche: "AI UGC + Arabic" },
    { category: "AI UGC", platform: "Makereels", url: "https://makereels.ai/?via=momo-sa", niche: "AI Reels" },
    { category: "AI UGC", platform: "Heygen", url: "https://app.heygen.com/guest/templates?cid=1696a52e", niche: "" },
    { category: "Business Automation", platform: "Pabbly", url: "https://payments.pabbly.com/api/affurl/RVYZ07kQyUZ0Z1HUKZ1m/HyZ0KsMikOjASVp2p?target=b1BHyhSldo6RN1Fn", niche: "Business Automation" },
    { category: "Business Automation", platform: "Flowise", url: "https://cloud.flowiseai.com/register?via=momo", niche: "Build AI Agents Visually" },
    { category: "SEO tools", platform: "madgicx", url: "https://madgicx.com?fpr=momo82", niche: "AI Media buyer-AI Ads" },
    { category: "SEO tools", platform: "SEO Store", url: "https://panel.seoestore.net/?ref=Deeemoz", niche: "SEO" },
    { category: "AI Videos", platform: "Syllabe", url: "https://syllaby.io/?via=momo89", niche: "Video Creation" },
    { category: "AI Videos", platform: "Fliki", url: "https://fliki.ai/?via=mohamed-sayed", niche: "AI Video creation" },
    { category: "AI Videos", platform: "Pictory", url: "https://pictory.ai/?ref=mohamed49", niche: "AI Video creation" },
    { category: "APP developments", platform: "Lovable AI", url: "https://lovable.dev/?via=momo", niche: "No Code AI-Full stack AI" },
    { category: "APP developments", platform: "Andromo", url: "https://builder.andromo.com/?aaii=1591544.17f7e9", niche: "No Code Apps builder" },
    { category: "Web", platform: "Hostinger", url: "https://hostinger.com/?REFERRALCODE=1MOHAMEDSA219", niche: "Web domains , hosting & Emails" },
    { category: "Digital marketplace", platform: "Codester", url: "https://www.codester.com/?ref=deeemoz", niche: "Digital marketplace APP-Web-Themes Source code" },
    { category: "Digital marketplace", platform: "Envato Market", url: "https://1.envato.market/deeemoz2023", niche: "Digital marketplace APP-Web-Themes Source code" },
    { category: "Dropshipping", platform: "Ecomhunt", url: "https://www.ecomhunt.com/?afmc=41s", niche: "Dropshipping tool wininning products" },
    { category: "Print on Demand", platform: "Printful", url: "www.printful.com/a/msa", niche: "POD marketplace" },
    { category: "Email Marketing", platform: "ConvertKit", url: "https://convertkit.com/", niche: "Email Marketing" }
  ];

  const categories = ['All', ...Array.from(new Set(partners.map(p => p.category)))];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl md:text-4xl font-bold">
                Digital <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover 230+ trusted partners across all business categories to help grow your venture.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPartners.map((partner, index) => (
                <PartnerCard key={index} partner={partner} />
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No partners found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalPartners;
