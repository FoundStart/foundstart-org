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
    // Arabic Platforms
    { category: "Freelancer & Earn Money online", platform: "Khamsat", url: "https://khamsat.com/?r=2376622", language: "Arabic" },
    { category: "Freelancer & Earn Money online", platform: "Kafil", url: "https://kafiil.com/ref/325c5ca896", language: "Arabic" },
    { category: "Freelancer & Earn Money online", platform: "Frlanso", url: "https://www.forlanso.com/signup?code=mobpbyum", language: "Arabic" },
    { category: "Freelancer & Earn Money online", platform: "Nafezly", url: "https://nafezly.com/ref/657e29917bb93", language: "Arabic" },
    { category: "Freelancer & Earn Money online", platform: "Mostaql", url: "mostaql.com/", language: "Arabic" },
    { category: "Freelancer & Earn Money online", platform: "Elharefa", url: "https://www.elharefa.com/", language: "Arabic" },

    // English Platforms
    { category: "Freelancer & Earn Money online", platform: "People Per Hour", url: "https://www.peopleperhour.com/site/register?rfrd=10583958.5", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Fiverr", url: "https://go.fiverr.com/visit/?bta=819322&brand=fiverrcpa", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "We work remotely", url: "https://weworkremotely.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Upwork", url: "https://www.upwork.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Freelancer", url: "https://www.freelancer.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "flexjobs", url: "https://www.flexjobs.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Remote Tasks", url: "https://www.remotasks.com/es", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Labor X", url: "https://laborx.com?ref=388898", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "hire talents", url: "https://www.hiretalents.com/?rf=1131479", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Sproutgigs", url: "https://sproutgigs.com/?a=73cedb5c", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Toloka", url: "https://we.toloka.ai/promo?referralCode=SGLOCQKT", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Zeerk", url: "https://zeerk.me/qtwWo", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Ysense", url: "https://www.ysense.com/?rb=151276147", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "2Captcha", url: "https://2captcha.com/?from=20034972", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Write Nova", url: "https://writenova.net/ref/Deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Worker.cash", url: "https://worker.cash/u/418887", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "tradingview", url: "https://www.tradingview.com/pricing/?share_your_love=Deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Time Bucks", url: "https://timebucks.com/?refID=223771610", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Tgmpanel", url: "https://eg.tgm.link/UZca945897", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Test IO", url: "https://join.test.io/CXeHrS5emJZS", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Task Rabbit", url: "https://www.taskrabbit.com/s/ckd7x/try?utm_source=trycode", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Swag bucks", url: "https://www.swagbucks.com/profile/r_150942510?rp=1", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "surveyeah", url: "https://panel.surveyeah.com/en/p/4865935?s=share-link", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Survey time", url: "https://surveytime.app/NUGAU1NXcN", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Surveoo", url: "https://www.surveoo.com/?r=574773", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Survbe", url: "https://surfe.be/2656160", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "SOCPublic", url: "https://socpublic.com/?i=8934856&slide=1", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "SerfClick", url: "https://serfclick.net/i/186635", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "SEO Print", url: "https://seosprint.run/?ref=16392529", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Schoolsolver", url: "http://store.onlinejobs.ph/?aid=567662", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Rewardy", url: "https://rewardy.io/?ref=mohamedsayedtel", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "rateglo", url: "https://rateglo.com/?ref=933368", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Qolle", url: "https://qolle.biz/?i=56383", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Publish0x", url: "https://www.publish0x.com/?a=jnegnmB3dw", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "PrizeRebel", url: "https://www.prizerebel.com/index.php?r=14575451", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Peak Arena", url: "http://www.pa2016.vip/code/XSVPDIJU", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "payoutproject", url: "https://writenova.net/ref/Deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Paid2Play", url: "https://paid2play.co/share/mohamedsayedtel2007m", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Opinion pioneer", url: "https://opinionpioneer.com/?ref=69889", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "onlinejobs", url: "http://store.onlinejobs.ph/?aid=567662", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Mobrog", url: "https://mobrog.com/?membership_promotion=0&i_invite=20296232-657b62eccffd4&rkm=38", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Market agent", url: "https://panel.marketagent.com/ShortReg/Registration/en?RefUID=4646228", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Loot up", url: "https://lootup.me/?refer=6188713", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Linkjust", url: "https://linkjust.com/ref/109357403972199925407", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Ipweb", url: "https://www.ipweb.pro/?Deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Grabpoints", url: "https://grabpoints.com/#/?ref=TITP9N", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "GetPaid to", url: "https://www.getpaidto.com/refer/10933627/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Gamermine", url: "https://gamermine.com/r/deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Fun Box", url: "http://www.fun-box.vip/#/?invite_code=PPUBZUIB", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Fruitlab", url: "https://fruitlab.com/ref/willingkey96", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Freeward", url: "https://freeward.net/?ref=adk4m", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Everve", url: "https://everve.net/ref/1494985/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Eearnapp", url: "https://earnapp.com/i/pffXLtbv", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "couponchief", url: "https://www.couponchief.com/users/Deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Collect2win", url: "https://collect2win.com/register?ref=dfKFZce28H", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Cointiply", url: "http://cointiply.com/r/9P2V0o", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Adbtc", url: "https://r.adbtc.top/3578765", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "60win", url: "https://www.60win.com/c-Y8BSxXki?lang=en", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Free Cash", url: "https://freecash.com/r/4a3bd498bd", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "File upload", url: "https://www.file-upload.org/free649021.html", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Mega4upload", url: "https://mega4upload.com/free93360.html", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Up-4ever", url: "https://www.up-4ever.net/free2433907.html", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Minds", url: "https://www.minds.com/?referrer=deeemoz", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Rumble", url: "https://rumble.com/register/Deeemoz/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Zirtual", url: "https://www.zirtual.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Workable", url: "https://www.workable.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "toptal", url: "https://www.toptal.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "TopLanguageJobs", url: "http://toplanguagejobs.com", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Surveyhoney", url: "https://app.surveyhoney.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Study Pool", url: "https://www.studypool.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Rev", url: "https://rev.com", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Remotive", url: "http://remotive.com", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "rapidworkers", url: "https://rapidworkers.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "pushworkers", url: "https://pushworkers.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Odeskwork", url: "https://odeskwork.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Neobux", url: "https://www.neobux.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Mindsumo", url: "https://www.mindsumo.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Indeed", url: "http://indeed.com", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Hivemicro", url: "https://hivemicro.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Guru", url: "https://www.guru.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "designhill", url: "https://www.designhill.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "CareerVault", url: "http://CareerVault.io", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Aviso", url: "https://aviso.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Appen", url: "https://appen.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "Limewrite", url: "https://limewrite.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "agigptqt", url: "https://agigptqt.com/", language: "English" },
    { category: "Freelancer & Earn Money online", platform: "EuropelanguageJobs", url: "http://www.europelanguagejobs.com", language: "English" },

    // Russian Platforms
    { category: "Freelancer & Earn Money online", platform: "Wmrfast", url: "https://wmrfast.com/?r=2055078", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "Unu", url: "https://unu.im/users/2275736", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "TikTop", url: "https://tiktop-free.com/?ref=Deeemoz", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "Rucombo", url: "https://rucombo.com/?ref=29498", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "Payup", url: "https://payup.video/u/950943", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "Pagazani", url: "https://www.pagazani.com/?ref=2558130", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "teaserfast", url: "https://teaserfast.ru/", language: "RUS" },
    { category: "Freelancer & Earn Money online", platform: "Bux money", url: "https://bux.money/", language: "RUS" },
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