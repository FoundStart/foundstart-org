
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import DigitalPartners from "./pages/DigitalPartners";
import FreelancerPartners from "./pages/FreelancerPartners";
import SisterPartners from "./pages/SisterPartners";
import Press from "./pages/Press";
import Media from "./pages/Media";
import SEOManagement from "./pages/SEOManagement";
import ContactSales from "./pages/ContactSales";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import NotFound from "./pages/NotFound";
import AIChatBot from "./components/AIChatBot";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/services" element={<Services />} />
                <Route path="/digital-partners" element={<DigitalPartners />} />
                <Route path="/freelancer-partners" element={<FreelancerPartners />} />
                <Route path="/sister-partners" element={<SisterPartners />} />
                <Route path="/press" element={<Press />} />
                <Route path="/media" element={<Media />} />
                <Route path="/seo-management" element={<SEOManagement />} />
                <Route path="/contact-sales" element={<ContactSales />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AIChatBot />
            </div>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
