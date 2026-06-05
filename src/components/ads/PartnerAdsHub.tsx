import { useMemo } from 'react';
import PartnerBannerStrip, { BannerAdItem } from './PartnerBannerStrip';
import PartnerPopAd, { PopAdItem } from './PartnerPopAd';
import { digitalPartnersData } from '@/data/digitalPartnersData';
import { freelancerPartnersData } from '@/data/freelancerPartnersData';
import { countriesData } from '@/data/countriesData';

type CountryPartnerFlat = { country: string; countryId: string; name: string; url: string };
const countryPartners: CountryPartnerFlat[] = countriesData.flatMap((c: any) =>
  (c.partners ?? []).map((p: any) => ({
    country: c.name, countryId: c.id, name: p.name, url: p.url,
  })),
);

const PartnerAdsHub = () => {
  const digitalBanner: BannerAdItem[] = useMemo(
    () => digitalPartnersData.map((p) => ({
      platform: p.platform, url: p.url, tag: 'Digital Partner', href: '/digital-partners',
    })),
    [],
  );

  const freelancerBanner: BannerAdItem[] = useMemo(
    () => freelancerPartnersData.map((p) => ({
      platform: p.platform, url: p.url, tag: 'Freelancer', href: '/freelancer-partners',
    })),
    [],
  );

  const countryBanner: BannerAdItem[] = useMemo(
    () => countryPartners.map((p) => ({
      platform: `${p.name} · ${p.country}`,
      url: p.url,
      tag: 'Country Partner',
    })),
    [],
  );

  const digitalPop: PopAdItem[] = useMemo(() => {
    const withCoupon = digitalPartnersData.filter((p) => p.coupon);
    const pool = withCoupon.length > 0 ? withCoupon : digitalPartnersData;
    return pool.map((p) => ({
      platform: p.platform, url: p.url, niche: p.niche, coupon: p.coupon || undefined,
    }));
  }, []);

  const freelancerPop: PopAdItem[] = useMemo(
    () => freelancerPartnersData.map((p) => ({
      platform: p.platform, url: p.url, niche: p.category,
    })),
    [],
  );

  const countryPop: PopAdItem[] = useMemo(
    () => countryPartners.map((p) => ({
      platform: p.name,
      url: p.url,
      niche: `Trusted partner for ${p.country} company formation`,
    })),
    [],
  );

  return (
    <>
      {/* Banners — staggered positions so they don't overlap */}
      <PartnerBannerStrip
        items={digitalBanner}
        storageKey="fs_banner_digital"
        position="bottom-left"
        accentClassName="bg-primary"
        label="Digital Partner"
        intervalMs={6000}
      />
      <PartnerBannerStrip
        items={freelancerBanner}
        storageKey="fs_banner_freelancer"
        position="bottom-right"
        accentClassName="bg-emerald-500"
        label="Freelancer"
        intervalMs={7000}
        delayMs={4000}
      />
      <PartnerBannerStrip
        items={countryBanner}
        storageKey="fs_banner_country"
        position="top-center"
        accentClassName="bg-amber-500"
        label="Country Partner"
        intervalMs={8000}
        delayMs={10000}
      />

      {/* Pop ads — different triggers so they don't all fire at once */}
      <PartnerPopAd
        items={digitalPop}
        storageKey="fs_pop_digital"
        badgeLabel="Exclusive Digital Partner Offer"
        trigger={{ type: 'exit-intent' }}
      />
      <PartnerPopAd
        items={freelancerPop}
        storageKey="fs_pop_freelancer"
        badgeLabel="Earn With Our Freelancer Partner"
        trigger={{ type: 'timer', delayMs: 35000 }}
      />
      <PartnerPopAd
        items={countryPop}
        storageKey="fs_pop_country"
        badgeLabel="Featured Country Partner"
        trigger={{ type: 'scroll', percent: 65 }}
      />
    </>
  );
};

export default PartnerAdsHub;
