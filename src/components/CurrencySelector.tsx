
import { useCurrency } from '@/contexts/CurrencyContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

const currencies = [
  { code: 'EGP' as const, label: '🇪🇬 EGP', name: 'Egyptian Pound' },
  { code: 'USD' as const, label: '🇺🇸 USD', name: 'US Dollar' },
  { code: 'EUR' as const, label: '🇪🇺 EUR', name: 'Euro' },
  { code: 'GBP' as const, label: '🇬🇧 GBP', name: 'British Pound' },
];

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(v) => setCurrency(v as typeof currency)}>
      <SelectTrigger className="w-[80px] h-8 text-xs">
        <DollarSign className="w-3 h-3 mr-1" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="text-xs">{c.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
