
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Translations {
  // Header & Navigation
  services: string;
  countries: string;
  partners: string;
  digitalPartners: string;
  blog: string;
  contact: string;
  signIn: string;
  signUp: string;
  
  // Hero Section
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  startYourBusiness: string;
  watchDemo: string;
  watchDemoBy: string;
  trustedBy: string;
  noHiddenFees: string;
  support24: string;
  moneyBackGuarantee: string;
  
  // Demo Section
  completeGuide: string;
  completeGuideTitle: string;
  completeGuideDescription: string;
  watchNow: string;
  closeVideo: string;
  averageSetupTime: string;
  
  // Business Name Widget
  findPerfectName: string;
  businessName: string;
  businessNameDescription: string;
  
  // Jurisdiction Section
  chooseJurisdiction: string;
  chooseJurisdictionDescription: string;
  
  // Countries
  usa: string;
  uk: string;
  canada: string;
  estonia: string;
  finland: string;
  sweden: string;
  latvia: string;
  lithuania: string;
  egypt: string;
  
  // Common Actions
  startIn: string;
  learnMore: string;
  getQuote: string;
  
  // Footer
  footerDescription: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  trustedByBusinesses: string;
  socCompliant: string;
  
  // Mobile Navigation
  home: string;
  auth: string;
  
  // Benefits
  einIncluded: string;
  registeredAgent: string;
  usBankAccount: string;
  companyHouseFiling: string;
  registeredOffice: string;
  vatRegistration: string;
  businessNumber: string;
  bankingAssistance: string;
  eResidency: string;
  digitalSignature: string;
  euMarketAccess: string;
  businessId: string;
  nordicMarket: string;
  bankingSetup: string;
  scandinavianAccess: string;
  vatSetup: string;
  balticGateway: string;
  techHubAccess: string;
  gafiRegistration: string;
  companyStructures: string;
  foreignOwnership: string;
}

const englishTranslations: Translations = {
  // Header & Navigation
  services: "Services",
  countries: "Countries",
  partners: "Partners",
  digitalPartners: "Digital Partners",
  blog: "Blog",
  contact: "Contact",
  signIn: "Sign In",
  signUp: "Sign Up",
  
  // Hero Section
  heroTitle: "Launch Your Business in",
  heroTitleHighlight: "Minutes, Not Months",
  heroDescription: "From company formation to banking and payments - we handle everything. Start your business in the USA, UK, Canada, Estonia, Finland, Sweden, Latvia, Lithuania, or Egypt with our AI-powered platform and integrated partner ecosystem.",
  startYourBusiness: "Start Your Business",
  watchDemo: "Watch Demo by MoMo Sa",
  watchDemoBy: "Watch FoundStart CEO Demo",
  trustedBy: "Trusted by 10,000+ Entrepreneurs",
  noHiddenFees: "No hidden fees",
  support24: "24/7 support",
  moneyBackGuarantee: "Money-back guarantee",
  
  // Demo Section
  completeGuide: "Complete Business Formation Guide",
  completeGuideTitle: "Complete Business Formation Guide",
  completeGuideDescription: "Watch FoundStart CEO Mr. MoMo Sa demonstrate our AI-powered platform and see how you can start your business in minutes.",
  watchNow: "Watch Now",
  closeVideo: "Close Video",
  averageSetupTime: "Average setup time",
  
  // Business Name Widget
  findPerfectName: "Find the Perfect",
  businessName: "Business Name",
  businessNameDescription: "Generate unique, brandable names for your business with AI-powered suggestions and instant availability checking.",
  
  // Jurisdiction Section
  chooseJurisdiction: "Choose Your",
  chooseJurisdictionDescription: "Start your business in any of our supported countries. Each jurisdiction offers unique advantages for different business types and goals.",
  
  // Countries
  usa: "USA",
  uk: "UK",
  canada: "Canada",
  estonia: "Estonia",
  finland: "Finland",
  sweden: "Sweden",
  latvia: "Latvia",
  lithuania: "Lithuania",
  egypt: "Egypt",
  
  // Common Actions
  startIn: "Start in",
  learnMore: "Learn More",
  getQuote: "Get Quote",
  
  // Footer
  footerDescription: "Launch your business in minutes, not months. The all-in-one platform for company formation, banking, and digital services.",
  allRightsReserved: "All rights reserved, MoMoAI",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  cookiePolicy: "Cookie Policy",
  trustedByBusinesses: "Trusted by 10,000+ businesses",
  socCompliant: "SOC 2 Compliant",
  
  // Mobile Navigation
  home: "Home",
  auth: "Auth",
  
  // Benefits
  einIncluded: "EIN included",
  registeredAgent: "Registered Agent",
  usBankAccount: "US Bank Account options",
  companyHouseFiling: "Company House filing",
  registeredOffice: "Registered Office",
  vatRegistration: "VAT Registration",
  businessNumber: "Business Number",
  bankingAssistance: "Banking assistance",
  eResidency: "e-Residency",
  digitalSignature: "Digital signature",
  euMarketAccess: "EU market access",
  businessId: "Business ID",
  nordicMarket: "Nordic market",
  bankingSetup: "Banking setup",
  scandinavianAccess: "Scandinavian access",
  vatSetup: "VAT setup",
  balticGateway: "Baltic gateway",
  techHubAccess: "Tech hub access",
  gafiRegistration: "GAFI registration",
  companyStructures: "6 company structures",
  foreignOwnership: "100% foreign ownership*"
};

