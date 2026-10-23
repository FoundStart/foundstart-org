export interface Domain {
  id: number;
  name: string;
  hosting: 'UD' | 'Spaceship' | 'Godaddy' | 'Hostinger' | 'Namebright';
  category: string;
  price?: string;
  businessType?: 'Business' | 'Domain';
  buyUrl?: string;
  marketplace?: string;
}

export interface SoldDomain {
  name: string;
  platform: 'Spaceship' | 'Afternic' | 'Sedo';
  soldDate: string; // ISO date, from Mohamed's own sales records
  soldPrice: string; // numeric amount
  currency?: 'USD' | 'EUR'; // default USD
}

export const soldDomains: SoldDomain[] = [
  { name: 'Ecanso.com', platform: 'Afternic', soldDate: '2026-02-04', soldPrice: '59' },
  { name: 'Transactionizer.com', platform: 'Sedo', soldDate: '2026-04-05', soldPrice: '100', currency: 'EUR' },
  { name: 'Shortoo.com', platform: 'Afternic', soldDate: '2026-06-26', soldPrice: '250' },
  { name: 'Shofic.com', platform: 'Afternic', soldDate: '2026-07-05', soldPrice: '250' },
  { name: 'Codestia.com', platform: 'Sedo', soldDate: '2026-08-02', soldPrice: '499' },
  { name: 'Caisho.com', platform: 'Spaceship', soldDate: '2026-08-23', soldPrice: '250' },
  { name: 'Flowmotic.com', platform: 'Afternic', soldDate: '2026-09-02', soldPrice: '250' },
  { name: 'CoinsLite.com', platform: 'Spaceship', soldDate: '2026-10-14', soldPrice: '250' },
  { name: 'Tradoq.com', platform: 'Afternic', soldDate: '2026-10-19', soldPrice: '59' },
];

