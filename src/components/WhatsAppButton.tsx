import { waLink } from '@/lib/whatsapp';
import { useTranslation } from '@/contexts/TranslationContext';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const WhatsAppButton = ({ variant = 'default', size = 'default', className = '' }: WhatsAppButtonProps) => {
  const { isRTL } = useTranslation();
  const handleWhatsAppClick = () => {
    window.open(waLink(isRTL), '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`${className} bg-green-600 hover:bg-green-700 text-white`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton;