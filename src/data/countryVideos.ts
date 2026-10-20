// New published formation videos per country. Add YouTube ids here as uploads go live.
// EN ids show on EN pages, AR ids on AR pages. A missing entry keeps the old country video.
export type CountryVideo = { en?: string; ar?: string };

export const countryVideos: Record<string, CountryVideo> = {
  // USA: { en: 'xxxxxxxxxxx', ar: 'xxxxxxxxxxx' },
};

export const getCountryVideoUrl = (countryId: string, isRTL: boolean, fallback?: string): string | undefined => {
  const entry = countryVideos[countryId.toUpperCase()];
  const id = entry ? (isRTL ? entry.ar : entry.en) : undefined;
  return id ? `https://www.youtube.com/watch?v=${id}` : fallback;
};