const raw: Omit<Domain, 'id'>[] = [
  {
    "name": "Foundstart.org",
    "hosting": "Spaceship",
    "category": "Startup / Venture",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Heykeyword.com",
    "hosting": "Spaceship",
    "category": "SEO / Marketing",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Shortet.com",
    "hosting": "Spaceship",
    "category": "SaaS / Links",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "TopyPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "499",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/topypay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Expensol.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://www.atom.com/name/Expensol",
    "marketplace": "Atom"
  },
  {
    "name": "Keepence.com",
    "hosting": "UD",
    "category": "Fintech, SAAS",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/keepence.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Namelizer.com",
    "hosting": "Godaddy",
    "category": "SaaS / Branding",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Uniqranks.com",
    "hosting": "UD",
    "category": "SaaS / SEO",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/uniqranks.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Cartgy.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Shortili.com",
    "hosting": "Spaceship",
    "category": "SaaS / Links",
    "price": "450",
    "businessType": "Business",
    "buyUrl": "https://shortili.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Creativoya.com",
    "hosting": "Spaceship",
    "category": "SaaS / Creative",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://creativoya.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Toolstogethers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Exitsme.com",
    "hosting": "UD",
    "category": "Startup / M&A",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/exitsme.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Halalye.com",
    "hosting": "Spaceship",
    "category": "Food / Lifestyle",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://halalye.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "NameLik.com",
    "hosting": "UD",
    "category": "Branding",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/namelik.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Tafsirly.com",
    "hosting": "UD",
    "category": "Religious / Islamic",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Affillex.com",
    "hosting": "UD",
    "category": "Affiliate Marketing",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://affillex.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "MoMoMob.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/momomob.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "MoMoNil.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/momonil.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "YesShoot.com",
    "hosting": "UD",
    "category": "Photography / Gaming",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Talaboo.com",
    "hosting": "UD",
    "category": "Grocery / Delivery",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/talaboo.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Etivago.com",
    "hosting": "Spaceship",
    "category": "Travel / SaaS",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://etivago.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Cardolla.com",
    "hosting": "Spaceship",
    "category": "Fintech / E-Commerce / Automotive",
    "price": "350",
    "businessType": "Business",
    "buyUrl": "https://cardolla.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "MSA-serv.com",
    "hosting": "Hostinger",
    "category": "B2B / Services",
    "price": "2500",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Assetsium.com",
    "hosting": "UD",
    "category": "Fintech / Asset Management",
    "price": "250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Careeroh.com",
    "hosting": "Spaceship",
    "category": "HR / Job Board",
    "price": "250",
    "businessType": "Business",
    "buyUrl": "https://careeroh.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Deeemoz.shop",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "150",
    "businessType": "Business",
    "buyUrl": "https://deeemoz.shop",
    "marketplace": "Spaceship"
  },
  {
    "name": "Dropoh.com",
    "hosting": "UD",
    "category": "E-Commerce / Dropshipping",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/dropoh.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "FoundVC.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://foundvc.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Freelinance.com",
    "hosting": "UD",
    "category": "Freelance / Gig Economy",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/freelinance.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Agitli.com",
    "hosting": "UD",
    "category": "Business",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/agitli.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Exitsmena.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Foodievo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech, SAAS",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://foodievo.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Hosstec.com",
    "hosting": "Spaceship",
    "category": "Tech / Hosting",
    "price": "250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "TakeRides.com",
    "hosting": "Spaceship",
    "category": "Fleet Automotive",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/TakeRides",
    "marketplace": "Atom"
  },
  {
    "name": "Talabook.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, APP, Grocery",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/talabook.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Escroy.com",
    "hosting": "UD",
    "category": "Escrow Pay",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Finaprise.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/FinaPrise",
    "marketplace": "Atom"
  },
  {
    "name": "Fruitla.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech, APP, Grocery",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://fruitla.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Storezly.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://storezly.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "ZadAfrica.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "5000",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Emboxer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Nanymart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Nany marketplace",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/nanymart.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "NixCash.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/NixCash",
    "marketplace": "Atom"
  },
  {
    "name": "Paylita.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Paylita",
    "marketplace": "Atom"
  },
  {
    "name": "Trancesend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/trancesend.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Uniqranker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/uniqranker.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Buyill.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://buyill.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Clothecart.com",
    "hosting": "Spaceship",
    "category": "POD-E-Commerce/Fashion",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "EstatesChain.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/estateschain.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Marttogo.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/marttogo.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Societygram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/societygram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Dealigi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://domains.atom.com/lpd/name/dealigi.com",
    "marketplace": "Atom"
  },
  {
    "name": "Loadwhale.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Loadwhale",
    "marketplace": "Atom"
  },
  {
    "name": "Bestofmart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "265",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Autobases.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Cardido.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Cartdidi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cartdidi.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Cloddi.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "450",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cloddi.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Coinaxia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/coinaxia.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "CometCall.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/CometCall",
    "marketplace": "Atom"
  },
  {
    "name": "ComZio.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/comzio.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Coursaro.com",
    "hosting": "Spaceship",
    "category": "EdTech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://coursaro.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Cryptemp.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://cryptemp.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Dealago.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Dealago",
    "marketplace": "Atom"
  },
  {
    "name": "Diroh.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Domianity.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Doscash.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/doscash.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Ecardera.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://ecardera.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Ecardora.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SAAS",
    "price": "250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Emotorsmarket.com",
    "hosting": "UD",
    "category": "Fintech-E-Commerce & Marketplaces / SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://emotorsmarket.com",
    "marketplace": ""
  },
  {
    "name": "Enitsa.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://enitsa.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Estatesa.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/estatesa.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Fintekly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/fintekly.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Folkgram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/folkgram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Giftbed.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/giftbed.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Godemart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/godemart.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "InfiniteGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/infinitegram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "InstaMackers.com",
    "hosting": "UD",
    "category": "Social Media",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/instamackers.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Investue.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://investue.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Jobagy.com",
    "hosting": "UD",
    "category": "Recurements, Freelancer, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/jobagy.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Jobigy.com",
    "hosting": "UD",
    "category": "Recurements, Freelancer, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Justailawyer.com",
    "hosting": "UD",
    "category": "Legal",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/justailawyer.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "llmified.com",
    "hosting": "UD",
    "category": "LLM",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/LLMified",
    "marketplace": "Atom"
  },
  {
    "name": "Loverlet.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/loverlet.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Martome.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martome.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Medianar.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/medianar.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Mediationmarket.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/MediationMarket",
    "marketplace": "Atom"
  },
  {
    "name": "OppaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/oppapay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Payleya.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payleya.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Payoha.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payoha.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Payort.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://payort.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Rankingmart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/rankingmart.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Reallt.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Sociallaters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Trillionchat.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/trillionchat.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "UniqranKing.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://uniqranking.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Walletah.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/walletah.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "WhenSpend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/whenspend.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Teeped.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "245",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/teeped.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "AlternativeClaw.com",
    "hosting": "UD",
    "category": "Niche / Hardware",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "AtlanticClaw.com",
    "hosting": "UD",
    "category": "Seafood / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/atlanticclaw.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Cashzor.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cashzor.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Ecardura.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/ecardura.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "MartGem.com",
    "hosting": "UD",
    "category": "Sport SAAS",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martgem.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "TechyClaw.com",
    "hosting": "UD",
    "category": "Tech / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/techyclaw.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "TodaysClaw.com",
    "hosting": "UD",
    "category": "Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/todaysclaw.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Affivid.com",
    "hosting": "UD",
    "category": "Affiliate Video marketing",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/affivid.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Automorize.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/automorize.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "BlocksValley.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/blocksvalley.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Carthot.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "5000",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "CitySpain.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cityspain.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "ClauGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/claugram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Dailymr.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Dealello.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/dealello.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Existmatch.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/existmatch.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "GramChase.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramchase.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Gramout.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramout.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "InfinitiMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://infinitimeta.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "InteMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://intemeta.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Investicash.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Investicash",
    "marketplace": "Atom"
  },
  {
    "name": "LandingKey.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/LandingKey",
    "marketplace": "Atom"
  },
  {
    "name": "MallCanyon.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces - SAAS hub",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mallcanyon.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Metachia.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://metachia.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Mistonia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mistonia.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Solivid.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://solivid.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Storecho.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://storecho.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Afinya.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Affliate",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/afinya.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "AppWebo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://appwebo.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Assetmediator.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/AssetMediator",
    "marketplace": "Atom"
  },
  {
    "name": "AssetMotive.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/assetmotive.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Goidai.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/goidai.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Grambond.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/grambond.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Gramger.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramger.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "MartlyGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martlygram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Mediomy.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mediomy.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Metanta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://metanta.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Rewardial.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Rewardial",
    "marketplace": "Atom"
  },
  {
    "name": "Socialautoposters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialautoposters.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Socialsenders.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialsenders.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "VestaBrokers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/VestaBrokers",
    "marketplace": "Atom"
  },
  {
    "name": "ChasesGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/chasesgram.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Chatelly.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Chatelly",
    "marketplace": "Atom"
  },
  {
    "name": "Ecanio.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Ecanro.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Paybrink.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/paybrink.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Survimart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/survimart.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Transacly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Transacly",
    "marketplace": "Atom"
  },
  {
    "name": "VestaBroker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/vestabroker.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "XperaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/xperapay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "ExemPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "ZohPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/zohpay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "BekoMart.com",
    "hosting": "Namebright",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Cryptinco.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "299",
    "businessType": "Domain",
    "buyUrl": "https://cryptinco.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "EasycheckPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/easycheckpay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Jumamart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Landgage.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/landgage.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Laterssocial.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://laterssocial.com"
  },
  {
    "name": "Linkliz.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/linkliz.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Mediadirect.uk",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Marketing",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://mediadirect.uk",
    "marketplace": "Spaceship"
  },
  {
    "name": "Mentelic.com",
    "hosting": "UD",
    "category": "EdTech / Coaching",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Mentelic",
    "marketplace": "Atom"
  },
  {
    "name": "MetaMany.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://metamany.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Postsocialauto.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/postsocialauto.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Sellerizer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Sellerizer",
    "marketplace": "Atom"
  },
  {
    "name": "Shopeter.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://shopeter.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Socialautobest.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialautobest.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Stremion.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Stream IPTV. TV",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Transationser.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/transationser.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "VisLif.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/vislif.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "XpanderPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/xpanderpay.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "ZonFood.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/zonfood.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "365crypt.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "365martly.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Cartburn.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cartburn.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Cryptalyzes.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://cryptalyzes.com",
    "marketplace": "Spaceship"
  },
  {
    "name": "Dealiar.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/dealiar.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Drobito.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/drobito.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "Payerzy.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payerzy.com",
    "marketplace": "Unstoppable"
  },
  {
    "name": "syrri.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - tool",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "voucherdeck.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/VoucherDeck",
    "marketplace": "Atom"
  },
  {
    "name": "Kufya.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "500",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Shortst.com",
    "hosting": "UD",
    "category": "SaaS / Links",
    "price": "4500",
    "businessType": "Business",
    "buyUrl": ""
  }
];

export const domainsData: Domain[] = raw.map((d, i) => ({ id: i + 1, ...d }));

export const categories: string[] = Array.from(new Set(domainsData.map(d => d.category))).sort();
export const hostingProviders: string[] = Array.from(new Set(domainsData.map(d => d.hosting))).sort();
