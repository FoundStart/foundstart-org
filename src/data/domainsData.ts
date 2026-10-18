export interface Domain {
  id: number;
  name: string;
  hosting: 'UD' | 'Spaceship' | 'Godaddy' | 'Hostinger' | 'Namebright';
  category: string;
  price?: string;
  businessType?: 'Business' | 'Domain';
  buyUrl?: string;
}

export interface SoldDomain {
  name: string;
  platform: 'Spaceship' | 'Afternic' | 'Sedo';
  soldDate: string; // ISO date, from Mohamed's own sales records
  soldPrice: string; // USD
}

export const soldDomains: SoldDomain[] = [
  { name: 'Shortoo.com', platform: 'Afternic', soldDate: '2026-06-26', soldPrice: '250' },
  { name: 'Shofic.com', platform: 'Afternic', soldDate: '2026-07-05', soldPrice: '250' },
  { name: 'Codestia.com', platform: 'Sedo', soldDate: '2026-08-02', soldPrice: '499' },
  { name: 'Caisho.com', platform: 'Spaceship', soldDate: '2026-08-23', soldPrice: '250' },
  { name: 'Flowmotic.com', platform: 'Afternic', soldDate: '2026-09-02', soldPrice: '250' },
  { name: 'CoinsLite.com', platform: 'Spaceship', soldDate: '2026-10-14', soldPrice: '250' },
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
    "buyUrl": "https://unstoppabledomains.com/d/topypay.com"
  },
  {
    "name": "Expensol.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "1500",
    "businessType": "Business",
    "buyUrl": "https://www.atom.com/name/Expensol"
  },
  {
    "name": "Keepence.com",
    "hosting": "UD",
    "category": "Fintech, SAAS",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/keepence.com"
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
    "price": "1250",
    "businessType": "Business",
    "buyUrl": ""
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
    "buyUrl": "https://shortili.com"
  },
  {
    "name": "Creativoya.com",
    "hosting": "Spaceship",
    "category": "SaaS / Creative",
    "price": "500",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Toolstogethers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "250",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/toolstogethers.com"
  },
  {
    "name": "Exitsme.com",
    "hosting": "UD",
    "category": "Startup / M&A",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/exitsme.com"
  },
  {
    "name": "Halalye.com",
    "hosting": "Spaceship",
    "category": "Food / Lifestyle",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": "https://halalye.com"
  },
  {
    "name": "NameLik.com",
    "hosting": "UD",
    "category": "Branding",
    "price": "1500",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Tafsirly.com",
    "hosting": "UD",
    "category": "Religious / Islamic",
    "price": "250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Affillex.com",
    "hosting": "UD",
    "category": "Affiliate Marketing",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://affillex.com"
  },
  {
    "name": "MoMoMob.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/momomob.com"
  },
  {
    "name": "MoMoNil.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/momonil.com"
  },
  {
    "name": "YesShoot.com",
    "hosting": "UD",
    "category": "Photography / Gaming",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Talaboo.com",
    "hosting": "UD",
    "category": "Grocery / Delivery",
    "price": "1151",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/talaboo.com"
  },
  {
    "name": "Etivago.com",
    "hosting": "Spaceship",
    "category": "Travel / SaaS",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://etivago.com"
  },
  {
    "name": "Cardolla.com",
    "hosting": "Spaceship",
    "category": "Fintech / E-Commerce / Automotive",
    "price": "350",
    "businessType": "Business",
    "buyUrl": "https://cardolla.com"
  },
  {
    "name": "MSA-serv.com",
    "hosting": "Hostinger",
    "category": "B2B / Services",
    "price": "350",
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
    "buyUrl": "https://careeroh.com"
  },
  {
    "name": "Deeemoz.shop",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "100",
    "businessType": "Business",
    "buyUrl": "https://deeemoz.shop"
  },
  {
    "name": "Dropoh.com",
    "hosting": "UD",
    "category": "E-Commerce / Dropshipping",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/dropoh.com"
  },
  {
    "name": "FoundVC.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://foundvc.com"
  },
  {
    "name": "Freelinance.com",
    "hosting": "UD",
    "category": "Freelance / Gig Economy",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/freelinance.com"
  },
  {
    "name": "Agitli.com",
    "hosting": "UD",
    "category": "Business",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/agitli.com"
  },
  {
    "name": "Exitsmena.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/exitsmena.com"
  },
  {
    "name": "Foodievo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech, SAAS",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://foodievo.com"
  },
  {
    "name": "Hosstec.com",
    "hosting": "Spaceship",
    "category": "Tech / Hosting",
    "price": "250",
    "businessType": "Business",
    "buyUrl": "https://hosstec.com"
  },
  {
    "name": "TakeRides.com",
    "hosting": "Spaceship",
    "category": "Fleet Automotive",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/TakeRides"
  },
  {
    "name": "Talabook.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, APP, Grocery",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/talabook.com"
  },
  {
    "name": "Escroy.com",
    "hosting": "UD",
    "category": "Escrow Pay",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/escroy.com"
  },
  {
    "name": "Finaprise.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/FinaPrise"
  },
  {
    "name": "Fruitla.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech, APP, Grocery",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://fruitla.com"
  },
  {
    "name": "Storezly.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://storezly.com"
  },
  {
    "name": "ZadAfrica.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "436",
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
    "buyUrl": "https://unstoppabledomains.com/d/nanymart.com"
  },
  {
    "name": "NixCash.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/NixCash"
  },
  {
    "name": "Paylita.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Paylita"
  },
  {
    "name": "Trancesend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/trancesend.com"
  },
  {
    "name": "Uniqranker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/uniqranker.com"
  },
  {
    "name": "Buyill.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://buyill.com"
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
    "buyUrl": "https://unstoppabledomains.com/d/estateschain.com"
  },
  {
    "name": "Marttogo.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/marttogo.com"
  },
  {
    "name": "Societygram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/societygram.com"
  },
  {
    "name": "Dealigi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://domains.atom.com/lpd/name/dealigi.com"
  },
  {
    "name": "Loadwhale.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Loadwhale"
  },
  {
    "name": "Bestofmart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "265",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/bestofmart.com"
  },
  {
    "name": "Autobases.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/autobases.com"
  },
  {
    "name": "Cardido.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Cardido"
  },
  {
    "name": "Cartdidi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cartdidi.com"
  },
  {
    "name": "Cloddi.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cloddi.com"
  },
  {
    "name": "Coinaxia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/coinaxia.com"
  },
  {
    "name": "CometCall.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/CometCall"
  },
  {
    "name": "ComZio.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/comzio.com"
  },
  {
    "name": "Coursaro.com",
    "hosting": "Spaceship",
    "category": "EdTech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://coursaro.com"
  },
  {
    "name": "Cryptemp.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://cryptemp.com"
  },
  {
    "name": "Dealago.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Dealago"
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
    "buyUrl": "https://unstoppabledomains.com/d/doscash.com"
  },
  {
    "name": "Ecardera.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://ecardera.com"
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
    "buyUrl": ""
  },
  {
    "name": "Enitsa.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://enitsa.com"
  },
  {
    "name": "Estatesa.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/estatesa.com"
  },
  {
    "name": "Fintekly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/fintekly.com"
  },
  {
    "name": "Folkgram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/folkgram.com"
  },
  {
    "name": "Giftbed.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/giftbed.com"
  },
  {
    "name": "Godemart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/godemart.com"
  },
  {
    "name": "InfiniteGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/infinitegram.com"
  },
  {
    "name": "InstaMackers.com",
    "hosting": "UD",
    "category": "Social Media",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/instamackers.com"
  },
  {
    "name": "Investue.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://investue.com"
  },
  {
    "name": "Jobagy.com",
    "hosting": "UD",
    "category": "Recurements, Freelancer, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/jobagy.com"
  },
  {
    "name": "Jobigy.com",
    "hosting": "UD",
    "category": "Recurements, Freelancer, SAAS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/jobigy.com"
  },
  {
    "name": "Justailawyer.com",
    "hosting": "UD",
    "category": "Legal",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/justailawyer.com"
  },
  {
    "name": "llmified.com",
    "hosting": "UD",
    "category": "LLM",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/LLMified"
  },
  {
    "name": "Loverlet.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/loverlet.com"
  },
  {
    "name": "Martome.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martome.com"
  },
  {
    "name": "Medianar.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/medianar.com"
  },
  {
    "name": "Mediationmarket.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/MediationMarket"
  },
  {
    "name": "OppaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/oppapay.com"
  },
  {
    "name": "Payleya.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payleya.com"
  },
  {
    "name": "Payoha.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payoha.com"
  },
  {
    "name": "Payort.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://payort.com"
  },
  {
    "name": "Rankingmart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/rankingmart.com"
  },
  {
    "name": "Reallt.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/reallt.com"
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
    "buyUrl": "https://unstoppabledomains.com/d/trillionchat.com"
  },
  {
    "name": "UniqranKing.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://uniqranking.com"
  },
  {
    "name": "Walletah.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/walletah.com"
  },
  {
    "name": "WhenSpend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/whenspend.com"
  },
  {
    "name": "Teeped.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "245",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/teeped.com"
  },
  {
    "name": "AlternativeClaw.com",
    "hosting": "UD",
    "category": "Niche / Hardware",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/alternativeclaw.com"
  },
  {
    "name": "AtlanticClaw.com",
    "hosting": "UD",
    "category": "Seafood / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/atlanticclaw.com"
  },
  {
    "name": "Cashzor.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cashzor.com"
  },
  {
    "name": "Ecardura.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/ecardura.com"
  },
  {
    "name": "MartGem.com",
    "hosting": "UD",
    "category": "Sport SAAS",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martgem.com"
  },
  {
    "name": "TechyClaw.com",
    "hosting": "UD",
    "category": "Tech / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/techyclaw.com"
  },
  {
    "name": "TodaysClaw.com",
    "hosting": "UD",
    "category": "Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/todaysclaw.com"
  },
  {
    "name": "Affivid.com",
    "hosting": "UD",
    "category": "Affiliate Video marketing",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/affivid.com"
  },
  {
    "name": "Automorize.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/automorize.com"
  },
  {
    "name": "BlocksValley.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/blocksvalley.com"
  },
  {
    "name": "Carthot.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "CitySpain.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cityspain.com"
  },
  {
    "name": "ClauGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/claugram.com"
  },
  {
    "name": "Dailymr.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/dailymr.com"
  },
  {
    "name": "Dealello.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/dealello.com"
  },
  {
    "name": "Existmatch.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/existmatch.com"
  },
  {
    "name": "GramChase.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramchase.com"
  },
  {
    "name": "Gramout.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramout.com"
  },
  {
    "name": "InfinitiMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://infinitimeta.com"
  },
  {
    "name": "InteMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://intemeta.com"
  },
  {
    "name": "Investicash.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Investicash"
  },
  {
    "name": "LandingKey.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/LandingKey"
  },
  {
    "name": "MallCanyon.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces - SAAS hub",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mallcanyon.com"
  },
  {
    "name": "Metachia.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://metachia.com"
  },
  {
    "name": "Mistonia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mistonia.com"
  },
  {
    "name": "Solivid.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://solivid.com"
  },
  {
    "name": "Storecho.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://storecho.com"
  },
  {
    "name": "Afinya.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Affliate",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/afinya.com"
  },
  {
    "name": "AppWebo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://appwebo.com"
  },
  {
    "name": "Assetmediator.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/AssetMediator"
  },
  {
    "name": "AssetMotive.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/assetmotive.com"
  },
  {
    "name": "Goidai.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/goidai.com"
  },
  {
    "name": "Grambond.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/grambond.com"
  },
  {
    "name": "Gramger.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/gramger.com"
  },
  {
    "name": "MartlyGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/martlygram.com"
  },
  {
    "name": "Mediomy.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/mediomy.com"
  },
  {
    "name": "Metanta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://metanta.com"
  },
  {
    "name": "Rewardial.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Rewardial"
  },
  {
    "name": "Socialautoposters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialautoposters.com"
  },
  {
    "name": "Socialsenders.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialsenders.com"
  },
  {
    "name": "VestaBrokers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/VestaBrokers"
  },
  {
    "name": "ChasesGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/chasesgram.com"
  },
  {
    "name": "Chatelly.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Chatelly"
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
    "buyUrl": "https://unstoppabledomains.com/d/ecanro.com"
  },
  {
    "name": "Paybrink.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/paybrink.com"
  },
  {
    "name": "Survimart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/survimart.com"
  },
  {
    "name": "Transacly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Transacly"
  },
  {
    "name": "VestaBroker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/vestabroker.com"
  },
  {
    "name": "XperaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/xperapay.com"
  },
  {
    "name": "ExemPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/exempay.com"
  },
  {
    "name": "ZohPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/zohpay.com"
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
    "buyUrl": "https://cryptinco.com"
  },
  {
    "name": "EasycheckPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/easycheckpay.com"
  },
  {
    "name": "Jumamart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/jumamart.com"
  },
  {
    "name": "Landgage.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/landgage.com"
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
    "buyUrl": "https://unstoppabledomains.com/d/linkliz.com"
  },
  {
    "name": "Mediadirect.uk",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Marketing",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://mediadirect.uk"
  },
  {
    "name": "Mentelic.com",
    "hosting": "UD",
    "category": "EdTech / Coaching",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Mentelic"
  },
  {
    "name": "MetaMany.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://metamany.com"
  },
  {
    "name": "Postsocialauto.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/postsocialauto.com"
  },
  {
    "name": "Sellerizer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/Sellerizer"
  },
  {
    "name": "Shopeter.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://shopeter.com"
  },
  {
    "name": "Socialautobest.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/socialautobest.com"
  },
  {
    "name": "Stremion.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Stream IPTV. TV",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/stremion.com"
  },
  {
    "name": "Tradoq.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/tradoq.com"
  },
  {
    "name": "Transationser.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/transationser.com"
  },
  {
    "name": "VisLif.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/vislif.com"
  },
  {
    "name": "XpanderPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/xpanderpay.com"
  },
  {
    "name": "ZonFood.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/zonfood.com"
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
    "buyUrl": "https://unstoppabledomains.com/d/365martly.com"
  },
  {
    "name": "Cartburn.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/cartburn.com"
  },
  {
    "name": "Cryptalyzes.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://cryptalyzes.com"
  },
  {
    "name": "Dealiar.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/dealiar.com"
  },
  {
    "name": "Drobito.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/drobito.com"
  },
  {
    "name": "Payerzy.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/payerzy.com"
  },
  {
    "name": "syrri.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - tool",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://unstoppabledomains.com/d/syrri.com"
  },
  {
    "name": "voucherdeck.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.atom.com/name/VoucherDeck"
  },
  {
    "name": "Kufya.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "499",
    "businessType": "Business",
    "buyUrl": "https://unstoppabledomains.com/d/kufya.com"
  },
  {
    "name": "Shortst.com",
    "hosting": "UD",
    "category": "SaaS / Links",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": ""
  },
];

export const domainsData: Domain[] = raw.map((d, i) => ({ id: i + 1, ...d }));

export const categories: string[] = Array.from(new Set(domainsData.map(d => d.category))).sort();
export const hostingProviders: string[] = Array.from(new Set(domainsData.map(d => d.hosting))).sort();
