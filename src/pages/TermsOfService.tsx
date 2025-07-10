
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const TermsOfService = () => {
  const { isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`max-w-4xl mx-auto ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              Last updated: January 10, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using FoundStart's services, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="mb-4">
                FoundStart provides business formation services, banking setup assistance, digital partner connections, 
                and related business services. We reserve the right to modify or discontinue services at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="mb-4">Users agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p className="mb-4">
                Payment for services is due upon ordering unless otherwise specified. We reserve the right to refuse 
                service for non-payment. Refunds are subject to our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                FoundStart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive 
                property of FoundStart and its licensors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be interpreted and governed by the laws of the United States, without regard to 
                conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="mb-4">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <p className="mb-2">Email: legal@foundstart.com</p>
              <p className="mb-2">Address: FoundStart LLC, Business Formation Services</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
