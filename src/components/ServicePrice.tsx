import { useCurrency } from '@/contexts/CurrencyContext';
export default function ServicePrice({ amount }: { amount: number }) {
  const { format } = useCurrency();
  return <bdi>{format(amount)}</bdi>;
}
export function ServicePriceText({ value }: { value: string }) {
  const { format } = useCurrency();
  return <bdi>{value.replace(/\$([\d,]+(?:\.\d+)?)/g, (_, n) => format(Number(n.replaceAll(',', ''))))}</bdi>;
}
