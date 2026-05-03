import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

import Index from "./pages/Index";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import Auth from "./pages/Auth";
import DigitalPartners from "./pages/DigitalPartners";
import FreelancerPartners from "./pages/FreelancerPartners";
import SisterPartners from "./pages/SisterPartners";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PremiumDomainsBlog from "./pages/blog/PremiumDomainsBlog";
import PremiumDomainsShowcaseBlog from "./pages/blog/PremiumDomainsShowcaseBlog";
import LLCFormationGuideBlog from "./pages/blog/LLCFormationGuideBlog";
import UKvsUSFormationBlog from "./pages/blog/UKvsUSFormationBlog";
import AgencyFormationBlog from "./pages/blog/AgencyFormationBlog";
import MoMoAIBusinessSetupEN from "./pages/blog/MoMoAIBusinessSetupEN";
import MoMoAIBusinessSetupAR from "./pages/blog/MoMoAIBusinessSetupAR";
import Press from "./pages/Press";
import Media from "./pages/Media";
import Tutorials from "./pages/Tutorials";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import SEOManagement from "./pages/SEOManagement";
import ContactSales from "./pages/ContactSales";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import WhoWeAre from "./pages/WhoWeAre";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import DigitalNomadVisas from "./pages/DigitalNomadVisas";
import Domains from "./pages/Domains";
import DomainInquiry from "./pages/DomainInquiry";
import DomainWishlist from "./pages/DomainWishlist";
import BulkDomainInquiry from "./pages/BulkDomainInquiry";
import CustomerDashboard from "./pages/saas/CustomerDashboard";
import AdminDashboard from "./pages/saas/AdminDashboard";
import PricingCalculator from "./pages/PricingCalculator";
import FAQ from "./pages/FAQ";
import AllPartners from "./pages/AllPartners";
import ResetPassword from "./pages/ResetPassword";
import PartnerTrackingTest from "./pages/admin/PartnerTrackingTest";
import AIChatBot from "./components/AIChatBot";
import MobileBottomNav from "./components/mobile/MobileBottomNav";
import "./App.css";

const queryClient = new QueryClient();

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TranslationProvider>
          <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/country/:countryId" element={<CountryPage />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/all-partners" element={<AllPartners />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/pricing-calculator" element={<PricingCalculator />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/digital-partners" element={<DigitalPartners />} />
                  <Route path="/freelancer-partners" element={<FreelancerPartners />} />
                  <Route path="/sister-partners" element={<SisterPartners />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/digital-nomad-guide" element={<BlogPost />} />
                  <Route path="/blog/premium-domains-for-sale" element={<PremiumDomainsBlog />} />
                  <Route path="/blog/premium-domains-showcase" element={<PremiumDomainsShowcaseBlog />} />
                  <Route path="/blog/llc-formation-guide" element={<LLCFormationGuideBlog />} />
                  <Route path="/blog/uk-vs-us-company-formation" element={<UKvsUSFormationBlog />} />
                  <Route path="/blog/momoai-business-setup-guide-en" element={<MoMoAIBusinessSetupEN />} />
                  <Route path="/blog/momoai-business-setup-guide-ar" element={<MoMoAIBusinessSetupAR />} />
                  <Route path="/blog/:slug" element={<AgencyFormationBlog />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
                  <Route path="/seo-management" element={<SEOManagement />} />
                  <Route path="/contact-sales" element={<ContactSales />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/who-we-are" element={<WhoWeAre />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/digital-nomad-visas" element={<DigitalNomadVisas />} />
                  <Route path="/domains" element={<Domains />} />
                  <Route path="/domain-inquiry" element={<DomainInquiry />} />
                  <Route path="/domain-wishlist" element={<DomainWishlist />} />
                  <Route path="/bulk-domain-inquiry" element={<BulkDomainInquiry />} />
                  <Route path="/dashboard/*" element={<CustomerDashboard />} />
                  <Route path="/admin/partner-test" element={<PartnerTrackingTest />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <AIChatBot />
                <MobileBottomNav />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
          </CurrencyProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
