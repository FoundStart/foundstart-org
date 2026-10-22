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
    "buyUrl": ""
  },
  {
    "name": "Expensol.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Keepence.com",
    "hosting": "UD",
    "category": "Fintech, SAAS",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Exitsme.com",
    "hosting": "UD",
    "category": "Startup / M&A",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "Halalye.com",
    "hosting": "Spaceship",
    "category": "Food / Lifestyle",
    "price": "400",
    "businessType": "Business",
    "buyUrl": "https://halalye.com"
  },
  {
    "name": "NameLik.com",
    "hosting": "UD",
    "category": "Branding",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
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
    "buyUrl": "https://affillex.com"
  },
  {
    "name": "MoMoMob.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "MoMoNil.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "400",
    "businessType": "Business",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": "https://careeroh.com"
  },
  {
    "name": "Deeemoz.shop",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "150",
    "businessType": "Business",
    "buyUrl": "https://deeemoz.shop"
  },
  {
    "name": "Dropoh.com",
    "hosting": "UD",
    "category": "E-Commerce / Dropshipping",
    "price": "500",
    "businessType": "Business",
    "buyUrl": ""
  },
  {
    "name": "FoundVC.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://foundvc.com"
  },
  {
    "name": "Freelinance.com",
    "hosting": "UD",
    "category": "Freelance / Gig Economy",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Agitli.com",
    "hosting": "UD",
    "category": "Business",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": "https://foodievo.com"
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
    "buyUrl": ""
  },
  {
    "name": "Talabook.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, APP, Grocery",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "NixCash.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Paylita.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Trancesend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Uniqranker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Marttogo.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Societygram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Dealigi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Loadwhale.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Cloddi.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "450",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Coinaxia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "CometCall.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "ComZio.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Fintekly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Folkgram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Giftbed.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Godemart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "InfiniteGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "InstaMackers.com",
    "hosting": "UD",
    "category": "Social Media",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "llmified.com",
    "hosting": "UD",
    "category": "LLM",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Loverlet.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Martome.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Medianar.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Mediationmarket.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "OppaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Payleya.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Payoha.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "WhenSpend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Teeped.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "245",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Cashzor.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Ecardura.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "MartGem.com",
    "hosting": "UD",
    "category": "Sport SAAS",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "TechyClaw.com",
    "hosting": "UD",
    "category": "Tech / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "TodaysClaw.com",
    "hosting": "UD",
    "category": "Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Affivid.com",
    "hosting": "UD",
    "category": "Affiliate Video marketing",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Automorize.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "BlocksValley.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "ClauGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Existmatch.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "GramChase.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Gramout.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "LandingKey.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "MallCanyon.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces - SAAS hub",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "AppWebo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://appwebo.com"
  },
  {
    "name": "Assetmediator.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "AssetMotive.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Goidai.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Grambond.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Gramger.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "MartlyGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Mediomy.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
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
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Socialautoposters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Socialsenders.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "VestaBrokers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "ChasesGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Chatelly.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Survimart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Transacly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "VestaBroker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "XperaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "MetaMany.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://metamany.com"
  },
  {
    "name": "Postsocialauto.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Social media services",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Sellerizer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Shopeter.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://shopeter.com"
  },
  {
    "name": "Socialautobest.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "VisLif.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "XpanderPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "ZonFood.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
  },
  {
    "name": "Cryptalyzes.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://cryptalyzes.com"
  },
  {
    "name": "Dealiar.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Drobito.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SAAS",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
  },
  {
    "name": "Payerzy.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": ""
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
    "buyUrl": ""
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
