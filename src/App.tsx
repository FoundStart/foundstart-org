import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";

import Index from "./pages/Index";
import Countries from "./pages/Countries";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import Auth from "./pages/Auth";
import DigitalPartners from "./pages/DigitalPartners";
import FreelancerPartners from "./pages/FreelancerPartners";
import SisterPartners from "./pages/SisterPartners";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
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
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TranslationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/digital-partners" element={<DigitalPartners />} />
                  <Route path="/freelancer-partners" element={<FreelancerPartners />} />
                  <Route path="/sister-partners" element={<SisterPartners />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/digital-nomad-guide" element={<BlogPost />} />
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
                  <Route path="/digital-nomad-visas" element={<DigitalNomadVisas />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
