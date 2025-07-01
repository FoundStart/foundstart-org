
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Youtube, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "All Services", href: "/services" },
        { name: "AI Chat Bots", href: "/services" },
        { name: "Company Formation", href: "#services" },
        { name: "Banking Setup", href: "#services" },
        { name: "AI Automation", href: "/services" }
      ]
    },
    {
      title: "Partners",
      links: [
        { name: "Digital Partners (400+)", href: "/digital-partners" },
        { name: "Freelancer Partners (100)", href: "/freelancer-partners" },
        { name: "Partner Directory", href: "/digital-partners" },
        { name: "Success Stories", href: "/press" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Press & Blogs", href: "/blog" },
        { name: "Media & Videos", href: "/media" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Case Studies", href: "/press" },
        { name: "Company News", href: "/press" },
        { name: "Industry Insights", href: "/press" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Live Chat", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "SEO Suite", href: "/seo-management" },
        { name: "Affiliate System", href: "/affiliate-dashboard" }
      ]
    }
  ];

  const socialLinks = [
    { name: "YouTube", href: "https://www.youtube.com/@foundstart/", icon: Youtube },
    { name: "Facebook", href: "https://www.facebook.com/foundstart/", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/foundstartco/", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/foundstart/", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/foundstartco", icon: Twitter }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-lg font-bold gradient-text">FoundStart</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Launch your business in minutes, not months. The all-in-one platform 
              for company formation, banking, and digital services.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            
            <div className="text-xs text-muted-foreground">
              © 2024 FoundStart. All rights reserved.
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
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
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
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
