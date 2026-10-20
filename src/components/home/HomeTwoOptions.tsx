import { Link } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';

const HomeTwoOptions = ({ language, isRTL }: { language: string; isRTL: boolean }) => {
  const { user } = useAuth();
  const ar = language === 'ar';
  const formationPath = '/dashboard/formation';
  const items = [
    { icon: LayoutDashboard, t: ar ? 'لوحة عميل كاملة' : 'A full client dashboard', d: ar ? 'تابع شركتك ومستنداتك ومدفوعاتك من مكان واحد، مثل كبرى شركات التأسيس.' : 'Track your company, documents and payments in one place, like the big formation companies.' },
    { icon: ClipboardCheck, t: ar ? 'متطلبات كل دولة' : "Each country's requirements", d: ar ? 'شوف المتطلبات والسعر داخل اللوحة قبل ما تدفع.' : 'See the requirements and the price inside the dashboard before you pay.' },
    { icon: Package, t: ar ? 'خدمات إضافية' : 'Add-on services', d: ar ? 'أضف الخدمات اللي تحتاجها لشركتك بعد التأسيس.' : 'Add the services your company needs after formation.' },
  ];
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl md:text-4xl font-extrabold">{ar ? 'افتح شركتك مع FoundStart' : 'Open your company with FoundStart'}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {ar ? 'FoundStart منصة متكاملة لتأسيس الشركات وخدماتها. نفتح لك شركة في أي دولة بأسعارنا.' : 'FoundStart is a complete platform for company formation and services. We open a company for you in any country at our prices.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border bg-card p-6">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-1">{t}</h3>
              <p className="text-muted-foreground text-sm">{d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild><Link to={user ? formationPath : '/auth'} state={{ redirectTo: formationPath }}>{ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/countries">{ar ? 'الدول والأسعار' : 'Countries & prices'}</Link></Button>
        </div>
      </div>
    </section>
  );
};
export default HomeTwoOptions;
