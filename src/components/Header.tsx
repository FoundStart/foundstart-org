
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AuthButton from './AuthButton';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '@/contexts/TranslationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();

  const navigationItems = [
    { name: t.countries, href: '/countries' },
    { name: t.partners, href: '/partners' },
    { name: t.digitalPartners, href: '/digital-partners' },
    { name: "Domains", href: '/domains' },
    { name: "Freelancer Partners", href: '/freelancer-partners' },
    { name: t.blog, href: '/blog' },
    { name: t.contact, href: '/contact-sales' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
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
            className={`hidden lg:flex items-center space-x-6 xl:space-x-8 ${isRTL ? 'space-x-reverse ml-auto' : 'ml-auto'}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
                aria-label={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className={`hidden lg:flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            <ThemeToggle />
            <AuthButton />
          </div>

          {/* Mobile Controls */}
          <div className={`lg:hidden flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
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
