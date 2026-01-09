import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, Sparkles, Shield, Zap, ArrowLeft, Server, Building2, Briefcase, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Domain {
  name: string;
  category: string;
  hosting: string;
  godaddyUrl: string;
}

const domainsData: Domain[] = [
  { name: 'Affillex.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Affillex.com' },
  { name: 'Afinya.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Afinya.com' },
  { name: 'AppWebo.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=AppWebo.com' },
  { name: 'AssetMotive.com', category: 'Finance & Assets', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=AssetMotive.com' },
  { name: 'Assetsium.com', category: 'Finance & Assets', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Assetsium.com' },
  { name: 'Autobases.com', category: 'Automotive', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Autobases.com' },
  { name: 'BekoMart.com', category: 'E-Commerce & Marketplaces', hosting: 'Namebright', godaddyUrl: 'https://www.dropcatch.com/domain/bekomart.com' },
  { name: 'Buyill.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Buyill.com' },
  { name: 'Caisho.com', category: 'Brandable', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Caisho.com' },
  { name: 'Cardido.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cardido.com' },
  { name: 'CarDolla.com', category: 'Fintech, E-commerce, Automotive', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CarDolla.com' },
  { name: 'Careeroh.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Careeroh.com' },
  { name: 'Cartdidi.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cartdidi.com' },
  { name: 'Cartgy.com', category: 'Fintech, E-commerce, Automotive', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cartgy.com' },
  { name: 'Carthot.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=carthot.com' },
  { name: 'Cashzor.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cashzor.com' },
  { name: 'ChasesGram.com', category: 'Social & Media', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ChasesGram.com' },
  { name: 'Chatelly.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=chatelly.com' },
  { name: 'CitySpain.com', category: 'Travel & Regional', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CitySpain.com' },
  { name: 'ClauGram.com', category: 'Social & Media', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ClauGram.com' },
  { name: 'ClotheCart.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ClotheCart.com' },
  { name: 'Codestia.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Codestia.com' },
  { name: 'CoinsLite.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CoinsLite.com' },
  { name: 'CometCall.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CometCall.com' },
  { name: 'ComZio.com', category: 'Brandable', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ComZio.com' },
  { name: 'Coursaro.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Coursaro.com' },
  { name: 'Creativoya.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Creativoya.com' },
  { name: 'Cryptalyzes.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptalyzes.com' },
  { name: 'Cryptemp.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptemp.com' },
  { name: 'Cryptinco.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptinco.com' },
  { name: 'Dealago.com', category: 'E-Commerce & Marketplaces, SAAS', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Dealago.com' },
  { name: 'Dealello.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Dealello.com' },
  { name: 'Dealiar.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Dealiar.com' },
  { name: 'Dealigi.com', category: 'E-Commerce & Marketplaces, SAAS', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=dealigi.com' },
  { name: 'Deeemoz.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.com' },
  { name: 'Deeemoz.fun', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=deeemoz.fun' },
  { name: 'Deeemoz.shop', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.shop' },
  { name: 'Diroh.com', category: 'Brandable', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Diroh.com' },
  { name: 'Dropoh.com', category: 'E-Commerce', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Dropoh.com' },
  { name: 'Easycheckpay.com', category: 'Fintech, Payments', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Easycheckpay.com' },
  { name: 'Ecardera.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ecardera.com' },
  { name: 'Ecardura.com', category: 'Fintech, Payments', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Ecardura.com' },
  { name: 'Emboxer.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Emboxer.com' },
  { name: 'Enitsa.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Enitsa.com' },
  { name: 'Estatesa.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=estatesa.com' },
  { name: 'EstatesChain.com', category: 'Real Estate & Blockchain', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=EstatesChain.com' },
  { name: 'Etivago.com', category: 'Startups, SaaS & Travel', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Etivago.com' },
  { name: 'Existmatch.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Existmatch.com' },
  { name: 'Exitsme.com', category: 'Startups, SaaS, RealEstate, Gov', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=exitsme.com' },
  { name: 'Exitsmena.com', category: 'Startups, SaaS, Regional', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Exitsmena.com' },
  { name: 'Expensol.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Expensol.com' },
  { name: 'Finaprise.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Finaprise.com' },
  { name: 'Fintekly.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=fintekly.com' },
  { name: 'Flowmotic.com', category: 'AI, Automation, Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=flowmotic.com' },
  { name: 'Foodievo.com', category: 'Startups, SaaS & Tech, SAAS', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Foodievo.com' },
  { name: 'Foundstart.org', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Foundstart.org' },
  { name: 'FoundVC.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=FoundVC.com' },
  { name: 'Fruitla.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Fruitla.com' },
  { name: 'Giftbed.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Giftbed.com' },
  { name: 'Goldenstoreseg.com', category: 'E-Commerce & Marketplaces', hosting: 'Hostinger', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=goldenstoreseg.com' },
  { name: 'Gramger.com', category: 'Social & Media', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Gramger.com' },
  { name: 'Gramout.com', category: 'Social & Media', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Gramout.com' },
  { name: 'Halalye.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Halalye.com' },
  { name: 'Heykeyword.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Heykeyword.com' },
  { name: 'Hosstec.com', category: 'SAAS & Hosting', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Hosstec.com' },
  { name: 'Investicash.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Investicash.com' },
  { name: 'Investue.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=investue.com' },
  { name: 'Jobagy.com', category: 'Recruitments, Freelancer, SAAS', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=jobagy.com' },
  { name: 'Jobigy.com', category: 'Recruitments, Freelancer, SAAS', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=jobigy.com' },
  { name: 'Justailawyer.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Justailawyer.com' },
  { name: 'Keepence.com', category: 'Fintech, SAAS', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=keepence.com' },
  { name: 'Loadwhale.com', category: 'Logistics & Shipping', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Loadwhale.com' },
  { name: 'MartlyGram.com', category: 'E-Commerce & Social', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=MartlyGram.com' },
  { name: 'Martome.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Martome.com' },
  { name: 'Medianar.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=medianar.com' },
  { name: 'Mediationmarket.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Mediationmarket.com' },
  { name: 'MetaMany.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=MetaMany.com' },
  { name: 'MoMoMob.com', category: 'Fintech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=momomob.com' },
  { name: 'MSA-serv.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=msa-serv.com' },
  { name: 'Namelizer.com', category: 'Startups, SaaS & Tech', hosting: 'Godaddy', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Namelizer.com' },
  { name: 'Nanymart.com', category: 'Startups, SaaS & Tech, Nanny marketplace', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=nanymart.com' },
  { name: 'NixCash.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=NixCash.com' },
  { name: 'Oppapay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Oppapay.com' },
  { name: 'Paylita.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Paylita.com' },
  { name: 'Payoha.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=payoha.com' },
  { name: 'Payort.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Payort.com' },
  { name: 'Sellerizer.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Sellerizer.com' },
  { name: 'Shofic.com', category: 'E-Commerce & Marketplaces', hosting: 'Godaddy', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shofic.com' },
  { name: 'Shopeter.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shopeter.com' },
  { name: 'Shortet.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shortet.com' },
  { name: 'Shortili.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shortili.com' },
  { name: 'Shortoo.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shortoo.com' },
  { name: 'Socialautoposters.com', category: 'Social & Automation', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Socialautoposters.com' },
  { name: 'Sociallaters.com', category: 'Social & Media', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Sociallaters.com' },
  { name: 'Societygram.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Societygram.com' },
  { name: 'Solivid.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Solivid.com' },
  { name: 'Storecho.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Storecho.com' },
  { name: 'Storezly.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Storezly.com' },
  { name: 'TakeRides.com', category: 'Fleet Automotive', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=TakeRides.com' },
  { name: 'Talaboo.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Talaboo.com' },
  { name: 'Talabook.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=talabook.com' },
  { name: 'Teeped.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Teeped.com' },
  { name: 'Topypay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=topypay.com' },
  { name: 'Tradoq.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Tradoq.com' },
  { name: 'Trancesend.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=trancesend.com' },
  { name: 'Transacly.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Transacly.com' },
  { name: 'Transactionizer.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Transactionizer.com' },
  { name: 'UniqranKing.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=UniqranKing.com' },
  { name: 'VestaBroker.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Vestabroker.com' },
  { name: 'WhenSpend.com', category: 'Startups, SaaS & Tech', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=whenspend.com' },
  { name: 'YesShoot.com', category: 'Media & Photography', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=YesShoot.com' },
  { name: 'ZadAfrica.com', category: 'Regional & Africa', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ZadAfrica.com' },
  { name: 'ZohPay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=zohpay.com' },
  { name: 'ZonFood.com', category: 'Startups, SaaS & Tech, Food', hosting: 'UD', godaddyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Zonfood.com' },
];

const categories = [
  { name: 'All', icon: Globe },
  { name: 'Startups, SaaS & Tech', icon: Sparkles },
  { name: 'E-Commerce & Marketplaces', icon: Building2 },
  { name: 'Fintech, Payments & Crypto', icon: Shield },
  { name: 'Venture, Community & Brands', icon: Zap },
  { name: 'Automotive', icon: Truck },
  { name: 'Other', icon: Briefcase },
];

const getHostingColor = (hosting: string) => {
  const colors: Record<string, string> = {
    'Spaceship': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'UD': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Hostinger': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    'Godaddy': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'Namebright': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  };
  return colors[hosting] || 'bg-muted text-muted-foreground';
};

const getCategoryColor = (category: string) => {
  if (category.includes('Fintech') || category.includes('Crypto') || category.includes('Payments')) {
    return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
  }
  if (category.includes('E-Commerce') || category.includes('Marketplaces')) {
    return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
  }
  if (category.includes('SaaS') || category.includes('Tech') || category.includes('Startups')) {
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
  }
  if (category.includes('Venture') || category.includes('Brands')) {
    return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
  }
  return 'bg-muted text-muted-foreground';
};

const Domains = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredDomains = domainsData.filter(d => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Other' 
        ? !['Startups, SaaS & Tech', 'E-Commerce & Marketplaces', 'Fintech, Payments & Crypto', 'Venture, Community & Brands', 'Automotive'].some(cat => d.category.includes(cat.split(',')[0]))
        : d.category.includes(selectedCategory.split(',')[0]));
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24 lg:pb-8">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-[1400px]">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="outline" asChild size="sm">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              <Badge className="mb-4 animate-pulse-slow">🔥 {domainsData.length}+ Premium Domains Available</Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Premium Domains <span className="gradient-text">For Sale</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                Brand-ready, short & scalable domains perfect for startups, SaaS platforms, fintech, 
                e-commerce, AI projects, crypto, marketplaces, and global brands.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-6">
              <input
                type="text"
                placeholder="Search domains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                    className="text-xs sm:text-sm whitespace-nowrap"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              Showing {filteredDomains.length} of {domainsData.length} domains
            </p>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredDomains.map((domain, index) => (
                <Card 
                  key={domain.name} 
                  className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-base sm:text-lg font-bold">
                        {domain.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getHostingColor(domain.hosting)}`}
                        >
                          <Server className="w-3 h-3 mr-1" />
                          {domain.hosting}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge 
                      variant="outline" 
                      className={`mb-3 sm:mb-4 text-xs ${getCategoryColor(domain.category)}`}
                    >
                      {domain.category.length > 30 ? domain.category.slice(0, 30) + '...' : domain.category}
                    </Badge>
                    <Button 
                      asChild 
                      className="w-full group-hover:bg-primary/90 text-sm sm:text-base"
                      size="sm"
                    >
                      <a 
                        href={domain.godaddyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Details
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why Buy Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-center">Why Buy From Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">✔️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Premium Hand-Picked</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Carefully curated domain names</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🚀</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Fast & Secure Transfer</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Quick ownership transfer process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">💰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Clear Pricing</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Transparent pricing via registrars</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Perfect for Startups</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Ideal for rebrands and new launches</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🔐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Trusted Registrars</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Spaceship, GoDaddy, Hostinger, UD</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">📩</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Bundle Deals</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Contact us for multi-domain discounts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Domains;
