import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
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

const partnersFor = (id: string) => countryPartners.filter((p) => p.countryId === id);

const PartnerAdsHub = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMobile = useIsMobile();

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

  // Single unified pop pool for home page (one random partner from all categories)
  const homePopPool: PopAdItem[] = useMemo(() => {
    const all = [...digitalPop, ...freelancerPop, ...countryPop];
    return all;
  }, [digitalPop, freelancerPop, countryPop]);

  // Per-jurisdiction (US / UK / Canada) campaigns
  const buildBanner = (cid: string, label: string): BannerAdItem[] =>
    partnersFor(cid).map((p) => ({
      platform: `${p.name} · ${label}`,
      url: p.url,
      tag: `${label} Partner`,
    }));

  const buildPop = (cid: string, label: string): PopAdItem[] =>
    partnersFor(cid).map((p) => ({
      platform: p.name,
      url: p.url,
      niche: `Featured ${label} formation partner — trusted by founders worldwide`,
    }));

  const usaBanner = useMemo(() => buildBanner('USA', 'USA'), []);
  const ukBanner = useMemo(() => buildBanner('UK', 'UK'), []);
  const canadaBanner = useMemo(() => buildBanner('Canada', 'Canada'), []);
  const usaPop = useMemo(() => buildPop('USA', 'USA'), []);
  const ukPop = useMemo(() => buildPop('UK', 'UK'), []);
  const canadaPop = useMemo(() => buildPop('Canada', 'Canada'), []);

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

      {/* Pop ads — mobile always gets ONE; desktop: one on home, full stack elsewhere */}
      {isMobile ? (
        <PartnerPopAd
          items={homePopPool}
          storageKey="fs_pop_mobile"
          badgeLabel="Featured Partner Offer"
          trigger={{ type: 'exit-intent' }}
          campaign="mobile-single"
        />
      ) : isHome ? (
        <PartnerPopAd
          items={homePopPool}
          storageKey="fs_pop_home"
          badgeLabel="Featured Partner Offer"
          trigger={{ type: 'exit-intent' }}
          campaign="home-single"
        />
      ) : (
        <>
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
            campaign="country-all"
          />
          {usaPop.length > 0 && (
            <PartnerPopAd
              items={usaPop}
              storageKey="fs_pop_usa"
              badgeLabel="Top USA Formation Partner"
              trigger={{ type: 'timer', delayMs: 55000 }}
              campaign="country-USA"
            />
          )}
          {ukPop.length > 0 && (
            <PartnerPopAd
              items={ukPop}
              storageKey="fs_pop_uk"
              badgeLabel="Top UK Formation Partner"
              trigger={{ type: 'scroll', percent: 80 }}
              campaign="country-UK"
            />
          )}
          {canadaPop.length > 0 && (
            <PartnerPopAd
              items={canadaPop}
              storageKey="fs_pop_canada"
              badgeLabel="Top Canada Formation Partner"
              trigger={{ type: 'timer', delayMs: 75000 }}
              campaign="country-Canada"
            />
          )}
        </>
      )}

      {/* USA / UK / Canada banners — appear after primary banners */}
      {usaBanner.length > 0 && (
        <PartnerBannerStrip
          items={usaBanner}
          storageKey="fs_banner_usa"
          position="bottom-center"
          accentClassName="bg-blue-600"
          label="USA Partner"
          intervalMs={9000}
          delayMs={14000}
          campaign="country-USA"
        />
      )}
      {ukBanner.length > 0 && (
        <PartnerBannerStrip
          items={ukBanner}
          storageKey="fs_banner_uk"
          position="bottom-left"
          accentClassName="bg-red-600"
          label="UK Partner"
          intervalMs={9000}
          delayMs={20000}
          campaign="country-UK"
        />
      )}
      {canadaBanner.length > 0 && (
        <PartnerBannerStrip
          items={canadaBanner}
          storageKey="fs_banner_canada"
          position="bottom-right"
          accentClassName="bg-rose-500"
          label="Canada Partner"
          intervalMs={9000}
          delayMs={26000}
          campaign="country-Canada"
        />
      )}

    </>
  );
};

export default PartnerAdsHub;
