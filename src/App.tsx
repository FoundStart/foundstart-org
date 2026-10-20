import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

import Index from "./pages/Index";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";
import DigitalServices from "./pages/DigitalServices";
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
import { BlogSlugDispatcher } from "./pages/blog/ArticleBlog";
import PaymentGateways2026AR from "./pages/blog/PaymentGateways2026AR";
import VibeCodingPlatforms2026AR from "./pages/blog/VibeCodingPlatforms2026AR";
import FintechVirtualCards2026AR from "./pages/blog/FintechVirtualCards2026AR";
import BusinessAutomation2026AR from "./pages/blog/BusinessAutomation2026AR";
import BestCompanyFormation2026AR from "./pages/blog/BestCompanyFormation2026AR";
import PremiumDomainsBlogAR from "./pages/blog/PremiumDomainsBlogAR";
import PremiumDomainsShowcaseBlogAR from "./pages/blog/PremiumDomainsShowcaseBlogAR";
import LLCFormationGuideBlogAR from "./pages/blog/LLCFormationGuideBlogAR";
import UKvsUSFormationBlogAR from "./pages/blog/UKvsUSFormationBlogAR";
import ArWrap from "./pages/blog/ArWrap";
import EgyptOnePersonCompanyEN from "./pages/blog/EgyptOnePersonCompanyEN";

import MoMoAIBusinessSetupEN from "./pages/blog/MoMoAIBusinessSetupEN";
import MoMoAIBusinessSetupAR from "./pages/blog/MoMoAIBusinessSetupAR";
import Press from "./pages/Press";
import Media from "./pages/Media";
import Learning from "./pages/Learning";
import Tutorials from "./pages/Tutorials";
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
import Cofounder from "./pages/Cofounder";
import Agents from "./pages/Agents";
import AgentChat from "./pages/AgentChat";
import GuidesIndex from "./pages/guides/GuidesIndex";
import GuidePage from "./pages/guides/GuidePage";
import AdminDashboard from "./pages/saas/AdminDashboard";
import PricingCalculator from "./pages/PricingCalculator";
import FAQ from "./pages/FAQ";
import AllPartners from "./pages/AllPartners";
import ResetPassword from "./pages/ResetPassword";
import PartnerTrackingTest from "./pages/admin/PartnerTrackingTest";
import AIChatBot from "./components/AIChatBot";
import MobileBottomNav from "./components/mobile/MobileBottomNav";
import PartnerAdsHub from "./components/ads/PartnerAdsHub";
import OutboundUtmTagger from "./components/ads/OutboundUtmTagger";
import HealthCheckBanner from "./components/HealthCheckBanner";
import IntegrationSettings from "./pages/IntegrationSettings";
import EgyptOnePersonCompanyAR from "./pages/blog/EgyptOnePersonCompanyAR";
import BestCompanyFormation2026 from "./pages/blog/BestCompanyFormation2026";
import BusinessAutomation2026 from "./pages/blog/BusinessAutomation2026";
import FintechVirtualCards2026 from "./pages/blog/FintechVirtualCards2026";
import VibeCodingPlatforms2026 from "./pages/blog/VibeCodingPlatforms2026";
import PaymentGateways2026 from "./pages/blog/PaymentGateways2026";
import CompanyFormationBio from "./pages/CompanyFormationBio";
import "./App.css";

const queryClient = new QueryClient();

// Loads the AdSense Auto Ads script only on blog routes (/blog and /blog/*).
// ads.txt stays at the site root; no ad units exist outside the blog.
const ADSENSE_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4631793934289134";
function AdSenseLoader() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith("/blog")) return;
    if (document.querySelector('script[data-foundstart-adsense]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = ADSENSE_SRC;
    s.crossOrigin = "anonymous";
    s.dataset.foundstartAdsense = "1";
    document.head.appendChild(s);
  }, [pathname]);
  return null;
}

