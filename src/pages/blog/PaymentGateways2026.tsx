import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Sparkles, CreditCard } from 'lucide-react';
import heroImg from '@/assets/blog-payment-gateways-2026.jpg';
import { withUtm } from '@/utils/utm';

const CAMPAIGN = 'payment-gateways-2026';
const tag = (url: string, content: string) =>
  withUtm(url, { source: 'blog', medium: 'inline', campaign: CAMPAIGN, content });

const TITLE = 'Best Payment Gateways in 2026: Stripe, Paddle, Chargebee, Airwallex, Deel & More';
const DESCRIPTION =
  'The MoMoAI 2026 guide to the best payment gateways and billing platforms for SaaS, subscriptions, marketplaces, digital products and global payouts \u2014 Stripe, Paddle, Chargebee, Airwallex, Deel, Tipalti, Polar, Dodo, Freemius and Zift.';

type Gateway = {
  name: string;
  category: string;
  description: string;
  url: string;
  best: string;
};

const GATEWAYS: Gateway[] = [
  { name: 'Stripe', category: 'Card processing / SaaS', description: 'The default payment infrastructure for online businesses \u2014 cards, subscriptions, connect, invoicing.', url: 'https://stripe.com', best: 'US LLC / UK Ltd SaaS & marketplaces' },
  { name: 'Paddle', category: 'Merchant of Record', description: 'Merchant of Record for SaaS \u2014 handles global tax (VAT/GST) and compliance for you.', url: 'https://paddle.com', best: 'SaaS selling globally without a US/EU entity' },
  { name: 'Chargebee', category: 'Subscription Billing', description: 'Subscription billing & revenue management on top of Stripe/Braintree/Adyen.', url: 'https://www.chargebee.com/', best: 'Recurring SaaS with complex plans, trials & dunning' },
  { name: 'Airwallex', category: 'Global Payments & FX', description: 'Global multi-currency accounts, cards, FX & payment gateway.', url: 'https://Airwallex.com/', best: 'International e-commerce & platforms' },
  { name: 'Freemius', category: 'Merchant of Record', description: 'Merchant of Record specialized for WordPress plugins, themes and digital products.', url: 'https://freemius.com/', best: 'WordPress plugin & theme sellers' },
  { name: 'Deel', category: 'Payroll & Contractor Payouts', description: 'Compliant hiring, payroll & mass payouts to contractors in 150+ countries.', url: 'https://www.deel.com/', best: 'Paying remote teams & freelancers globally' },
  { name: 'Tipalti', category: 'Accounts Payable Automation', description: 'Automated global mass-payouts, supplier onboarding & tax compliance.', url: 'https://tipalti.com/', best: 'Marketplaces & affiliate/creator payouts at scale' },
  { name: 'Dodo Payments', category: 'Merchant of Record', description: 'Modern MoR for digital products, SaaS and one-time sales with instant global checkout.', url: 'https://dodopayments.com/', best: 'Indie SaaS & digital product founders' },
  { name: 'Polar', category: 'Merchant of Record (Devs)', description: 'Payments & subscriptions built for developers and open-source products.', url: 'https://polar.sh', best: 'Developer tools, open-source, sponsorware' },
  { name: 'Zift', category: 'Payments Platform', description: 'Payments platform for ISVs \u2014 embed processing, split payments & payouts.', url: 'https://zift.io/', best: 'ISVs embedding payments into vertical SaaS' },
  { name: 'Lemon Squeezy', category: 'Merchant of Record', description: 'MoR for SaaS, digital products & subscriptions \u2014 handles VAT/GST globally.', url: 'https://www.lemonsqueezy.com/', best: 'Solo founders selling digital goods' },
  { name: 'PayPal', category: 'Card & Wallet', description: 'Global wallet + card processor \u2014 highest trust for cross-border consumer checkout.', url: 'https://www.paypal.com/', best: 'Consumer & cross-border e-commerce' },
  { name: 'Wise Business', category: 'Multi-Currency Payouts', description: 'Multi-currency accounts & low-fee international transfers.', url: 'https://wise.com/business', best: 'Freelancers & agencies receiving global payments' },
  { name: 'Adyen', category: 'Enterprise Processor', description: 'Unified global payments platform for enterprise merchants.', url: 'https://www.adyen.com/', best: 'Enterprise & omnichannel retail' },
  { name: 'Mollie', category: 'European Processor', description: 'European-first payment processor with local methods (iDEAL, Bancontact, SEPA).', url: 'https://www.mollie.com/', best: 'EU e-commerce with local payment methods' },
  { name: 'Razorpay', category: 'India-First Processor', description: 'Payments, payouts and neobanking for Indian businesses.', url: 'https://razorpay.com/', best: 'India-registered companies' },
  { name: 'Kashier', category: 'MENA Processor', description: 'Payment gateway for Egypt & MENA \u2014 cards, wallets, installments.', url: 'https://kashier.io/', best: 'Egypt/MENA merchants' },
  { name: 'Paymob', category: 'MENA Processor', description: 'Payment orchestration across Egypt, GCC and Africa.', url: 'https://paymob.com/', best: 'MENA & Africa e-commerce' },
];

