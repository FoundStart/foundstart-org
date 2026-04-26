
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  slug: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 102,
    title: "Egypt Company Types & Payment Gateways: The Founder's 2026 Playbook",
    description: "Compare all 6 Egyptian company structures (LLC, JSC, SPC, Branch, Rep Office, Sole Proprietorship) and the best local payment gateways — Kashier, Paymob, Fawry, PayTabs.",
    category: "Egypt",
    author: "FoundStart Team",
    date: "Apr 26, 2026",
    readTime: "13 min read",
    featured: true,
    slug: "egypt-company-types-payment-gateways"
  },
  {
    id: 100,
    title: "Payment Gateways in Egypt: The Complete 2026 Guide for Founders",
    description: "Compare Kashier, Paymob, Fawry, PayTabs and Stripe-via-foreign-entity. Fees, settlement times, mobile wallets and installments — everything Egyptian founders need.",
    category: "Fintech",
    author: "FoundStart Team",
    date: "Apr 22, 2026",
    readTime: "12 min read",
    featured: true,
    slug: "payment-gateways-egypt"
  },
  {
    id: 101,
    title: "Payment Gateways Worldwide: 2026 Comparison for Global Founders",
    description: "The definitive comparison of Stripe, PayPal, Adyen, Wise, Mercury, Razorpay, Mollie, Paddle and more. Pick the right stack for your jurisdiction.",
    category: "Fintech",
    author: "FoundStart Team",
    date: "Apr 22, 2026",
    readTime: "14 min read",
    featured: true,
    slug: "payment-gateways-worldwide"
  },
  {
    id: 0,
    title: "Premium Domains for Sale – Brand-Ready, Short & Scalable",
    description: "Curated portfolio of 50+ premium, brandable domains perfect for startups, SaaS platforms, fintech, e-commerce, AI projects, crypto, and global brands.",
    category: "Domains",
    author: "FoundStart Team",
    date: "Jan 10, 2025",
    readTime: "5 min read",
    featured: true,
    slug: "premium-domains-for-sale"
  },
  {
    id: 24,
    title: "180+ Premium Domains for Sale — Complete Portfolio with Backlinks",
    description: "Browse our full collection of 180+ premium brandable domains for startups, SaaS, fintech, e-commerce, AI, and crypto. Every domain listed with category, hosting, and direct inquiry links.",
    category: "Domains",
    author: "FoundStart Team",
    date: "Feb 10, 2026",
    readTime: "15 min read",
    featured: true,
    slug: "premium-domains-showcase"
  },
  {
    id: 1,
    title: "How to Start a Marketing Agency in the USA with FoundStart",
    description: "Complete guide to establishing a marketing agency in the USA. Learn about LLC formation, tax requirements, and how FoundStart partners make it seamless.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 20, 2026",
    readTime: "10 min read",
    slug: "marketing-agency-usa"
  },
  {
    id: 2,
    title: "Starting a Digital Agency in the UK: FoundStart Guide",
    description: "Everything you need to know about launching your digital agency in the UK with FoundStart's partner network.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 19, 2026",
    readTime: "9 min read",
    slug: "digital-agency-uk"
  },
  {
    id: 3,
    title: "How FoundStart Helps You Build a Web Development Agency in Europe",
    description: "Step-by-step process for establishing a web development agency in Estonia, Germany, or the Netherlands.",
    category: "Agency Formation",
    author: "MoMo Sa",
    date: "Jan 18, 2026",
    readTime: "11 min read",
    slug: "web-dev-agency-europe"
  },
  {
    id: 4,
    title: "Complete Guide to LLC Formation in 2024",
    description: "Everything you need to know about forming an LLC, from choosing a state to filing paperwork and ongoing compliance requirements.",
    category: "Business Formation",
    author: "MoMo Sa",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "llc-formation-guide"
  },
  {
    id: 5,
    title: "UK vs US Company Formation: Which is Right for You?",
    description: "Compare the benefits, costs, and requirements of forming a company in the UK versus the United States.",
    category: "International Business",
    author: "Sarah Johnson",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    slug: "uk-vs-us-company-formation"
  },
  {
    id: 6,
    title: "Starting a Creative Agency in Delaware: Tax Benefits & Process",
    description: "Why Delaware is the top choice for creative agencies and how FoundStart simplifies the entire process.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 17, 2026",
    readTime: "8 min read",
    slug: "creative-agency-delaware"
  },
  {
    id: 7,
    title: "How to Launch Your Consulting Agency in Germany with FoundStart",
    description: "Complete guide to setting up a consulting business in Germany through FoundStart's European partners.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 16, 2026",
    readTime: "10 min read",
    slug: "consulting-agency-germany"
  },
  {
    id: 8,
    title: "Estonia E-Residency: Start Your Digital Agency Remotely",
    description: "How to leverage Estonia's E-Residency program to build a location-independent agency with FoundStart.",
    category: "Digital Nomad",
    author: "FoundStart Team",
    date: "Jan 15, 2026",
    readTime: "12 min read",
    slug: "estonia-eresidency-agency"
  },
  {
    id: 9,
    title: "Building a Social Media Agency in the USA: Complete Guide",
    description: "From LLC formation to client acquisition - everything about starting a social media agency in America.",
    category: "Agency Formation",
    author: "MoMo Sa",
    date: "Jan 14, 2026",
    readTime: "9 min read",
    slug: "social-media-agency-usa"
  },
  {
    id: 10,
    title: "SEO Agency Formation: USA vs UK Comparison",
    description: "Detailed comparison of launching an SEO agency in the USA versus the UK with FoundStart partners.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 13, 2026",
    readTime: "10 min read",
    slug: "seo-agency-usa-uk"
  },
  {
    id: 11,
    title: "How to Start a PPC Advertising Agency in Europe",
    description: "Guide to establishing a PPC/paid advertising agency in European countries through FoundStart.",
    category: "Agency Formation",
    author: "Sarah Johnson",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    slug: "ppc-agency-europe"
  },
  {
    id: 12,
    title: "Launching a Branding Agency in the Netherlands",
    description: "Complete process for setting up a branding and design agency in the Netherlands with FoundStart.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 11, 2026",
    readTime: "9 min read",
    slug: "branding-agency-netherlands"
  },
  {
    id: 13,
    title: "Video Production Agency: US Formation with FoundStart",
    description: "How to establish a video production agency in the USA using FoundStart's partner network.",
    category: "Agency Formation",
    author: "MoMo Sa",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    slug: "video-agency-usa"
  },
  {
    id: 14,
    title: "Content Marketing Agency in the UK: Complete Setup Guide",
    description: "Everything you need to launch a content marketing agency in the United Kingdom.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 9, 2026",
    readTime: "10 min read",
    slug: "content-agency-uk"
  },
  {
    id: 15,
    title: "E-commerce Agency Formation: Wyoming LLC Guide",
    description: "Why Wyoming is ideal for e-commerce agencies and how FoundStart makes formation simple.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    slug: "ecommerce-agency-wyoming"
  },
  {
    id: 16,
    title: "Starting an AI/Tech Agency in the USA with FoundStart",
    description: "Guide to establishing an AI or technology consulting agency in the United States.",
    category: "Agency Formation",
    author: "MoMo Sa",
    date: "Jan 7, 2026",
    readTime: "11 min read",
    slug: "ai-tech-agency-usa"
  },
  {
    id: 17,
    title: "PR Agency Formation in Europe: A Complete Guide",
    description: "How to set up a public relations agency in European countries through FoundStart's partners.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 6, 2026",
    readTime: "9 min read",
    slug: "pr-agency-europe"
  },
  {
    id: 18,
    title: "Influencer Marketing Agency: USA vs Europe",
    description: "Comparing influencer marketing agency formation in the USA and Europe with FoundStart.",
    category: "Agency Formation",
    author: "Sarah Johnson",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    slug: "influencer-agency-comparison"
  },
  {
    id: 19,
    title: "UX/UI Design Agency in the UK: Formation Guide",
    description: "Complete guide to launching a UX/UI design agency in the United Kingdom.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 4, 2026",
    readTime: "10 min read",
    slug: "uxui-agency-uk"
  },
  {
    id: 20,
    title: "Full-Service Agency Formation: Multi-Country Options",
    description: "How FoundStart helps you establish a full-service agency with presence in multiple countries.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 3, 2026",
    readTime: "12 min read",
    slug: "full-service-agency-multicountry"
  },
  {
    id: 21,
    title: "Banking Solutions for New Businesses: Mercury vs Traditional Banks",
    description: "Explore the best banking options for startups, including digital banks like Mercury and traditional banking solutions.",
    category: "Banking",
    author: "David Chen",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    slug: "banking-solutions-mercury-vs-traditional"
  },
  {
    id: 22,
    title: "EIN Application Process: Step-by-Step Guide",
    description: "Learn how to obtain your Employer Identification Number (EIN) quickly and efficiently for your new business.",
    category: "Tax & Compliance",
    author: "Lisa Rodriguez",
    date: "Dec 8, 2024",
    readTime: "5 min read",
    slug: "ein-application-guide"
  },
  {
    id: 23,
    title: "Delaware vs Wyoming: Best States for LLC Formation",
    description: "Compare the top states for LLC formation, including tax benefits, privacy protections, and business-friendly laws.",
    category: "Business Formation",
    author: "Michael Turner",
    date: "Dec 5, 2024",
    readTime: "9 min read",
    slug: "delaware-vs-wyoming-llc"
  }
];

export const categories = [
  "All", 
  "Agency Formation", 
  "Business Formation", 
  "International Business", 
  "Digital Nomad",
  "Banking", 
  "Tax & Compliance",
  "Domains"
];
