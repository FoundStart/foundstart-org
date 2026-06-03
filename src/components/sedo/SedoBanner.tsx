import { useMemo, useState } from 'react';

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
  size?: BannerSize;
  seed?: string;
  className?: string;
}

const hashSeed = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const SedoBanner = ({ size, seed, className }: SedoBannerProps) => {
  const [errored, setErrored] = useState(false);

  const banner = useMemo(() => {
    const pool = size ? BANNERS.filter(b => b.size === size) : BANNERS;
    const idx = seed ? hashSeed(seed) % pool.length : Math.floor(Math.random() * pool.length);
    return pool[idx];
  }, [size, seed]);

  if (!banner) return null;

  return (
    <a
      href={SEDO_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block relative ${className ?? ''}`}
      aria-label="Sedo domain marketplace"
      style={{ maxWidth: banner.width, width: '100%' }}
    >
      {!errored ? (
        <img
          src={banner.src}
          width={banner.width}
          height={banner.height}
          alt="Sedo — premium domains marketplace"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="max-w-full h-auto block"
        />
      ) : (
        <div
          role="img"
          aria-label="Sedo premium domains marketplace (fallback)"
          className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/15 via-purple-500/10 to-primary/5 border border-primary/30 rounded-md p-3"
          style={{ width: '100%', aspectRatio: `${banner.width} / ${banner.height}`, maxWidth: banner.width }}
        >
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">Premium Domains</div>
          <div className="text-sm md:text-base font-bold text-foreground mt-1">Sedo Marketplace</div>
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Click to browse →</div>
          <div className="text-[10px] text-muted-foreground/70 mt-2">{banner.size}</div>
        </div>
      )}
    </a>
  );
};

export default SedoBanner;
