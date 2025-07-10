
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const CookiePolicy = () => {
  const { isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`max-w-4xl mx-auto ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              Last updated: January 10, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">FoundStart uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to provide relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                <p className="mb-4">
                  These cookies are necessary for the website to function and cannot be switched off in our systems. 
                  They are usually only set in response to actions made by you.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                <p className="mb-4">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the 
                  performance of our site.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
                <p className="mb-4">
                  These cookies enable the website to provide enhanced functionality and personalization, 
                  such as remembering your language preference.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Targeting Cookies</h3>
                <p className="mb-4">
                  These cookies may be set through our site by our advertising partners to build a profile of 
                  your interests and show you relevant ads.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">
                We may use third-party services that also set cookies on your device. These include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for sharing functionality</li>
                <li>Payment processors for secure transactions</li>
                <li>Advertising networks for targeted advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
              <p className="mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Browser settings: Most browsers allow you to block or delete cookies</li>
                <li>Cookie preferences: Use our cookie consent banner to manage preferences</li>
                <li>Opt-out tools: Use third-party opt-out tools for advertising cookies</li>
              </ul>
              <p className="mb-4">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookie Retention</h2>
              <p className="mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain until expiry date or manual deletion</li>
                <li><strong>First-party Cookies:</strong> Set directly by our website</li>
                <li><strong>Third-party Cookies:</strong> Set by external services we use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us at:
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

export default CookiePolicy;