const PaymentGateways2026: React.FC = () => {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    image: [heroImg],
    datePublished: '2026-06-29',
    author: { '@type': 'Organization', name: 'MoMoAI' },
    publisher: { '@type': 'Organization', name: 'FoundStart' },
    mainEntityOfPage: 'https://foundstart.org/blog/payment-gateways-2026',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is a Merchant of Record (MoR) and do I need one?', acceptedAnswer: { '@type': 'Answer', text: 'A MoR (Paddle, Lemon Squeezy, Dodo, Polar, Freemius) is the legal seller of your product to end customers, so it collects and remits global VAT/GST/sales tax for you. If you sell SaaS or digital products globally without a US/EU entity, an MoR removes most tax compliance overhead.' } },
      { '@type': 'Question', name: 'Stripe vs Paddle \u2014 which is better in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Stripe is cheaper and more flexible if you can handle tax compliance yourself (usually via a US LLC or UK Ltd). Paddle is worth the higher fee if you want zero tax overhead and global VAT/GST handled out of the box.' } },
      { '@type': 'Question', name: 'What is the best gateway for paying remote freelancers?', acceptedAnswer: { '@type': 'Answer', text: 'Deel and Tipalti are the leaders for compliant global payroll and mass contractor payouts. Wise Business is the cheapest self-serve option for smaller teams.' } },
    ],
  };

  const Gw: React.FC<{ p: Gateway }> = ({ p }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base">{p.name}</h4>
          <Badge variant="secondary" className="text-xs">{p.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <p className="text-xs"><span className="font-semibold">Best for:</span> {p.best}</p>
        <Button asChild size="sm">
          <a href={tag(p.url, p.name)} target="_blank" rel="noopener noreferrer sponsored">
            Visit <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{TITLE} | FoundStart Blog</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="keywords" content="payment gateway 2026, Stripe, Paddle, Chargebee, Airwallex, Deel, Tipalti, Dodo Payments, Polar, Freemius, Zift, Lemon Squeezy, Adyen, Mollie, Razorpay, Kashier, Paymob, merchant of record" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={heroImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://foundstart.org/blog/payment-gateways-2026" />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Link>
            <Badge className="mb-3"><Sparkles className="w-3 h-3 mr-1" /> Payments</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-muted-foreground mb-6">{DESCRIPTION}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-1.5" /> MoMoAI</span>
              <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Jun 29, 2026</span>
              <span className="inline-flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 13 min read</span>
            </div>
            <img src={heroImg} alt="Payment gateways comparison 2026" width={1536} height={896} className="w-full rounded-xl border shadow-lg mb-10" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Picking the right payment gateway in 2026 is a two-question decision: <strong>where is your legal entity</strong>,
                and <strong>how much tax compliance do you want to own</strong>? This MoMoAI guide maps 18 gateways to those two axes
                so you can pick in minutes.
              </p>

              <h2><CreditCard className="inline w-6 h-6 mr-2" />SaaS & Subscription Billing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /SaaS|Subscription|Merchant of Record/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>Global Payments, FX & Enterprise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /Global|Enterprise|Multi-Currency|European|Wallet|Payments Platform/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>Payouts, Payroll & Regional Processors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {GATEWAYS.filter((g) => /Payroll|Payouts|India|MENA/i.test(g.category)).map((g) => <Gw key={g.name} p={g} />)}
              </div>

              <h2>The MoMoAI Payments Stack</h2>
              <ul>
                <li><strong>US LLC / UK Ltd SaaS:</strong> Stripe + Chargebee for billing complexity.</li>
                <li><strong>Global SaaS without an entity:</strong> Paddle or Lemon Squeezy (MoR).</li>
                <li><strong>Indie / digital products:</strong> Dodo Payments or Polar.</li>
                <li><strong>Cross-border FX & multi-currency:</strong> Airwallex + Wise Business.</li>
                <li><strong>Paying contractors globally:</strong> Deel or Tipalti.</li>
                <li><strong>MENA merchants:</strong> Kashier or Paymob.</li>
              </ul>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PaymentGateways2026;