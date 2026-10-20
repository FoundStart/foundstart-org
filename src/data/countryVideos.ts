// New published formation videos per country. Add YouTube ids here as uploads go live.
// EN ids show on EN pages, AR ids on AR pages. A missing entry keeps the old country video.
export type CountryVideo = { en?: string; ar?: string };

export const countryVideos: Record<string, CountryVideo> = {
  EE: { en: '6At2MERCA-Q' },
  FI: { en: 'auhn3ZxmidA' },
  SE: { en: 'swzSiHgDGfg' },
  LV: { en: 'Qf_kXuZPCvc' },
  // LT: { en: '' }, IE: { en: '' }, EG: { en: '' },  (pending uploads)
};

export const getCountryVideoUrl = (countryId: string, isRTL: boolean, fallback?: string): string | undefined => {
  const entry = countryVideos[countryId.toUpperCase()];
  const id = entry ? (isRTL ? entry.ar : entry.en) : undefined;
  return id ? `https://www.youtube.com/watch?v=${id}` : fallback;
};
