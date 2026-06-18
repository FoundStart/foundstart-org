export interface Domain {
  id: number;
  name: string;
  hosting: 'UD' | 'Spaceship' | 'Godaddy' | 'Hostinger' | 'Namebright';
  category: string;
  price?: string;
  businessType?: 'Business' | 'Domain';
  buyUrl?: string;
}

const raw: Domain[] = [
  {
    "name": "Exitsme.com",
    "hosting": "UD",
    "category": "Grocery / Delivery",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Exitsme.com"
  },
  {
    "name": "Halalye.com",
    "hosting": "Spaceship",
    "category": "HR / Job Board",
    "price": "5000",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Halalye.com"
  },
  {
    "name": "Foundstart.org",
    "hosting": "Spaceship",
    "category": "Startup / Venture",
    "price": "4999",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.org/en-in/domainsearch/find?domainToCheck=Foundstart.org"
  },
  {
    "name": "Heykeyword.com",
    "hosting": "Spaceship",
    "category": "SEO / Marketing",
    "price": "4999",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Heykeyword.com"
  },
  {
    "name": "Shortet.com",
    "hosting": "Spaceship",
    "category": "SaaS / Links",
    "price": "2500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Shortet.com"
  },
  {
    "name": "Expensol.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "1500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Expensol.com"
  },
  {
    "name": "NameLik.com",
    "hosting": "UD",
    "category": "B2B / Services",
    "price": "1500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=NameLik.com"
  },
  {
    "name": "Tafsirly.com",
    "hosting": "UD",
    "category": "Religious / Islamic",
    "price": "1500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Tafsirly.com"
  },
  {
    "name": "Affillex.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Affillex.com"
  },
  {
    "name": "Keepence.com",
    "hosting": "UD",
    "category": "Fintech, SaaS",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Keepence.com"
  },
  {
    "name": "MoMoMob.com",
    "hosting": "UD",
    "category": "Startup / M&A",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=MoMoMob.com"
  },
  {
    "name": "MoMoNil.com",
    "hosting": "UD",
    "category": "Food / Lifestyle",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=MoMoNil.com"
  },
  {
    "name": "Namelizer.com",
    "hosting": "Godaddy",
    "category": "SaaS / Branding",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Namelizer.com"
  },
  {
    "name": "TopyPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=TopyPay.com"
  },
  {
    "name": "Uniqranks.com",
    "hosting": "UD",
    "category": "SaaS / SEO",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Uniqranks.com"
  },
  {
    "name": "YesShoot.com",
    "hosting": "UD",
    "category": "Travel / SaaS",
    "price": "1250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=YesShoot.com"
  },
  {
    "name": "Talaboo.com",
    "hosting": "UD",
    "category": "Branding",
    "price": "1151",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Talaboo.com"
  },
  {
    "name": "Cartgy.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Cartgy.com"
  },
  {
    "name": "Etivago.com",
    "hosting": "Spaceship",
    "category": "E-Commerce / Dropshipping",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Etivago.com"
  },
  {
    "name": "Shortili.com",
    "hosting": "Spaceship",
    "category": "SaaS / Links",
    "price": "450",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Shortili.com"
  },
  {
    "name": "Cardolla.com",
    "hosting": "Spaceship",
    "category": "Affiliate Marketing",
    "price": "350",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Cardolla.com"
  },
  {
    "name": "MSA-serv.com",
    "hosting": "Hostinger",
    "category": "Fintech / Asset Management",
    "price": "350",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=MSA-serv.com"
  },
  {
    "name": "Assetsium.com",
    "hosting": "UD",
    "category": "Fintech / E-Commerce / Automotive",
    "price": "250",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Assetsium.com"
  },
  {
    "name": "Careeroh.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Careeroh.com"
  },
  {
    "name": "Creativoya.com",
    "hosting": "Spaceship",
    "category": "SaaS / Creative",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Creativoya.com"
  },
  {
    "name": "Deeemoz.shop",
    "hosting": "Spaceship",
    "category": "Photography / Gaming",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.shop/en-in/domainsearch/find?domainToCheck=Deeemoz.shop"
  },
  {
    "name": "Dropoh.com",
    "hosting": "UD",
    "category": "Mobile / Fintech",
    "price": "500",
    "businessType": "Business",
    "buyUrl": "https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=Dropoh.com"
  },
  {
    "name": "FoundVC.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=FoundVC.com"
  },
  {
    "name": "Freelinance.com",
    "hosting": "UD",
    "category": "Freelance / Gig Economy",
    "price": "2500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Freelinance.com"
  },
  {
    "name": "Agitli.com",
    "hosting": "UD",
    "category": "",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Agitli.com"
  },
  {
    "name": "Exitsmena.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Exitsmena.com"
  },
  {
    "name": "Foodievo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Foodievo.com"
  },
  {
    "name": "Hosstec.com",
    "hosting": "Spaceship",
    "category": "Tech / Hosting",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Hosstec.com"
  },
  {
    "name": "TakeRides.com",
    "hosting": "Spaceship",
    "category": "Fleet Automotive",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=TakeRides.com"
  },
  {
    "name": "Talabook.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Grocery",
    "price": "500",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Talabook.com"
  },
  {
    "name": "Codestia.com",
    "hosting": "Spaceship",
    "category": "SaaS / Tech",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Codestia.com"
  },
  {
    "name": "Escroy.com",
    "hosting": "UD",
    "category": "Escrow Pay",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Escroy.com"
  },
  {
    "name": "Finaprise.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Finaprise.com"
  },
  {
    "name": "Fruitla.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech, Grocery",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Fruitla.com"
  },
  {
    "name": "Storezly.com",
    "hosting": "Spaceship",
    "category": "E-Commerce",
    "price": "499",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Storezly.com"
  },
  {
    "name": "ZadAfrica.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "436",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ZadAfrica.com"
  },
  {
    "name": "Emboxer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Emboxer.com"
  },
  {
    "name": "Nanymart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Nanny Marketplace",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Nanymart.com"
  },
  {
    "name": "NixCash.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=NixCash.com"
  },
  {
    "name": "Paylita.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Paylita.com"
  },
  {
    "name": "Trancesend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Trancesend.com"
  },
  {
    "name": "Uniqranker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "400",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Uniqranker.com"
  },
  {
    "name": "Buyill.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Buyill.com"
  },
  {
    "name": "Clothecart.com",
    "hosting": "Spaceship",
    "category": "POD-E-Commerce/Fashion",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Clothecart.com"
  },
  {
    "name": "CoinsLite.com",
    "hosting": "Spaceship",
    "category": "Crypto / Fintech",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=CoinsLite.com"
  },
  {
    "name": "EstatesChain.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=EstatesChain.com"
  },
  {
    "name": "Marttogo.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Marttogo.com"
  },
  {
    "name": "Societygram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "350",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Societygram.com"
  },
  {
    "name": "Dealigi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SaaS",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Dealigi.com"
  },
  {
    "name": "Loadwhale.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "300",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Loadwhale.com"
  },
  {
    "name": "Bestofmart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "265",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Bestofmart.com"
  },
  {
    "name": "Autobases.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Autobases.com"
  },
  {
    "name": "Caisho.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Caisho.com"
  },
  {
    "name": "Cardido.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cardido.com"
  },
  {
    "name": "Cartdidi.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cartdidi.com"
  },
  {
    "name": "Cloddi.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cloddi.com"
  },
  {
    "name": "Coinaxia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Coinaxia.com"
  },
  {
    "name": "CometCall.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=CometCall.com"
  },
  {
    "name": "ComZio.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ComZio.com"
  },
  {
    "name": "Coursaro.com",
    "hosting": "Spaceship",
    "category": "EdTech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Coursaro.com"
  },
  {
    "name": "Cryptemp.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cryptemp.com"
  },
  {
    "name": "Dealago.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SaaS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Dealago.com"
  },
  {
    "name": "Diroh.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Diroh.com"
  },
  {
    "name": "Domianity.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Domianity.com"
  },
  {
    "name": "Doscash.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "$250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Doscash.com"
  },
  {
    "name": "Ecardera.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Ecardera.com"
  },
  {
    "name": "Ecardora.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SaaS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Ecardora.com"
  },
  {
    "name": "Emotorsmarket.com",
    "hosting": "UD",
    "category": "Fintech-E-Commerce & Marketplaces / SaaS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com /en-ai/domainsearch/find?domainToCheck=Emotorsmarket.com"
  },
  {
    "name": "Enitsa.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Enitsa.com"
  },
  {
    "name": "Estatesa.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Estatesa.com"
  },
  {
    "name": "Fintekly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Fintekly.com"
  },
  {
    "name": "Flowmotic.com",
    "hosting": "UD",
    "category": "AI, Automation, Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Flowmotic.com"
  },
  {
    "name": "Folkgram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Folkgram.com"
  },
  {
    "name": "Giftbed.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Giftbed.com"
  },
  {
    "name": "Godemart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Godemart.com"
  },
  {
    "name": "InfiniteGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=InfiniteGram.com"
  },
  {
    "name": "InstaMackers.com",
    "hosting": "UD",
    "category": "Social Media",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=InstaMackers.com"
  },
  {
    "name": "Investue.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Investue.com"
  },
  {
    "name": "Jobagy.com",
    "hosting": "UD",
    "category": "Recruitments, Freelancer, SaaS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Jobagy.com"
  },
  {
    "name": "Jobigy.com",
    "hosting": "UD",
    "category": "Recruitments, Freelancer, SaaS",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Jobigy.com"
  },
  {
    "name": "Justailawyer.com",
    "hosting": "UD",
    "category": "Legal",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Justailawyer.com"
  },
  {
    "name": "llmified.com",
    "hosting": "UD",
    "category": "LLM",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=llmified.com"
  },
  {
    "name": "Loverlet.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Loverlet.com"
  },
  {
    "name": "Martome.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Martome.com"
  },
  {
    "name": "Medianar.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Medianar.com"
  },
  {
    "name": "Mediationmarket.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Mediationmarket.com"
  },
  {
    "name": "OppaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=OppaPay.com"
  },
  {
    "name": "Payleya.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Payleya.com"
  },
  {
    "name": "Payoha.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Payoha.com"
  },
  {
    "name": "Payort.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Payort.com"
  },
  {
    "name": "Rankingmart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Rankingmart.com"
  },
  {
    "name": "Reallt.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Reallt.com"
  },
  {
    "name": "Shofic.com",
    "hosting": "Godaddy",
    "category": "E-Commerce & Marketplaces",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Shofic.com"
  },
  {
    "name": "Shortoo.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Shortoo.com"
  },
  {
    "name": "Sociallaters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Sociallaters.com"
  },
  {
    "name": "Toolstogethers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Toolstogethers.com"
  },
  {
    "name": "Trillionchat.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Trillionchat.com"
  },
  {
    "name": "UniqranKing.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=UniqranKing.com"
  },
  {
    "name": "Walletah.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Walletah.com"
  },
  {
    "name": "WhenSpend.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "250",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=WhenSpend.com"
  },
  {
    "name": "Teeped.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "245",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Teeped.com"
  },
  {
    "name": "AlternativeClaw.com",
    "hosting": "UD",
    "category": "Niche / Hardware",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=AlternativeClaw.com"
  },
  {
    "name": "AtlanticClaw.com",
    "hosting": "UD",
    "category": "Seafood / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=AtlanticClaw.com"
  },
  {
    "name": "Cashzor.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cashzor.com"
  },
  {
    "name": "Ecardura.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Ecardura.com"
  },
  {
    "name": "MartGem.com",
    "hosting": "UD",
    "category": "Sport SaaS",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=MartGem.com"
  },
  {
    "name": "TechyClaw.com",
    "hosting": "UD",
    "category": "Tech / Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=TechyClaw.com"
  },
  {
    "name": "TodaysClaw.com",
    "hosting": "UD",
    "category": "Niche",
    "price": "200",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=TodaysClaw.com"
  },
  {
    "name": "Affivid.com",
    "hosting": "UD",
    "category": "Affiliate Video Marketing",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Affivid.com"
  },
  {
    "name": "Automorize.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Automorize.com"
  },
  {
    "name": "BlocksValley.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=BlocksValley.com"
  },
  {
    "name": "Carthot.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Carthot.com"
  },
  {
    "name": "CitySpain.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=CitySpain.com"
  },
  {
    "name": "ClauGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ClauGram.com"
  },
  {
    "name": "Dailymr.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Dailymr.com"
  },
  {
    "name": "Dealello.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Dealello.com"
  },
  {
    "name": "Existmatch.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Existmatch.com"
  },
  {
    "name": "GramChase.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=GramChase.com"
  },
  {
    "name": "Gramout.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Gramout.com"
  },
  {
    "name": "InfinitiMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=InfinitiMeta.com"
  },
  {
    "name": "InteMeta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=InteMeta.com"
  },
  {
    "name": "Investicash.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Investicash.com"
  },
  {
    "name": "LandingKey.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=LandingKey.com"
  },
  {
    "name": "MallCanyon.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SaaS Hub",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=MallCanyon.com"
  },
  {
    "name": "Metachia.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Metachia.com"
  },
  {
    "name": "Mistonia.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Mistonia.com"
  },
  {
    "name": "Solivid.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Solivid.com"
  },
  {
    "name": "Storecho.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "150",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Storecho.com"
  },
  {
    "name": "Afinya.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Affiliate",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Afinya.com"
  },
  {
    "name": "AppWebo.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=AppWebo.com"
  },
  {
    "name": "Assetmediator.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Assetmediator.com"
  },
  {
    "name": "AssetMotive.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=AssetMotive.com"
  },
  {
    "name": "Goidai.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Goidai.com"
  },
  {
    "name": "Grambond.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Grambond.com"
  },
  {
    "name": "Gramger.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Gramger.com"
  },
  {
    "name": "MartlyGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=MartlyGram.com"
  },
  {
    "name": "Mediomy.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Mediomy.com"
  },
  {
    "name": "Metanta.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Metanta.com"
  },
  {
    "name": "Rewardial.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Rewardial.com"
  },
  {
    "name": "Socialautoposters.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Socialautoposters.com"
  },
  {
    "name": "Socialsenders.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Socialsenders.com"
  },
  {
    "name": "VestaBrokers.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "100",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=VestaBrokers.com"
  },
  {
    "name": "ChasesGram.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ChasesGram.com"
  },
  {
    "name": "Chatelly.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Chatelly.com"
  },
  {
    "name": "Ecanio.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SaaS",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Ecanio.com"
  },
  {
    "name": "Ecanro.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces / SaaS",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Ecanro.com"
  },
  {
    "name": "Paybrink.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Paybrink.com"
  },
  {
    "name": "Survimart.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Survimart.com"
  },
  {
    "name": "Transacly.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Transacly.com"
  },
  {
    "name": "VestaBroker.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=VestaBroker.com"
  },
  {
    "name": "XperaPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "99",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=XperaPay.com"
  },
  {
    "name": "ExemPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "75",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ExemPay.com"
  },
  {
    "name": "ZohPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "75",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ZohPay.com"
  },
  {
    "name": "BekoMart.com",
    "hosting": "Namebright",
    "category": "E-Commerce & Marketplaces",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=BekoMart.com"
  },
  {
    "name": "Cryptinco.com",
    "hosting": "Spaceship",
    "category": "Fintech, Payments & Crypto",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cryptinco.com"
  },
  {
    "name": "EasycheckPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=EasycheckPay.com"
  },
  {
    "name": "Jumamart.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Jumamart.com"
  },
  {
    "name": "Landgage.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Landgage.com"
  },
  {
    "name": "Laterssocial.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Laterssocial.com"
  },
  {
    "name": "Linkliz.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Linkliz.com"
  },
  {
    "name": "Mediadirect.uk",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Marketing",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.uk/en-ai/domainsearch/find?domainToCheck=Mediadirect.uk"
  },
  {
    "name": "Mentelic.com",
    "hosting": "UD",
    "category": "EdTech / Coaching",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Mentelic.com"
  },
  {
    "name": "MetaMany.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=MetaMany.com"
  },
  {
    "name": "Postsocialauto.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Postsocialauto.com"
  },
  {
    "name": "Sellerizer.com",
    "hosting": "Spaceship",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Sellerizer.com"
  },
  {
    "name": "Shopeter.com",
    "hosting": "Spaceship",
    "category": "E-Commerce & Marketplaces",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Shopeter.com"
  },
  {
    "name": "Socialautobest.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Socialautobest.com"
  },
  {
    "name": "Stremion.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, IPTV",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Stremion.com"
  },
  {
    "name": "Tradoq.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Tradoq.com"
  },
  {
    "name": "Transationser.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Transationser.com"
  },
  {
    "name": "VisLif.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=VisLif.com"
  },
  {
    "name": "XpanderPay.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=XpanderPay.com"
  },
  {
    "name": "ZonFood.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech, Food",
    "price": "59",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=ZonFood.com"
  },
  {
    "name": "365crypt.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=365crypt.com"
  },
  {
    "name": "365martly.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=365martly.com"
  },
  {
    "name": "Cartburn.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cartburn.com"
  },
  {
    "name": "Cryptalyzes.com",
    "hosting": "Spaceship",
    "category": "Venture, Community & Brands",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Cryptalyzes.com"
  },
  {
    "name": "Dealiar.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SaaS",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Dealiar.com"
  },
  {
    "name": "Drobito.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces, SaaS",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Drobito.com"
  },
  {
    "name": "Payerzy.com",
    "hosting": "UD",
    "category": "Fintech, Payments & Crypto",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=Payerzy.com"
  },
  {
    "name": "syrri.com",
    "hosting": "UD",
    "category": "Startups, SaaS & Tech - Tool",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=syrri.com"
  },
  {
    "name": "voucherdeck.com",
    "hosting": "UD",
    "category": "E-Commerce & Marketplaces",
    "price": "50",
    "businessType": "Domain",
    "buyUrl": "https://www.godaddy.com/en-ai/domainsearch/find?domainToCheck=voucherdeck.com"
  }
];

export const domainsData: Domain[] = raw.map((d, i) => ({ ...d, id: i + 1 }));

export const categories = [
  'All',
  'Fintech, Payments & Crypto',
  'E-Commerce & Marketplaces',
  'Startups, SaaS & Tech',
  'Venture, Community & Brands',
  'Recruitments, Freelancer',
  'AI & Automation',
  'Food & Grocery',
  'Automotive',
  'Sport',
  'Marketing',
  'SAAS & Hosting',
  'Legal',
  'Travel',
  'EdTech',
  'Branding',
  'Social Media',
  'Mobile / Fintech',
];

export const hostingProviders = ['All', 'UD', 'Spaceship', 'Godaddy', 'Hostinger', 'Namebright'];

export const businessTypes = ['All', 'Business', 'Domain'];
