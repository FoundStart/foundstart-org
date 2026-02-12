
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';
import LanguageToggle from './LanguageToggle';
import CurrencySelector from './CurrencySelector';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const domainsDropdownItems = [
    { name: "Premium Domains", href: '/domains' },
    { name: "Domain Marketplace", href: '/domains#marketplace' },
  ];

  const navigationItems = [
    { name: "Services", href: '/services' },
    { name: "Pricing", href: '/pricing-calculator' },
    { name: t.blog, href: '/blog' },
    { name: t.contact, href: '/contact-sales' },
  ];

  const partnersDropdownItems = [
    { name: t.countries, href: '/countries' },
    { name: t.partners, href: '/partners' },
    { name: t.digitalPartners, href: '/digital-partners' },
    { name: "Freelancer", href: '/freelancer-partners' },
    { name: "Sister Partners", href: '/sister-partners' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`} role="banner">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className={`flex h-16 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
            <Link to="/" className="flex items-center" aria-label="FoundStart Home">
              <span className="text-xl font-bold gradient-text">FoundStart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className={`hidden lg:flex items-center space-x-2 xl:space-x-4 ${isRTL ? 'space-x-reverse ml-6' : 'ml-6'}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Partners Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap outline-none">
                {t.partners}
                <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {partnersDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Domains Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap outline-none">
                Domains
                <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {domainsDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="w-full cursor-pointer">{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {navigationItems.map((item, index) => {
              const isActive = item.name === "Domains" 
                ? location.pathname.includes('/domain') 
                : location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Controls */}
          <div className={`hidden lg:flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <CurrencySelector />
            <LanguageToggle />
            <ThemeToggle />
            <AuthButton />
          </div>

          {/* Mobile Controls */}
          <div className={`lg:hidden flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
            <CurrencySelector />
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur border-b shadow-lg" role="dialog" aria-modal="true" aria-label="Mobile menu">
            <div className={`max-w-7xl mx-auto px-3 py-4 ${isRTL ? 'text-right' : ''}`}>
              <nav className="space-y-1" role="navigation" aria-label="Mobile navigation">
              {/* Mobile Partners Section */}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t.partners}
              </div>
              {partnersDropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-6 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.name}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-border">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
