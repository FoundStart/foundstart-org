
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
    { name: t.services, href: '/services' },
    { name: t.countries, href: '/countries' },
    { name: t.partners, href: '/partners' },
    { name: t.digitalPartners, href: '/digital-partners' },
    { name: "Freelancer Partners", href: '/freelancer-partners' },
    { name: t.blog, href: '/blog' },
    { name: t.contact, href: '/contact-sales' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex h-14 md:h-16 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Link to="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm">FS</span>
              </div>
              <span className="text-lg md:text-xl font-bold gradient-text">FoundStart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-6 xl:space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons & Controls */}
          <div className={`hidden lg:flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            <ThemeToggle />
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className={`lg:hidden flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              {isMenuOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className={`px-2 pt-2 pb-4 space-y-1 sm:px-3 ${isRTL ? 'text-right' : ''}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-3 text-base font-medium hover:text-primary transition-colors hover:bg-muted/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-border mt-2 pt-4">
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
