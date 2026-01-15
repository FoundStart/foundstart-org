import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Heart, MessageCircle, Mail, ExternalLink, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileDomainCardProps {
  domain: {
    name: string;
    category: string;
    hosting: string;
    price: number;
    businessType: 'Business' | 'Domain';
    buyUrl: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  showCheckbox?: boolean;
}

const MobileDomainCard = ({ 
  domain, 
  isFavorite, 
  onToggleFavorite,
  isSelected = false,
  onSelect,
  showCheckbox = false
}: MobileDomainCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-4 shadow-sm transition-all touch-manipulation",
      isSelected && "ring-2 ring-primary bg-primary/5"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {showCheckbox && (
            <button 
              onClick={onSelect}
              className={cn(
                "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all touch-manipulation mt-0.5",
                isSelected 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground/50 hover:border-primary"
              )}
            >
              {isSelected && (
                <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{domain.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{domain.category}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold text-primary">${domain.price}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-1 touch-manipulation"
          >
            <Heart 
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )} 
            />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
          {domain.hosting}
        </Badge>
        <Badge 
          variant={domain.businessType === 'Business' ? 'default' : 'outline'}
          className="text-[10px] px-2 py-0.5"
        >
          {domain.businessType}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button asChild size="sm" className="flex-1 h-10 text-xs touch-manipulation">
          <Link to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}>
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            Inquire
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10 touch-manipulation" asChild>
          <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 text-green-500" />
          </a>
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10 touch-manipulation" asChild>
          <a href="mailto:momo@foundstart.org">
            <Mail className="w-4 h-4" />
          </a>
        </Button>
        {domain.buyUrl && (
          <Button variant="outline" size="icon" className="h-10 w-10 touch-manipulation" asChild>
            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileDomainCard;
