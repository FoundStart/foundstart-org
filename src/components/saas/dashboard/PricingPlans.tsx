import PricingTiers from '@/components/pricing/PricingTiers';

const PricingPlans = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pricing Plans</h1>
        <p className="text-muted-foreground">
          Choose your jurisdiction and tier to get started or upgrade.
        </p>
      </div>
      <PricingTiers />
    </div>
  );
};

export default PricingPlans;