const arabicTranslations: Translations = {
  // Header & Navigation
  services: "الخدمات",
  countries: "البلدان",
  partners: "الشركاء",
  digitalPartners: "الشركاء الرقميون",
  blog: "المدونة",
  contact: "تواصل معنا",
  signIn: "تسجيل الدخول",
  signUp: "إنشاء حساب",
  
  // Hero Section
  heroTitle: "أطلق مشروعك في",
  heroTitleHighlight: "دقائق، وليس شهور",
  heroDescription: "من تأسيس الشركة إلى الخدمات المصرفية والمدفوعات - نحن نتولى كل شيء. ابدأ مشروعك في الولايات المتحدة، المملكة المتحدة، كندا، إستونيا، فنلندا، السويد، لاتفيا، ليتوانيا، أو مصر مع منصتنا المدعومة بالذكاء الاصطناعي ونظام الشركاء المتكامل.",
  startYourBusiness: "ابدأ مشروعك",
  watchDemo: "شاهد العرض التوضيحي للأستاذ مومو سا",
  watchDemoBy: "شاهد العرض التوضيحي لرئيس FoundStart",
  trustedBy: "موثوق من قبل أكثر من 10,000 رائد أعمال",
  noHiddenFees: "لا توجد رسوم خفية",
  support24: "دعم على مدار الساعة",
  moneyBackGuarantee: "ضمان استرداد الأموال",
  
  // Demo Section
  completeGuide: "دليل شامل لتأسيس الأعمال",
  completeGuideTitle: "دليل شامل لتأسيس الأعمال",
  completeGuideDescription: "شاهد الرئيس التنفيذي لـ FoundStart الأستاذ مومو سا يوضح منصتنا المدعومة بالذكاء الاصطناعي وتعرف على كيفية بدء مشروعك في دقائق.",
  watchNow: "شاهد الآن",
  closeVideo: "إغلاق الفيديو",
  averageSetupTime: "متوسط وقت الإعداد",
  
  // Business Name Widget
  findPerfectName: "اعثر على",
  businessName: "اسم المشروع المثالي",
  businessNameDescription: "أنشئ أسماء فريدة وقابلة للتسويق لمشروعك مع اقتراحات مدعومة بالذكاء الاصطناعي وفحص فوري للتوفر.",
  
  // Jurisdiction Section
  chooseJurisdiction: "اختر",
  chooseJurisdictionDescription: "ابدأ مشروعك في أي من البلدان المدعومة لدينا. كل اختصاص قضائي يوفر مزايا فريدة لأنواع مختلفة من الأعمال والأهداف.",
  
  // Countries
  usa: "الولايات المتحدة",
  uk: "المملكة المتحدة",
  canada: "كندا",
  estonia: "إستونيا",
  finland: "فنلندا",
  sweden: "السويد",
  latvia: "لاتفيا",
  lithuania: "ليتوانيا",
  egypt: "مصر",
  
  // Common Actions
  startIn: "ابدأ في",
  learnMore: "اعرف المزيد",
  getQuote: "احصل على عرض سعر",
  
  // Footer
  footerDescription: "أطلق مشروعك في دقائق، وليس شهور. المنصة الشاملة لتأسيس الشركات والخدمات المصرفية والرقمية.",
  allRightsReserved: "جميع الحقوق محفوظة، مومو إيه آي",
  privacyPolicy: "سياسة الخصوصية",
  termsOfService: "شروط الخدمة",
  cookiePolicy: "سياسة ملفات تعريف الارتباط",
  trustedByBusinesses: "موثوق من قبل أكثر من 10,000 مشروع",
  socCompliant: "متوافق مع SOC 2",
  
  // Mobile Navigation
  home: "الرئيسية",
  auth: "المصادقة",
  
  // Benefits
  einIncluded: "رقم التعريف الضريبي متضمن",
  registeredAgent: "وكيل مسجل",
  usBankAccount: "خيارات الحساب المصرفي الأمريكي",
  companyHouseFiling: "تسجيل دار الشركات",
  registeredOffice: "مكتب مسجل",
  vatRegistration: "تسجيل ضريبة القيمة المضافة",
  businessNumber: "رقم الأعمال",
  bankingAssistance: "مساعدة مصرفية",
  eResidency: "الإقامة الإلكترونية",
  digitalSignature: "التوقيع الرقمي",
  euMarketAccess: "الوصول لسوق الاتحاد الأوروبي",
  businessId: "معرف الأعمال",
  nordicMarket: "السوق الاسكندنافي",
  bankingSetup: "إعداد مصرفي",
  scandinavianAccess: "الوصول الاسكندنافي",
  vatSetup: "إعداد ضريبة القيمة المضافة",
  balticGateway: "بوابة البلطيق",
  techHubAccess: "الوصول لمركز التكنولوجيا",
  gafiRegistration: "تسجيل الهيئة العامة للاستثمار",
  companyStructures: "6 هياكل شركات",
  foreignOwnership: "ملكية أجنبية 100%*"
};

interface TranslationContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: Translations;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  const translations = {
    en: englishTranslations,
    ar: arabicTranslations
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