// Scroll to top component
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();
  // POP (back/forward): leave scroll alone - the browser restores it natively.
  // PUSH/REPLACE with #anchor: jump to the anchor after paint.
  // Everything else: open the page at the top, before paint.
  useLayoutEffect(() => {
    if (navType === "POP") return;
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash, navType]);

  return null;
}

// Hide floating promos/chatbot on chat pages (agent chats, co-founder)
const ChatPageExclusions = ({ children, hideOnDashboard = false }: { children: ReactNode; hideOnDashboard?: boolean }) => {
  const { pathname } = useLocation();
  if (hideOnDashboard && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) return null;
  if (pathname.startsWith('/agents') || pathname.startsWith('/cofounder')) return null;
  return <>{children}</>;
};

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
                <AdSenseLoader />
                <HealthCheckBanner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/country/:countryId" element={<CountryPage />} />
                  <Route path="/company-formation-bio" element={<CompanyFormationBio />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/digital-services" element={<DigitalServices />} />
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
                  <Route path="/blog/egypt-one-person-company-ar" element={<EgyptOnePersonCompanyAR />} />
                  <Route path="/blog/best-company-formation-2026" element={<BestCompanyFormation2026 />} />
                  <Route path="/blog/business-automation-2026" element={<BusinessAutomation2026 />} />
                  <Route path="/blog/fintech-virtual-cards-2026" element={<FintechVirtualCards2026 />} />
                  <Route path="/blog/vibe-coding-platforms-2026" element={<VibeCodingPlatforms2026 />} />
                  <Route path="/blog/payment-gateways-2026" element={<PaymentGateways2026 />} />
                  <Route path="/blog/payment-gateways-2026-ar" element={<ArWrap><PaymentGateways2026AR /></ArWrap>} />
                  <Route path="/blog/vibe-coding-platforms-2026-ar" element={<ArWrap><VibeCodingPlatforms2026AR /></ArWrap>} />
                  <Route path="/blog/fintech-virtual-cards-2026-ar" element={<ArWrap><FintechVirtualCards2026AR /></ArWrap>} />
                  <Route path="/blog/business-automation-2026-ar" element={<ArWrap><BusinessAutomation2026AR /></ArWrap>} />
                  <Route path="/blog/best-company-formation-2026-ar" element={<ArWrap><BestCompanyFormation2026AR /></ArWrap>} />
                  <Route path="/blog/premium-domains-for-sale-ar" element={<ArWrap><PremiumDomainsBlogAR /></ArWrap>} />
                  <Route path="/blog/premium-domains-showcase-ar" element={<ArWrap><PremiumDomainsShowcaseBlogAR /></ArWrap>} />
                  <Route path="/blog/llc-formation-guide-ar" element={<ArWrap><LLCFormationGuideBlogAR /></ArWrap>} />
                  <Route path="/blog/uk-vs-us-company-formation-ar" element={<ArWrap><UKvsUSFormationBlogAR /></ArWrap>} />
                  <Route path="/blog/egypt-one-person-company" element={<EgyptOnePersonCompanyEN />} />
                  <Route path="/blog/:slug" element={<BlogSlugDispatcher />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/affiliate-dashboard" element={<Navigate to="/" replace />} />
                  <Route path="/seo-management" element={<Navigate to="/" replace />} />
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
                  <Route path="/cofounder" element={<Cofounder />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/agents/:slug" element={<AgentChat />} />
                  <Route path="/guides" element={<GuidesIndex />} />
                  <Route path="/guides/:slug" element={<GuidePage />} />
                  <Route path="/admin/partner-test" element={<PartnerTrackingTest />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="/settings/integrations" element={<IntegrationSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatPageExclusions><AIChatBot /></ChatPageExclusions>
                <MobileBottomNav />
                <ChatPageExclusions hideOnDashboard><PartnerAdsHub /></ChatPageExclusions>
                <OutboundUtmTagger />
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
