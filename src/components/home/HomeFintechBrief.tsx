import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowRight } from 'lucide-react';

const HomeFintechBrief = ({ language, isRTL }: { language: string; isRTL: boolean }) => {
  const ar = language === 'ar';
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-4xl rounded-2xl border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="rounded-full bg-primary/10 p-4"><CreditCard className="w-8 h-8 text-primary" /></div>
        <div className="flex-1 text-center md:text-start space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">{ar ? 'طرق الدفع وحلول الفينتك' : 'Payment ways & fintech solutions'}</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {ar
              ? 'بوابات دفع وحسابات بنكية ومحافظ رقمية من شركائنا لاستقبال فلوسك بعد تأسيس شركتك.'
              : 'Payment gateways, business bank accounts and digital wallets from our partners, so you can get paid after your company is formed.'}
          </p>
        </div>
        <Button size="lg" asChild><Link to="/fintech">{ar ? 'اعرف أكثر' : 'Explore options'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
      </div>
    </section>
  );
};
export default HomeFintechBrief;
