import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Youtube, Facebook, Instagram, Linkedin, Twitter, MessageCircle, Download } from 'lucide-react';


const Footer = () => {
  const footerSections = [{
    title: "Services",
    links: [{
      name: "All Services",
      href: "/services"
    }, {
      name: "Countries & Jurisdictions", 
      href: "/countries"
    }, {
      name: "AI Chat Bots",
      href: "/services"
    }, {
      name: "Company Formation",
      href: "#services"
    }, {
      name: "Banking Setup",
      href: "#services"
    }, {
      name: "AI Automation",
      href: "/services"
    }]
  }, {
    title: "Countries",
    links: [{
      name: "🇺🇸 United States",
      href: "/countries"
    }, {
      name: "🇬🇧 United Kingdom",
      href: "/countries"
    }, {
      name: "🇨🇦 Canada",
      href: "/countries"
    }, {
      name: "🇪🇪 Estonia",
      href: "/countries"
    }, {
      name: "🇫🇮 Finland",
      href: "/countries"
    }, {
      name: "🇸🇪 Sweden",
      href: "/countries"
    }, {
      name: "🇱🇻 Latvia",
      href: "/countries"
    }, {
      name: "🇱🇹 Lithuania",
      href: "/countries"
    }]
  }, {
    title: "Partners",
    links: [{
      name: "Digital Partners",
      href: "/digital-partners"
    }, {
      name: "Freelancer Partners",
      href: "/freelancer-partners"
    }, {
      name: "Premium Domains",
      href: "/domains"
    }, {
      name: "Partner Directory",
      href: "/digital-partners"
    }, {
      name: "Success Stories",
      href: "/press"
    }]
  }, {
    title: "Resources",
    links: [{
      name: "Press & Blogs",
      href: "/blog"
    }, {
      name: "Media & Videos",
      href: "/media"
    }, {
      name: "Tutorials",
      href: "/tutorials"
    }, {
      name: "Case Studies",
      href: "/press"
    }, {
      name: "Company News",
      href: "/press"
    }, {
      name: "Industry Insights",
      href: "/press"
    }]
  }, {
    title: "Support",
    links: [{
      name: "Help Center",
      href: "#"
    }, {
      name: "Contact Us",
      href: "/contact-us"
    }, {
      name: "Live Chat",
      href: "#"
    }, {
      name: "Documentation",
      href: "#"
    }, {
      name: "SEO Suite",
      href: "/seo-management"
    }, {
      name: "Affiliate System",
      href: "/affiliate-dashboard"
    }]
  }, {
    title: "Company",
    links: [{
      name: "Pricing & Country Tiers",
      href: "/pricing#country-tiers"
    }, {
      name: "Who We Are",
      href: "/who-we-are"
    }, {
      name: "FAQ",
      href: "/faq"
    }, {
      name: "Privacy Policy",
      href: "/privacy-policy"
    }, {
      name: "Terms of Service",
      href: "/terms-of-service"
    }, {
      name: "Cookie Policy",
      href: "/cookie-policy"
    }]
  }];

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/momoaiearab", icon: Facebook },
    { name: "WhatsApp", href: "https://wa.me/message/UQZ6STBLDXKPD1", icon: MessageCircle },
    { name: "Instagram", href: "https://www.instagram.com/momoaiar/", icon: Instagram },
    { name: "Threads", href: "https://www.threads.com/@momoaiar", icon: MessageCircle },
    { name: "YouTube", href: "http://www.youtube.com/@momoai-momo", icon: Youtube },
    { name: "TikTok", href: "http://tiktok.com/@momoaiar", icon: MessageCircle },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-sayed-6b2a38226/", icon: Linkedin },
    { name: "Reddit", href: "https://www.reddit.com/user/Exotic_Researcher688/", icon: MessageCircle },
    { name: "Quora", href: "https://momoai.quora.com/", icon: MessageCircle },
    { name: "X", href: "https://x.com/MSAGoldgroup", icon: Twitter },
    { name: "Pinterest", href: "https://pin.it/2GSKpcQur", icon: MessageCircle },
    { name: "Minds", href: "https://www.minds.com/momoai/", icon: MessageCircle },
    { name: "Rumble", href: "https://rumble.com/user/Deeemoz", icon: MessageCircle },
    { name: "Medium", href: "https://medium.com/@Deeemoz", icon: MessageCircle },
    { name: "Beehiiv", href: "https://deeemoz.beehiiv.com/", icon: MessageCircle },
    { name: "Substack", href: "https://substack.com/@deeemoz", icon: MessageCircle },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-lg font-bold gradient-text">FoundStart</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Launch your business in minutes, not months. The all-in-one platform 
              for company formation, banking, and digital services.
            </p>
            
            {/* Download Button */}
            <div className="mb-4">
              <a 
                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT51oaHgrpKbNUUh_1t4ubKyFgQZVXLHQRbA3_EHMc4xDcByOOrnTkyIf63-Gn9AmK2UMF5iXJcKv41/pubhtml" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  MoMoAI Business Sheet
                </Button>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {socialLinks.slice(0, 16).map((social, index) => {
              const Icon = social.icon;
              return <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded hover:bg-muted/50" aria-label={social.name} title={social.name}>
                    <Icon className="w-4 h-4" />
                  </a>;
            })}
            </div>
            
            <div className="text-xs text-muted-foreground">© 2025 FoundStart. All rights reserved, MoMoAI</div>
          </div>

          {footerSections.filter(section => section.title !== "Company").map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/who-we-are" className="hover:text-foreground transition-colors">Who We Are</Link>
            <Link to="/contact-us" className="hover:text-foreground transition-colors">Contact Us</Link>
            <Link to="/digital-nomad-visas" className="hover:text-foreground transition-colors">Digital Nomad Visas</Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ businesses</span>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-xs text-muted-foreground">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
