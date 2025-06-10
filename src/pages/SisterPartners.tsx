
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PartnerCard from '@/components/partners/PartnerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SisterPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const sisterPartners = [
    { category: "Academy AI", platform: "MoMo AI Academy", url: "https://momo-academy.lovable.app/", niche: "AI Academy" },
    { category: "Affiliates", platform: "MoMo Affiliates", url: "https://momo-affiliates.lovable.app/", niche: "Affiliates Marketplace" },
    { category: "AI Agents", platform: "FlowOrca", url: "https://floworca.lovable.app/", niche: "" },
    { category: "AI Publishers Tools", platform: "Creativoya", url: "https://creativoya.lovable.app/", niche: "AI-Powered Universe Create Audiobooks, Films, Music & Beyond" },
    { category: "APP Dev WhiteLabel", platform: "Mall Hub APP", url: "https://mall-brand-builder.lovable.app/", niche: "" },
    { category: "APP Dev WhiteLabel", platform: "AppWebo", url: "https://appweaver-mobile-creator.lovable.app/", niche: "" },
    { category: "ChatAPP", platform: "DiaLoGiGi", url: "https://dia-gigi-nexus-chat.lovable.app/", niche: "" },
    { category: "Communication & Emails", platform: "Emoxer", url: "https://emoxer.lovable.app/", niche: "" },
    { category: "CRM", platform: "Cractiv", url: "https://v0-ai-crm-home-page.vercel.app/", niche: "AI CRM" },
    { category: "Customer Voice Services", platform: "CometCall", url: "https://cometcall.lovable.app/", niche: "" },
    { category: "Customer Voice Services", platform: "LouDial", url: "https://v0-call-center-workflow.vercel.app/", niche: "" },
    { category: "Digital Marketing", platform: "SoliVid", url: "https://solivid.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "UniqRank", url: "https://uniqrank.lovable.app/", niche: "AI SEO" },
    { category: "Digital Marketing", platform: "SocialLater", url: "https://sociallater.lovable.app/", niche: "Social media automation" },
    { category: "Digital Marketing", platform: "VidAnne", url: "https://vidanne-ai-genesis.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "ShareSAAS", url: "https://share-saas-ai-nexus.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "InstaMackers", url: "https://insta-makers-ai-nexus.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "VirtualEsta", url: "https://virtualesta.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "VidicLap", url: "https://vidiclap.lovable.app/", niche: "" },
    { category: "Digital Marketing", platform: "Tools Together", url: "https://tools-together.lovable.app/", niche: "" },
    { category: "Drop Services", platform: "MoMoExpress", url: "https://momoexpress-ai-emporium.lovable.app/", niche: "" },
    { category: "Dropshipping", platform: "Dropoh", url: "https://dropoh.lovable.app/", niche: "" },
    { category: "E-Commerce", platform: "MoMoMerce", url: "https://momomerce.lovable.app/", niche: "" },
    { category: "Education", platform: "OutLearn", url: "https://outlern-ai-skool.lovable.app/", niche: "" },
    { category: "Email Hub", platform: "EmboXer", url: "https://emboxer.lovable.app/", niche: "" },
    { category: "Email Marketing", platform: "Emailify", url: "https://emailify-ai.lovable.app/", niche: "Email Marketing" },
    { category: "Entertainment", platform: "MoMoTV", url: "https://v0-streamio-clone-requirements.vercel.app/", niche: "" },
    { category: "Entertainment", platform: "Stremion", url: "https://streamion-ai-genesis.lovable.app/", niche: "" },
    { category: "Entertainment", platform: "MoMoPlay", url: "https://momoplay.com", niche: "" },
    { category: "ERP", platform: "ERPZen", url: "https://erpzen-ai-nexus.lovable.app/", niche: "AI ERP" },
    { category: "Finance", platform: "Keepence", url: "https://keepence.lovable.app/", niche: "" },
    { category: "Finance", platform: "CardsCard", url: "https://card-issuance-canvas.lovable.app/", niche: "" },
    { category: "Finance", platform: "MoMoPay", url: "https://momopay-financial-nexus.lovable.app/", niche: "" },
    { category: "Finance", platform: "Ecardora", url: "https://ecardora-dark-glow.lovable.app/", niche: "" },
    { category: "Finance", platform: "Halalye", url: "https://halalye-ethical-ventures-hub.lovable.app/", niche: "" },
    { category: "Finance", platform: "EscrowPass", url: "https://escrow-pass-ai-nexus.lovable.app/", niche: "" },
    { category: "Freelancer", platform: "JobProfits", url: "https://jobprofits.lovable.app/", niche: "" },
    { category: "Health & Medical", platform: "MedAGeni", url: "https://medai-ai-agent-hub.lovable.app/", niche: "" },
    { category: "Health & Sports", platform: "AI Geam", url: "https://v0-modern-ai-fitness-app.vercel.app/", niche: "" },
    { category: "HRM", platform: "Staffree", url: "https://staffree.lovable.app/", niche: "AI HRM" },
    { category: "Learning", platform: "High Quaran", url: "https://quran-ai-avatar-memorizer.lovable.app/", niche: "" },
    { category: "LLM", platform: "MoMoDev", url: "https://momodev.lovable.app/", niche: "" },
    { category: "Managments CEO", platform: "CeoAIBoss", url: "https://ceo-ai-boss.lovable.app/", niche: "AI CEO" },
    { category: "Managments CEO Start-up", platform: "CheifBits", url: "https://chiefbits.lovable.app/", niche: "" },
    { category: "Managments Food/Shop", platform: "EatiVus", url: "https://eatsai.lovable.app/", niche: "" },
    { category: "MarketPlace", platform: "UniCoden", url: "https://unicoden.lovable.app/", niche: "" },
    { category: "Print on Demand", platform: "MoMoMerch", url: "https://momomerch-ai.lovable.app/", niche: "Print on Demand" },
    { category: "Products Marketplace", platform: "MoMoMart", url: "https://momomart-ai-shopper-verse.lovable.app/", niche: "" },
    { category: "Real-Estate", platform: "Investue", url: "https://investue.lovable.app/", niche: "" },
    { category: "Real-Estate", platform: "Realiwise", url: "https://realiwise.lovable.app/", niche: "Real-Estate Rent or List" },
    { category: "Real-Estate", platform: "VestaBrokers", url: "https://vestabrokers.lovable.app/", niche: "Real-Estate Brokers" },
    { category: "Sport", platform: "MoMoSport", url: "https://momo-sport-ai.lovable.app/", niche: "" },
    { category: "Sport", platform: "AI Sports", url: "https://goal-minded-ai-arena.lovable.app/", niche: "" },
    { category: "Translation Learn", platform: "TranceSpeech", url: "https://trance-speech-verse.lovable.app/", niche: "" },
    { category: "Travel", platform: "EtiVago", url: "https://etivago-voyage-ai.lovable.app/", niche: "" },
    { category: "Visibility APP", platform: "VisLif", url: "https://vislif.lovable.app/", niche: "" },
    { category: "Web Hosting", platform: "Hosstic", url: "https://hosstic-sphere-nexus.lovable.app/", niche: "" }
  ];

  const categories = ['All', ...Array.from(new Set(sisterPartners.map(p => p.category)))];

  const filteredPartners = sisterPartners.filter(partner => {
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
                Sister <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our 57 sister companies offering specialized AI-powered solutions across various industries.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search sister partners..."
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
                <p className="text-muted-foreground">No sister partners found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SisterPartners;
