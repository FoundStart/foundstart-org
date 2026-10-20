import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

import Index from "./pages/Index";
const Countries = lazy(() => import("./pages/Countries"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const DigitalServices = lazy(() => import("./pages/DigitalServices"));
const Services = lazy(() => import("./pages/Services"));
const Partners = lazy(() => import("./pages/Partners"));
import Auth from "./pages/Auth";
const DigitalPartners = lazy(() => import("./pages/DigitalPartners"));
const FreelancerPartners = lazy(() => import("./pages/FreelancerPartners"));
const SisterPartners = lazy(() => import("./pages/SisterPartners"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PremiumDomainsBlog = lazy(() => import("./pages/blog/PremiumDomainsBlog"));
const PremiumDomainsShowcaseBlog = lazy(() => import("./pages/blog/PremiumDomainsShowcaseBlog"));
const LLCFormationGuideBlog = lazy(() => import("./pages/blog/LLCFormationGuideBlog"));
const UKvsUSFormationBlog = lazy(() => import("./pages/blog/UKvsUSFormationBlog"));
const BlogSlugDispatcher = lazy(() => import("./pages/blog/ArticleBlog").then(m => ({ default: m.BlogSlugDispatcher })));
const PaymentGateways2026AR = lazy(() => import("./pages/blog/PaymentGateways2026AR"));
const VibeCodingPlatforms2026AR = lazy(() => import("./pages/blog/VibeCodingPlatforms2026AR"));
const FintechVirtualCards2026AR = lazy(() => import("./pages/blog/FintechVirtualCards2026AR"));
const BusinessAutomation2026AR = lazy(() => import("./pages/blog/BusinessAutomation2026AR"));
const BestCompanyFormation2026AR = lazy(() => import("./pages/blog/BestCompanyFormation2026AR"));
const PremiumDomainsBlogAR = lazy(() => import("./pages/blog/PremiumDomainsBlogAR"));
const PremiumDomainsShowcaseBlogAR = lazy(() => import("./pages/blog/PremiumDomainsShowcaseBlogAR"));
const LLCFormationGuideBlogAR = lazy(() => import("./pages/blog/LLCFormationGuideBlogAR"));
const UKvsUSFormationBlogAR = lazy(() => import("./pages/blog/UKvsUSFormationBlogAR"));
const ArWrap = lazy(() => import("./pages/blog/ArWrap"));
const EgyptOnePersonCompanyEN = lazy(() => import("./pages/blog/EgyptOnePersonCompanyEN"));

const MoMoAIBusinessSetupEN = lazy(() => import("./pages/blog/MoMoAIBusinessSetupEN"));
const MoMoAIBusinessSetupAR = lazy(() => import("./pages/blog/MoMoAIBusinessSetupAR"));
const Press = lazy(() => import("./pages/Press"));
const Media = lazy(() => import("./pages/Media"));
const Learning = lazy(() => import("./pages/Learning"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const ContactSales = lazy(() => import("./pages/ContactSales"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
import NotFound from "./pages/NotFound";
const DigitalNomadVisas = lazy(() => import("./pages/DigitalNomadVisas"));
const Domains = lazy(() => import("./pages/Domains"));
const DomainInquiry = lazy(() => import("./pages/DomainInquiry"));
const DomainWishlist = lazy(() => import("./pages/DomainWishlist"));
const BulkDomainInquiry = lazy(() => import("./pages/BulkDomainInquiry"));
const CustomerDashboard = lazy(() => import("./pages/saas/CustomerDashboard"));
const GuidesIndex = lazy(() => import("./pages/guides/GuidesIndex"));
const GuidePage = lazy(() => import("./pages/guides/GuidePage"));
const AdminDashboard = lazy(() => import("./pages/saas/AdminDashboard"));
const PricingCalculator = lazy(() => import("./pages/PricingCalculator"));
const FAQ = lazy(() => import("./pages/FAQ"));
const AllPartners = lazy(() => import("./pages/AllPartners"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PartnerTrackingTest = lazy(() => import("./pages/admin/PartnerTrackingTest"));
import MobileBottomNav from "./components/mobile/MobileBottomNav";
const PartnerAdsHub = lazy(() => import("./components/ads/PartnerAdsHub"));
import OutboundUtmTagger from "./components/ads/OutboundUtmTagger";
import HealthCheckBanner from "./components/HealthCheckBanner";
const IntegrationSettings = lazy(() => import("./pages/IntegrationSettings"));
const EgyptOnePersonCompanyAR = lazy(() => import("./pages/blog/EgyptOnePersonCompanyAR"));
const BestCompanyFormation2026 = lazy(() => import("./pages/blog/BestCompanyFormation2026"));
const BusinessAutomation2026 = lazy(() => import("./pages/blog/BusinessAutomation2026"));
const FintechVirtualCards2026 = lazy(() => import("./pages/blog/FintechVirtualCards2026"));
const VibeCodingPlatforms2026 = lazy(() => import("./pages/blog/VibeCodingPlatforms2026"));
const PaymentGateways2026 = lazy(() => import("./pages/blog/PaymentGateways2026"));
const CompanyFormationBio = lazy(() => import("./pages/CompanyFormationBio"));
import "./App.css";
import { AffiliateTrackerMount } from "@/affiliate/site";
const AffiliatesRoute = lazy(() => import("@/affiliate/site").then(m => ({ default: m.AffiliatesRoute })));
const AffiliateAdminRoute = lazy(() => import("@/affiliate/site").then(m => ({ default: m.AffiliateAdminRoute })));
const VideosRoute = lazy(() => import("@/affiliate/site").then(m => ({ default: m.VideosRoute })));

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

// Partner ads belong to the standalone partner pages only, not the main FoundStart flow.
const PartnerPagesOnly = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const on = ['/all-partners', '/partners', '/digital-partners', '/freelancer-partners', '/sister-partners'].some(p => pathname === p || pathname.startsWith(p + '/'));
  return on ? <>{children}</> : null;
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
                <AffiliateTrackerMount />
                <AdSenseLoader />
                <HealthCheckBanner />
                <Suspense fallback={<div className="min-h-screen bg-background" />}><Routes>
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
                  <Route path="/affiliate-dashboard" element={<Navigate to="/affiliates/dashboard" replace />} />
                  <Route path="/affiliates" element={<AffiliatesRoute view="program" />} />
                  <Route path="/affiliates/dashboard" element={<AffiliatesRoute view="dashboard" />} />
                  <Route path="/affiliates/terms" element={<AffiliatesRoute view="terms" />} />
                  <Route path="/affiliates/admin" element={<AffiliateAdminRoute />} />
                  <Route path="/affiliate" element={<Navigate to="/affiliates" replace />} />
                  <Route path="/videos" element={<Navigate to="/media" replace />} />
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
                  <Route path="/cofounder" element={<Navigate to="/" replace />} />
                  <Route path="/blog/meet-the-foundstart-ai-cofounder" element={<Navigate to="/blog" replace />} />
                  <Route path="/blog/meet-the-foundstart-ai-cofounder-ar" element={<Navigate to="/blog" replace />} />
                  <Route path="/agents" element={<Navigate to="/faq" replace />} />
                  <Route path="/agents/:slug" element={<Navigate to="/faq" replace />} />
                  <Route path="/guides" element={<GuidesIndex />} />
                  <Route path="/guides/:slug" element={<GuidePage />} />
                  <Route path="/admin/partner-test" element={<PartnerTrackingTest />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="/settings/integrations" element={<IntegrationSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes></Suspense>
                <MobileBottomNav />
                <PartnerPagesOnly><Suspense fallback={null}><PartnerAdsHub /></Suspense></PartnerPagesOnly>
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
