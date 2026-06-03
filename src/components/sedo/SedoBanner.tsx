import { useMemo } from 'react';

const SEDO_LINK = 'https://sedo.com/?language=us&campaignId=336206';

type BannerSize = '160x600' | '336x280' | '728x90';

interface BannerDef {
  src: string;
  width: number;
  height: number;
  size: BannerSize;
}

const BANNERS: BannerDef[] = [
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_160600_01.jpg', width: 160, height: 600, size: '160x600' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_160600_02.jpg', width: 160, height: 600, size: '160x600' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_160600_03.jpg', width: 160, height: 600, size: '160x600' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_160600_04.jpg', width: 160, height: 600, size: '160x600' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_336280_01.jpg', width: 336, height: 280, size: '336x280' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_336280_02.jpg', width: 336, height: 280, size: '336x280' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_336280_03.jpg', width: 336, height: 280, size: '336x280' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_336280_04.jpg', width: 336, height: 280, size: '336x280' },
  { src: 'https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_72890_01.jpg', width: 728, height: 90, size: '728x90' },
];

interface SedoBannerProps {
  /** Filter by ad size. Omit to pick across all. */
  size?: BannerSize;
  /** Deterministic seed (e.g. blog slug + slot name) so SSR/CSR match and each slot stays stable. */
  seed?: string;
  className?: string;
}

const hashSeed = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const SedoBanner = ({ size, seed, className }: SedoBannerProps) => {
  const banner = useMemo(() => {
    const pool = size ? BANNERS.filter(b => b.size === size) : BANNERS;
    const idx = seed ? hashSeed(seed) % pool.length : Math.floor(Math.random() * pool.length);
    return pool[idx];
  }, [size, seed]);

  if (!banner) return null;

  return (
    <a
      href={SEDO_LINK}
      target="_parent"
      rel="noopener"
      className={`inline-block ${className ?? ''}`}
      aria-label="Sedo domain marketplace"
    >
      <img
        src={banner.src}
        width={banner.width}
        height={banner.height}
        alt="Sedo — premium domains marketplace"
        loading="lazy"
        className="max-w-full h-auto"
      />
    </a>
  );
};

export default SedoBanner;
