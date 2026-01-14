import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, Sparkles, Shield, Zap, ArrowLeft, Server, Building2, Briefcase, Truck, MessageCircle, Mail, DollarSign, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';

interface Domain {
  name: string;
  category: string;
  hosting: string;
  price: number;
  businessType: 'Business' | 'Domain';
  buyUrl: string;
}

const domainsData: Domain[] = [
  // Premium domains ($11.99)
  { name: 'Namelizer.com', category: 'Startups, SaaS & Tech', hosting: 'Godaddy', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Namelizer.com' },
  { name: 'Shofic.com', category: 'E-Commerce & Marketplaces', hosting: 'Godaddy', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shofic.com' },
  { name: 'Deeemoz.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.com' },
  { name: 'Deeemoz.fun', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=deeemoz.fun' },
  { name: 'Goldenstoreseg.com', category: 'E-Commerce & Marketplaces', hosting: 'Hostinger', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=goldenstoreseg.com' },
  { name: 'MSA-serv.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=msa-serv.com' },
  { name: 'BekoMart.com', category: 'E-Commerce & Marketplaces', hosting: 'Namebright', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.dropcatch.com/domain/bekomart.com' },
  { name: 'AppWebo.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=AppWebo.com' },
  { name: 'Buyill.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Buyill.com' },
  { name: 'CarDolla.com', category: 'Fintech - E-commerce-Automotive', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CarDolla.com' },
  { name: 'Careeroh.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Careeroh.com' },
  { name: 'Cartgy.com', category: 'Fintech - E-commerce-Automotive', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cartgy.com' },
  { name: 'ClotheCart.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ClotheCart.com' },
  { name: 'Codestia.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Codestia.com' },
  { name: 'CoinsLite.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CoinsLite.com' },
  { name: 'CometCall.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=CometCall.com' },
  { name: 'Coursaro.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Coursaro.com' },
  { name: 'Creativoya.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Creativoya.com' },
  { name: 'Cryptalyzes.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptalyzes.com' },
  { name: 'Cryptemp.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptemp.com' },
  { name: 'Cryptinco.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cryptinco.com' },
  { name: 'Deeemoz.shop', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.shop' },
  { name: 'Ecardera.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=ecardera.com' },
  { name: 'Emboxer.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Emboxer.com' },
  { name: 'Enitsa.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Enitsa.com' },
  { name: 'Etivago.com', category: 'Startups, SaaS & Travel', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Etivago.com' },
  { name: 'Expensol.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Expensol.com' },
  { name: 'Finaprise.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Finaprise.com' },
  { name: 'Foodievo.com', category: 'Startups, SaaS & Tech, SAAS', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Foodievo.com' },
  { name: 'Foundstart.org', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Foundstart.org' },
  { name: 'FoundVC.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=FoundVC.com' },
  { name: 'Fruitla.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Fruitla.com' },
  { name: 'Halalye.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Halalye.com' },
  { name: 'Heykeyword.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Heykeyword.com' },
  { name: 'Hosstec.com', category: 'SAAS & Hosting', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Hosstec.com' },
  { name: 'InfinitiMeta.com', category: 'Meta & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: '' },
  { name: 'InteMeta.com', category: 'Meta & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Investue.com', category: 'Venture, Community & Brands', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=investue.com' },
  { name: 'Metachia.com', category: 'Meta & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: '' },
  { name: 'MetaMany.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=MetaMany.com' },
  { name: 'Metanta.com', category: 'Meta & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: '' },
  { name: 'NixCash.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=NixCash.com' },
  { name: 'Paylita.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Paylita.com' },
  { name: 'Payort.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Payort.com' },
  { name: 'Sellerizer.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Sellerizer.com' },
  { name: 'Shopeter.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shopeter.com' },
  { name: 'Shortet.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shortet.com' },
  { name: 'Shortili.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shortili.com' },
  { name: 'Solivid.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Solivid.com' },
  { name: 'Storecho.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Storecho.com' },
  { name: 'Storezly.com', category: 'E-Commerce & Marketplaces', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Storezly.com' },
  { name: 'TakeRides.com', category: 'Fleet Automotive', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=TakeRides.com' },
  { name: 'UniqranKing.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=UniqranKing.com' },
  
  // Standard domains ($5.99)
  { name: '365crypt.com', category: 'Fintech & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: '365martly.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Affillex.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', price: 5.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Affillex.com' },
  { name: 'Afinya.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Afinya.com' },
  { name: 'Assetmediator.com', category: 'Finance & Assets', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'AssetMotive.com', category: 'Finance & Assets', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Assetsium.com', category: 'Finance & Assets', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Autobases.com', category: 'Automotive', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Automorize.com', category: 'Automotive', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'BlocksValley.com', category: 'Fintech & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Caisho.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Cardido.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cardido.com' },
  { name: 'Cartdidi.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Cartdidi.com' },
  { name: 'Carthot.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=carthot.com' },
  { name: 'Cashzor.com', category: 'Fintech & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'ChasesGram.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Chatelly.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=chatelly.com' },
  { name: 'CitySpain.com', category: 'Travel & Regional', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'ClauGram.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Cloddi.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Coinaxia.com', category: 'Fintech & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'ComZio.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Dailymr.com', category: 'Media & News', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Dealago.com', category: 'E-Commerce & Marketplaces, SAAS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Dealago.com' },
  { name: 'Dealello.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Dealiar.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Dealigi.com', category: 'E-Commerce & Marketplaces, SAAS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=dealigi.com' },
  { name: 'Diroh.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Doscash.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Drobito.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Dropoh.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Easycheckpay.com', category: 'Fintech, Payments', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Ecanso.com', category: 'Brandable', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Ecardura.com', category: 'Fintech, Payments', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Estatesa.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=estatesa.com' },
  { name: 'EstatesChain.com', category: 'Real Estate & Blockchain', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Existmatch.com', category: 'Startups, SaaS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Exitsme.com', category: 'Startups, SaaS, RealEstate, Gov', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=exitsme.com' },
  { name: 'Exitsmena.com', category: 'Startups, SaaS, Regional', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Fintekly.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=fintekly.com' },
  { name: 'Flowmotic.com', category: 'AI, Automation, Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=flowmotic.com' },
  { name: 'Folkgram.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Giftbed.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Giftbed.com' },
  { name: 'Goidai.com', category: 'AI & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'GramChase.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Gramger.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Gramout.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'InfiniteGram.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'InstaMackers.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Business', buyUrl: '' },
  { name: 'Investicash.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Investicash.com' },
  { name: 'Jobagy.com', category: 'Recruitments, Freelancer, SAAS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=jobagy.com' },
  { name: 'Jobigy.com', category: 'Recruitments, Freelancer, SAAS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=jobigy.com' },
  { name: 'Justailawyer.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Justailawyer.com' },
  { name: 'Keepence.com', category: 'Fintech, SAAS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=keepence.com' },
  { name: 'LandingKey.com', category: 'Startups, SaaS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Loadwhale.com', category: 'Logistics & Shipping', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Loverlet.com', category: 'Lifestyle', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'MallCanyon.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'MartGem.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'MartlyGram.com', category: 'E-Commerce & Social', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Martome.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Medianar.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=medianar.com' },
  { name: 'Mediationmarket.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Mediationmarket.com' },
  { name: 'Mediomy.com', category: 'Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'MoMoMob.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=momomob.com' },
  { name: 'MoMoNil.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'namelik.com', category: 'Startups, SaaS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Nanymart.com', category: 'Startups, SaaS & Tech, Nanny marketplace', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=nanymart.com' },
  { name: 'Oppapay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Oppapay.com' },
  { name: 'Payoha.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=payoha.com' },
  { name: 'Postsocialauto.com', category: 'Social Automation', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'rankingmart.com', category: 'E-Commerce & SEO', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Reallt.com', category: 'Real Estate', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Shortoo.com', category: 'Startups, SaaS', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Socialautoposters.com', category: 'Social Automation', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Sociallaters.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Socialsenders.com', category: 'Social & Media', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Societygram.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Societygram.com' },
  { name: 'Survimart.com', category: 'E-Commerce', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Talaboo.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Talaboo.com' },
  { name: 'Talabook.com', category: 'Startups, SaaS & Tech, APP, Grocery', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=talabook.com' },
  { name: 'Teeped.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Teeped.com' },
  { name: 'Topypay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=topypay.com' },
  { name: 'Tradoq.com', category: 'E-Commerce & Marketplaces', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Tradoq.com' },
  { name: 'Trancesend.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=trancesend.com' },
  { name: 'Transacly.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Transacly.com' },
  { name: 'Transactionizer.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Transactionizer.com' },
  { name: 'Trillionchat.com', category: 'AI & Chat', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Uniqranks.com', category: 'SEO & Marketing', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'VestaBroker.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Vestabroker.com' },
  { name: 'VestaBrokers.com', category: 'Finance & Brokerage', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'VisLif.com', category: 'Lifestyle', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'Walletah.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'WhenSpend.com', category: 'Startups, SaaS & Tech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=whenspend.com' },
  { name: 'Xpanderpay.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'XperaPay.com', category: 'Fintech', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'YesShoot.com', category: 'Media & Photography', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'ZadAfrica.com', category: 'Regional & Africa', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: '' },
  { name: 'ZohPay.com', category: 'Fintech, Payments & Crypto', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=zohpay.com' },
  { name: 'ZonFood.com', category: 'Startups, SaaS & Tech, Food', hosting: 'UD', price: 5.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Zonfood.com' },
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

const getBusinessTypeColor = (type: string) => {
  if (type === 'Business') {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  }
  return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
};

const Domains = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceFilter, setPriceFilter] = React.useState<'all' | 'premium' | 'standard'>('all');
  const { favorites, toggleFavorite, isFavorite } = useDomainFavorites();
  
  const filteredDomains = domainsData.filter(d => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Other' 
        ? !['Startups, SaaS & Tech', 'E-Commerce & Marketplaces', 'Fintech, Payments & Crypto', 'Venture, Community & Brands', 'Automotive'].some(cat => d.category.includes(cat.split(',')[0]))
        : d.category.includes(selectedCategory.split(',')[0]));
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'premium' && d.price === 11.99) ||
      (priceFilter === 'standard' && d.price === 5.99);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const whatsappLink = "https://wa.me/21002905764";
  const emailLink = "mailto:momo@foundstart.org";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24 lg:pb-8">
        {/* Hero Section */}
        <section className="py-6 sm:py-10 lg:py-14 px-3 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Back Button & Wishlist */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" asChild size="sm">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild size="sm" className="relative">
                <Link to="/domain-wishlist">
                  <Heart className={`w-4 h-4 mr-2 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  Wishlist
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>

            <div className="text-center mb-6 sm:mb-10">
              <Badge className="mb-3 sm:mb-4 animate-pulse-slow">🔥 {domainsData.length}+ Premium Domains Available</Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 px-2">
                Premium Domains <span className="gradient-text">For Sale</span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-3xl mx-auto px-2">
                Brand-ready, short & scalable domains perfect for startups, SaaS platforms, fintech, 
                e-commerce, AI projects, crypto, marketplaces, and global brands.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>WhatsApp: +21002905764</span>
              </a>
              <a 
                href={emailLink}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>momo@foundstart.org</span>
              </a>
            </div>

            {/* Search & Filters */}
            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
              </div>

              {/* Price Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={priceFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('all')}
                  className="text-xs sm:text-sm"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  All Prices
                </Button>
                <Button
                  variant={priceFilter === 'premium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('premium')}
                  className="text-xs sm:text-sm"
                >
                  Premium ($11.99)
                </Button>
                <Button
                  variant={priceFilter === 'standard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('standard')}
                  className="text-xs sm:text-sm"
                >
                  Standard ($5.99)
                </Button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 px-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                    className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap px-2 sm:px-3"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden xs:inline sm:inline">{cat.name}</span>
                    <span className="xs:hidden sm:hidden">{cat.name.split(',')[0].substring(0, 8)}...</span>
                  </Button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              Showing {filteredDomains.length} of {domainsData.length} domains
            </p>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {filteredDomains.map((domain, index) => (
                <Card 
                  key={domain.name} 
                  className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm sm:text-base lg:text-lg font-bold truncate">
                          {domain.name}
                        </CardTitle>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => toggleFavorite(domain.name)}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                          </Button>
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm font-bold">
                            ${domain.price}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] sm:text-xs ${getHostingColor(domain.hosting)}`}
                        >
                          <Server className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          {domain.hosting}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] sm:text-xs ${getBusinessTypeColor(domain.businessType)}`}
                        >
                          {domain.businessType}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-3 sm:p-4">
                    <Badge 
                      variant="outline" 
                      className={`mb-2 sm:mb-3 text-[10px] sm:text-xs ${getCategoryColor(domain.category)}`}
                    >
                      {domain.category.length > 25 ? domain.category.slice(0, 25) + '...' : domain.category}
                    </Badge>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        asChild 
                        className="w-full group-hover:bg-primary/90 text-xs sm:text-sm"
                        size="sm"
                      >
                        <Link to={`/domain-inquiry?domain=${domain.name}`}>
                          <ShoppingCart className="w-3 h-3 mr-1.5" />
                          Inquire Now
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          asChild 
                          variant="outline"
                          className="flex-1 text-xs sm:text-sm bg-green-500/5 hover:bg-green-500/10 border-green-500/20"
                          size="sm"
                        >
                          <a 
                            href={whatsappLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="w-3 h-3 mr-1 text-green-600" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                        </Button>
                        <Button 
                          asChild 
                          variant="outline"
                          className="flex-1 text-xs sm:text-sm bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20"
                          size="sm"
                        >
                          <a href={emailLink}>
                            <Mail className="w-3 h-3 mr-1 text-blue-600" />
                            <span className="hidden sm:inline">Email</span>
                          </a>
                        </Button>
                        {domain.buyUrl && (
                          <Button 
                            asChild 
                            variant="outline"
                            className="flex-1 text-xs sm:text-sm"
                            size="sm"
                          >
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why Buy Section */}
            <section className="mt-10 sm:mt-14 lg:mt-18">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">Why Buy From Us?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">✔️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Premium Hand-Picked</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Carefully curated domain names</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">🚀</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Fast & Secure Transfer</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Quick ownership transfer process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">💰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Clear Pricing</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">$5.99 - $11.99 per domain</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Perfect for Startups</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Ideal for rebrands and new launches</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">🔐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Trusted Registrars</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Spaceship, GoDaddy, Hostinger, UD</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl">📩</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm lg:text-base">Bundle Deals</h4>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Contact us for multi-domain discounts</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact CTA */}
                  <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Ready to buy? Contact us now!</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                      <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp Us
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <a href={emailLink}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email Us
                        </a>
                      </Button>
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
