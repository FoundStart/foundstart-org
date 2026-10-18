import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Building2 } from 'lucide-react';

const EgyptOnePersonCompanyEN = () => {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden" dir="ltr">
      <Helmet>
        <title>Establishing a One-Person Company in Egypt — The Complete 2026 Guide | FoundStart</title>
        <meta
          name="description"
          content="A comprehensive guide to establishing a one-person company in Egypt: required documents, incorporation stages at GAFI, real estate registration, commercial registry, and tax card."
        />
        <meta property="og:title" content="Establishing a One-Person Company in Egypt — The Complete Guide" />
        <link rel="canonical" href="https://www.foundstart.org/blog/egypt-one-person-company" />
      </Helmet>

      <Header />

      <PageHero
        title="Establishing a One-Person Company"
        highlight="in Egypt"
        subtitle="The practical step-by-step guide: documents, GAFI, real estate registration, commercial registry, and tax card."
      />

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
          <Badge variant="secondary"><Building2 className="w-3 h-3 mr-1" />Egypt</Badge>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />FoundStart Team</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />June 12, 2026</span>
          <span>10 min read</span>
        </div>

        <img src="/blog/covers/egypt-one-person-company-en.jpg" alt="egypt one person company" className="w-full rounded-xl shadow-lg mb-10 object-cover" loading="lazy" />

        <Card>
          <CardContent className="prose prose-invert max-w-none py-8 text-left leading-loose">
            <p>
              I am frequently asked about establishing companies in Egypt and obtaining commercial registries and tax cards. 
              Since this is my field of expertise, I would like to help those who are setting up their company for the first time.
            </p>

            <h2>The first type we will discuss: The One-Person Company</h2>
            <p>A one-person company is established within the <strong>General Authority for Investment (GAFI)</strong>, and its advantages include:</p>
            <ol>
              <li>Only one shareholder (owner).</li>
              <li>Financial liability is separate from its owner.</li>
              <li>You can appoint more than one manager.</li>
              <li>The minimum capital in the commercial registry is <strong>1,000 EGP</strong>.</li>
              <li>
                You must obtain a bank certificate for the capital mentioned in the commercial registry; after issuing the tax card 
                and commercial registry, you can withdraw the amount.
              </li>
              <li>Tax treatment: A single rate on net profit.</li>
            </ol>

            <h2>Required Documents</h2>
            <ol>
              <li>Copy of the owner's ID.</li>
              <li>Certificate of non-confusion (obtained from the Digital Egypt portal).</li>
              <li>Bank certificate confirming capital payment (refundable after incorporation).</li>
              <li>Acceptance of appointment from an auditor addressed to the company.</li>
              <li>Copy of the appeal lawyer's bar card (legal advisor to the company).</li>
              <li>Electronic signature for the person authorized to sign company contracts before GAFI.</li>
            </ol>

            <h2>Stage One — Application to GAFI</h2>
            <p>Upload all documents to the GAFI website, then proceed to the authority to complete the incorporation.</p>
            <p>In case of following up on the application electronically without visiting:</p>
            <ul>
              <li>Review of the application by the GAFI lawyer and creation of the articles of association.</li>
              <li>Issuance of the articles of association and sending them to the client to review the terms and data.</li>
              <li>Payment of fees electronically upon approval of the contract terms.</li>
              <li>Client signs the outputs using their electronic signature.</li>
              <li>Resending the application to GAFI after the client electronically signs the articles of association.</li>
            </ul>

            <h2>Stage Two — Real Estate Registration</h2>
            <ul>
              <li>Sending the real estate registration authentication report to the client for signature.</li>
              <li>Signing the real estate registration after the client signs the authentication report.</li>
            </ul>

            <h2>Stage Three — Application Follow-up</h2>
            <p>Follow up on the application until the status becomes <em>"Pending Chamber of Commerce"</em> or <em>"Pending Commercial Registry"</em>, 
              then head to GAFI to receive:</p>
            <ul>
              <li>The articles of association.</li>
              <li>The commercial registry application (containing the commercial registry number).</li>
            </ul>

            <h2>Stage Four — Tax Card</h2>
            <p>Head to the tax authority corresponding to your address to issue the tax card, after which your company is ready to operate officially.</p>

            <h2>Need help with incorporation?</h2>
            <p>
              The <strong>FoundStart</strong> team can handle these stages on your behalf, from preparing documents to receiving the commercial registry and tax card. 
              Contact us on WhatsApp: <a href="https://wa.me/201002905764">+20 100 290 5764</a>.
            </p>
          </CardContent>
        </Card>
      </article>

      <Footer />
    </div>
  );
};

export default EgyptOnePersonCompanyEN;
