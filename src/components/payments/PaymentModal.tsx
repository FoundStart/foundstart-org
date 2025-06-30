
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import KashierPayment from './KashierPayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  planId?: string;
  planName?: string;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  currency = 'USD', 
  planId, 
  planName 
}: PaymentModalProps) => {
  const handleSuccess = () => {
    onClose();
  };

  const handleError = (error: string) => {
    console.error('Payment error:', error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        <KashierPayment
          amount={amount}
          currency={currency}
          planId={planId}
          planName={planName}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
