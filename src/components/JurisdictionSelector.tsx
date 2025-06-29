
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ExternalLink, Globe, CreditCard, Phone, Smartphone, Users, Video, Code, ShoppingCart, Palette, BookOpen, BarChart, Mail, Search, Zap, Building } from 'lucide-react';

interface Partner {
  category: string;
  details: string;
  platform: string;
  url: string;
}

const JurisdictionSelector = () => {
  const digitalPartners: Partner[] = [
    // Company Formation
    { category: 'Company Formation', details: '(UK-USA-CA) company Establish', platform: 'Privatily', url: 'https://privatily.com/ref/Deeemoz/' },
    { category: 'Company Formation', details: 'UK company Establish', platform: 'Firstbase', url: 'https://firstbase.pxf.io/RGaDzX' },
    { category: 'Company Formation', details: 'UK company Establish', platform: '1stFormations', url: 'https://1st-formations-limited.sjv.io/4GKB30' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'ITIN', url: 'https://theitin.com/ref/80' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'Clemta', url: 'https://clemta.com/?ref=njbhzwf' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'Startglobal', url: 'http://startglobal.co/?via=mohamed-sayed' },
    
    // Telecommunications
    { category: 'Telecommunications', details: 'eSIM Telecommunication', platform: 'Bnesim', url: 'https://bnes.im/PHV3' },
    { category: 'Telecommunications', details: 'eSIM Telecommunication', platform: 'esim me', url: 'https://esim.me/esim-me-card-for-android?tracking=uNTexiT4sVLlxvvReENXMkAuUAMnyL60fRxBqMvmfSfUMUYCd6vNYXOsTKfmyWtB' },
    
    // Finance
    { category: 'Finance', details: 'Payment Gateway', platform: 'Stripe', url: 'https://stripe.com' },
    { category: 'Finance', details: 'USA Bank', platform: 'Mercury', url: 'https://mercury.com/r/deeemoz-llc' },
    { category: 'Finance', details: 'Bank/Wallet', platform: 'Wise', url: 'https://wise.com/invite/u/mohamedsayeda7' },
    { category: 'Finance', details: 'Virtual cards', platform: 'Redotpay', url: 'https://url.hk/i/en/q1xmy' },
    { category: 'Finance', details: 'Bank/Wallet', platform: 'Airtm', url: 'https://app.airtm.com/ivt/msa2023' },
    { category: 'Finance', details: 'Digital Wallet', platform: 'Payeer', url: 'https://payeer.com/?session=29670378' },
    { category: 'Finance', details: 'Bank/Wallet', platform: 'Novel bank', url: 'https://trynovel.com/?lmref=HaLvsA' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'Gate', url: 'https://www.gate.com/signup/BAJHU1EJ?ref_type=103' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'Binance', url: 'https://www.binance.com/referral/mystery-box/2025-pizza-day/claim?ref=GRO_16987_J6YH9' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'ByBit', url: 'https://www.bybit.com/invite?ref=NY47LOY' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'BingX', url: 'https://bingx.com/invite/WXBU1R/' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'Bitget', url: 'https://newshare.bwb.global/en/invite_earn_coin?inviteCode=nQXZQE' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'OKX', url: 'https://okx.com/join/98141578' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'KuCoin', url: 'https://www.kucoin.com/r/rf/QBSAE7HF' },
    { category: 'Finance', details: 'Crypto Wallet - Exchange P2P', platform: 'HTX', url: 'https://www.htx.com/invite/en-us/1f?invite_code=643gc223' },
    
    // Large Language Model
    { category: 'Large Language Model', details: 'Claude LLM', platform: 'Claude', url: 'https://claude.ai/referral/kOoRtNzkSg' },
    { category: 'Large Language Model', details: 'Manus LLMs', platform: 'Manus', url: 'https://manus.im/invitation/XDECAJVSG9VE' },
    
    // AI UGC
    { category: 'AI UGC', details: 'AI UGC + Arabic', platform: 'Creatify', url: 'https://creatify.ai/?via=momo' },
    { category: 'AI UGC', details: 'AI Reels', platform: 'Makereels', url: 'https://makereels.ai/?via=momo-sa' },
    { category: 'AI UGC', details: 'AI UGC', platform: 'Heygen', url: 'https:heygen.com' },
    { category: 'AI UGC', details: 'AI UGC + Arabic', platform: 'Topviews', url: 'https://www.topview.ai/' },
    { category: 'AI UGC', details: 'AI UGC', platform: 'Arcads', url: 'https://arcads.ai/?via=mohamed-sayed' },
    { category: 'AI UGC', details: 'AI UGC', platform: 'MakeUGCAI', url: 'https://www.makeugc.ai/?ref=mohamed' },
    { category: 'AI UGC', details: 'AI UGC', platform: 'Adcreative', url: 'https://free-trial.adcreative.ai/lqp6txbhnoa6' },
    { category: 'AI UGC', details: 'AI UGC', platform: 'Veed', url: 'https://veed.cello.so/PiYocZYTYQ1' },
    
    // Business Automation
    { category: 'Business Automation', details: 'Business Automation', platform: 'Pabbly', url: 'https://payments.pabbly.com/api/affurl/RVYZ07kQyUZ0Z1HUKZ1m/HyZ0KsMikOjASVp2p?target=b1BHyhSldo6RN1Fn' },
    { category: 'Business Automation', details: 'Build AI Agents Visually', platform: 'Flowise', url: 'https://cloud.flowiseai.com/register?via=momo' },
    { category: 'Business Automation', details: 'Automation Platform', platform: 'Axiom', url: 'https://axiom.ai/a?afmc=6k' },
    { category: 'Business Automation', details: 'Automation Platform', platform: 'Wiza', url: 'https://wiza.co/?via=deeemoz' },
    { category: 'Business Automation', details: 'Business Automation', platform: 'Phantombuster', url: 'https://phantombuster.com/?deal=mohamed80' },
    { category: 'Business Automation', details: 'Instagram grow real audiences', platform: 'FlockSocial', url: 'flocksocial.com/?ref=ntjkymu' },
    { category: 'Business Automation', details: 'Leads Generation', platform: 'Notifier SO', url: 'http://notifier.so/?via=mohamed' },
    { category: 'Business Automation', details: 'Repost SMM tool', platform: 'Repurpose', url: 'https://repurpose.io/?aff=87211' },
    { category: 'Business Automation', details: 'Social scheduling', platform: 'Postiz', url: 'https://postiz.com/?ref=mohamed' },
    { category: 'Business Automation', details: 'AI calling', platform: 'Closer AI', url: 'https://start.closerx.ai/home-9979?am_id=mohamed1262' },
    { category: 'Business Automation', details: 'Marketing Automation Platform', platform: 'GHL', url: 'https://www.gohighlevel.com/?fp_ref=deeemoz' },
    { category: 'Business Automation', details: 'Social scheduling', platform: 'Blotato', url: 'https://blotato.com/?ref=mohamedp5' },
    { category: 'Business Automation', details: 'HR Employee Tracking', platform: 'buddypunch', url: 'https://try.buddypunch.com/momo' },
    
    // AI Videos
    { category: 'AI Videos', details: 'AI Video ads', platform: 'Video Ad Vault', url: 'http://deeemoz.monsterrobot.zaxaa.com/s/3616643859792' },
    { category: 'AI Videos', details: 'Video Creation', platform: 'Syllabe', url: 'https://syllaby.io/?via=momo89' },
    { category: 'AI Videos', details: 'AI Video creation', platform: 'Fliki', url: 'https://fliki.ai/?via=mohamed-sayed' },
    { category: 'AI Videos', details: 'AI Video creation', platform: 'Pictory', url: 'https://pictory.ai/?ref=mohamed49' },
    { category: 'AI Videos', details: 'AI Video optimization tool', platform: 'VidIQ', url: 'https://vidiq.com/deeemoz' },
    { category: 'AI Videos', details: 'AI video repurposing platform', platform: 'Get Munch', url: 'https://www.getmunch.com/?utm_campaign=influencers&utm_medium=website&utm_source=rewardful&via=Deeemoz' },
    { category: 'AI Videos', details: 'AI Video long to short', platform: 'Vidyo AI', url: 'https://vidyo.ai?via=409w3' },
    { category: 'AI Videos', details: 'AI Video long to short', platform: 'Quso AI', url: 'https://quso.ai?via=409w3' },
    { category: 'AI Videos', details: 'AI videos', platform: 'Videogen', url: 'https://videogen.io?fpr=mohamed35' },
    { category: 'AI Videos', details: 'Video screen recording & Editing', platform: 'Awesomescreenshot', url: 'https://www.awesomescreenshot.com/workspace/invite/8ec75fbbc0305d8d0aa422d9d2a4276b' },
    
    // Mobile APP developments
    { category: 'Mobile APP developments', details: 'No Code AI-Full stack AI', platform: 'Lovable AI', url: 'https://lovable.dev/?via=momo' },
    { category: 'Mobile APP developments', details: 'No Code Apps builder', platform: 'Andromo', url: 'https://builder.andromo.com/?aaii=1591544.17f7e9' },
    { category: 'Mobile APP developments', details: 'No Code Apps builder', platform: 'Appsgeyser', url: 'https://appsgeyser.com/r/nfSXk' },
    { category: 'Mobile APP developments', details: 'No Code Apps builder', platform: 'FlutterFlow', url: 'https://app.flutterflow.io/create-account?referral_id=8bJB9qKgJkMDB1a9EBKgm4JjIS52' },
    { category: 'Mobile APP developments', details: 'Create Web,APP from Airtable& Sheets', platform: 'Softr', url: 'https://get.softr.io/bgiafdhexz82' },
    
    // Web developments
    { category: 'Web developments', details: 'Web domains , hosting & Emails', platform: 'Hostinger', url: 'https://hostinger.com/?REFERRALCODE=1MOHAMEDSA219' },
    { category: 'Web developments', details: 'RDP/VPS Servers', platform: 'Data base Mart', url: 'https://clients.databasemart.com/aff.php?aff=2007' },
    { category: 'Web developments', details: 'VPN', platform: 'ExpressVPN', url: 'https://www.expressrefer.com/refer-a-friend/30-days-free/?referrer_id=94486288&utm_campaign=refer_a_friend&utm_campaign=referrals&utm_medium=email&utm_source=customer_email' },
    
    // Digital marketplace
    { category: 'Digital marketplace', details: 'Digital Marketplace (Photos-Videos-Audio) Stock', platform: 'Photosdeposit', url: 'https://depositphotos.com/?ref=77717584&utm_source=linkCopy&utm_medium=referral' },
    { category: 'Digital marketplace', details: 'Digital marketplace APP-Web-Themes Source code', platform: 'Codester', url: 'https://www.codester.com/?ref=deeemoz' },
    { category: 'Digital marketplace', details: 'Digital marketplace APP-Web-Themes Source code', platform: 'Envato Market', url: 'https://1.envato.market/deeemoz2023' },
    { category: 'Digital marketplace', details: 'Business & marketing tools deals', platform: 'Appsumo', url: 'https://appsumo.8odi.net/k0JNXv' },
    
    // AI Tools
    { category: 'AI Tools', details: 'AI writing assistant', platform: 'Jasper', url: 'https://jasper.ai/?utm_source=partner&fpr=ai-money' },
    { category: 'AI Tools', details: 'AI writing assistant', platform: 'WordHero', url: 'https://wordhero.co/?via=deeemoz' },
    { category: 'AI Tools', details: 'AI writing assistant', platform: 'Writesonic', url: 'https://writesonic.com/?via=mohamed33' },
    { category: 'AI Tools', details: 'PDF AI chatbot', platform: 'ChatPDF', url: 'https://www.chatpdf.com/?via=mohamed-sayed' },
    
    // SEO tools - Traffic
    { category: 'SEO tools - Traffic', details: 'Backlink SEO', platform: 'SEO Store', url: 'https://panel.seoestore.net/?ref=Deeemoz' },
    { category: 'SEO tools - Traffic', details: 'SEO content', platform: 'SigmaSEO', url: 'https://sigmaseo.io/?ref=mohamed' },
    { category: 'SEO tools - Traffic', details: 'Website Traffic', platform: 'Babylon', url: 'https://www.babylontraffic.com/to/174607' },
    { category: 'SEO tools - Traffic', details: 'Website SEO', platform: 'Money Robot SEO SW', url: 'https://www.moneyrobot.com/Deeemoz' },
    { category: 'SEO tools - Traffic', details: 'SEO', platform: 'Mangools', url: 'https://mangools.com/#a64ce90b76aee08b3f68a3e67' },
    
    // Digital marketing tool
    { category: 'Digital marketing tool', details: 'CRM & Automation', platform: 'Zoho', url: 'directory.zoho.com/directory/deeemoz/adminhome#/getting-started' },
    { category: 'Digital marketing tool', details: 'Form & Survey creation', platform: 'Tally affiliate', url: 'https://tally.so/?ref=msa' },
    { category: 'Digital marketing tool', details: 'WorkFlow/Workspace', platform: 'Airtable', url: 'https://airtable.com/invite/r/KAoGUyC4' },
    { category: 'Digital marketing tool', details: 'Email Marketing', platform: 'ConvertKit', url: 'https://convertkit.com/' }
  ];

  const jurisdictionInfo = [
    {
      flag: '🇺🇸',
      name: 'United States',
      price: 'From $299',
      timeframe: '1-3 business days',
      benefits: [
        'Delaware LLC formation',
        'EIN number included',
        'Registered agent service',
        'Global business credibility',
        'Access to US banking',
        'Stripe integration ready'
      ]
    },
    {
      flag: '🇬🇧',
      name: 'United Kingdom',
      price: 'From £199',
      timeframe: '24-48 hours',
      benefits: [
        'Companies House registration',
        'UTR number application',
        'London business address',
        'EU market access',
        'Strong legal framework',
        'Fintech-friendly'
      ]
    },
    {
      flag: '🇨🇦',
      name: 'Canada',
      price: 'From CAD $399',
      timeframe: '2-5 business days',
      benefits: [
        'Federal incorporation',
        'Business number (BN)',
        'Toronto registered office',
        'USMCA trade benefits',
        'Stable banking system',
        'Innovation incentives'
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Company Formation':
        return Building;
      case 'Finance':
        return CreditCard;
      case 'Telecommunications':
        return Phone;
      case 'Large Language Model':
        return Zap;
      case 'AI UGC':
        return Video;
      case 'Business Automation':
        return BarChart;
      case 'AI Videos':
        return Video;
      case 'Mobile APP developments':
        return Smartphone;
      case 'Web developments':
        return Globe;
      case 'Digital marketplace':
        return ShoppingCart;
      case 'AI Tools':
        return Zap;
      case 'SEO tools - Traffic':
        return Search;
      case 'Digital marketing tool':
        return Mail;
      default:
        return Globe;
    }
  };

  const categories = Array.from(new Set(digitalPartners.map(p => p.category)));

  return (
    <section id="partner-links" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Option 1:</span> Quick Setup with Digital Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started immediately with our comprehensive network of 233+ digital partners. 
            Click any platform to begin your business setup process instantly.
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            233+ Trusted Partners Across 15+ Categories
          </Badge>
        </div>

        {/* Jurisdiction Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {jurisdictionInfo.map((jurisdiction, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="text-6xl mb-4">{jurisdiction.flag}</div>
                <CardTitle className="text-xl">{jurisdiction.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-2xl font-bold gradient-text">{jurisdiction.price}</div>
                  <div className="text-sm text-muted-foreground">{jurisdiction.timeframe}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {jurisdiction.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Digital Partners by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              {(() => {
                const Icon = getCategoryIcon(category);
                return <Icon className="w-6 h-6 text-primary mr-3" />;
              })()}
              <h3 className="text-2xl font-semibold gradient-text">{category}</h3>
              <Badge variant="secondary" className="ml-3">
                {digitalPartners.filter(p => p.category === category).length} Partners
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {digitalPartners
                .filter(partner => partner.category === category)
                .map((partner, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{partner.platform}</CardTitle>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{partner.details}</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full group" 
                        onClick={() => window.open(partner.url, '_blank')}
                      >
                        Visit {partner.platform}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">Comprehensive Partner Network</h4>
              <p className="text-muted-foreground mb-6">
                From company formation to marketing automation, our partners cover every aspect 
                of building and scaling your business across multiple jurisdictions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="outline">✓ Instant Access</Badge>
                <Badge variant="outline">✓ Verified Partners</Badge>
                <Badge variant="outline">✓ Global Coverage</Badge>
                <Badge variant="outline">✓ Specialized Tools</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JurisdictionSelector;
