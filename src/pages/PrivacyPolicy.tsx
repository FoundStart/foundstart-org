
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const PrivacyPolicy = () => {
  const { isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`max-w-4xl mx-auto ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              Last updated: January 10, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                At FoundStart, we collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal information (name, email address, phone number)</li>
                <li>Business information (company name, industry, formation details)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and the safety of our users</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-2">Email: privacy@foundstart.com</p>
              <p className="mb-2">Address: FoundStart LLC, Business Formation Services</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
