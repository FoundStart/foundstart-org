import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthProvider";
import { useTranslation } from "@/contexts/TranslationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AffiliatesPage, AffiliateAdminPage, AffiliateTracker, ProductVideosPage, type AffAdapter } from "./core";

const Layout: AffAdapter["Layout"] = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 pt-16">{children}</main>
    <Footer />
  </div>
);
const Bare: AffAdapter["Layout"] = ({ children }) => <>{children}</>;

function useAdapter(layout: AffAdapter["Layout"] = Layout): AffAdapter {
  const { user, loading } = useAuth() as any;
  const { language } = useTranslation();
  const navigate = useNavigate();
  return {
    supabase,
    site: {
      key: "foundstart", name: "FoundStart", url: "https://www.foundstart.org", product: "foundstart",
      whatTheySell: { en: "FoundStart helps founders register a company in 10 countries and find the right tools and partners.", ar: "FoundStart بيساعد المؤسسين يسجلوا شركة في 10 دول ويلاقوا الأدوات والشركاء المناسبين." },
      paths: [{ en: "Home", ar: "الرئيسية", path: "/" }, { en: "Countries", ar: "الدول", path: "/countries" }, { en: "Pricing", ar: "الأسعار", path: "/pricing" }, { en: "Services", ar: "الخدمات", path: "/services" }, { en: "AI Co-founder", ar: "المؤسس المشارك AI", path: "/cofounder" }, { en: "Blog", ar: "المدونة", path: "/blog" }],
    },
    lang: language === "ar" ? "ar" : "en",
    user: user ? { id: user.id, email: user.email } : null,
    authLoading: !!loading,
    goSignIn: () => navigate("/auth"),
    Layout: layout,
  };
}
export const AffiliatesRoute = ({ view }: { view?: "program" | "dashboard" | "terms" }) => <AffiliatesPage a={useAdapter()} view={view} />;
export const AffiliatesEmbedded = () => <AffiliatesPage a={useAdapter(Bare)} view="dashboard" />;
export const AffiliateAdminRoute = () => <AffiliateAdminPage a={useAdapter()} />;
export const AffiliateAdminEmbedded = () => <AffiliateAdminPage a={useAdapter(Bare)} />;
export const VideosRoute = () => <ProductVideosPage a={useAdapter()} />;
export function AffiliateTrackerMount() {
  const { user } = useAuth() as any;
  return <AffiliateTracker supabase={supabase} userId={user?.id ?? null} />;
}
