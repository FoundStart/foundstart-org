import { walkthroughVideo } from './walkthroughVideo';
// New published formation videos per country. Add YouTube ids here as uploads go live.
// EN ids show on EN pages, AR ids on AR pages. A missing entry keeps the old country video.
export type CountryVideo = { en?: string; ar?: string };

export const countryVideos: Record<string, CountryVideo> = {
  USA: { en: 'f4HvKTM3zoc' },
  UK: { en: 'f4HvKTM3zoc' },
  CA: { en: 'f4HvKTM3zoc' },
  EE: { en: '6At2MERCA-Q' },
  FI: { en: 'auhn3ZxmidA' },
  SE: { en: 'swzSiHgDGfg' },
  LV: { en: 'Qf_kXuZPCvc' },
  LT: { en: 'm2b6P4Cq8pQ' },
  IE: { en: 'xkePfgv5ST4' },
  EG: { en: '7JcQLG2-GKM' },
};

// Old per-country demo videos are retired. No entry: EN shows the FoundStart 2.0 launch video, AR shows the Arabic walkthrough.
const LAUNCH_EN = 'f4HvKTM3zoc';
export const getCountryVideoUrl = (countryId: string, isRTL: boolean, _legacy?: string): string => {
  const entry = countryVideos[countryId.toUpperCase()];
  const id = (isRTL ? entry?.ar : entry?.en) ?? (isRTL ? walkthroughVideo.ar : LAUNCH_EN) ?? LAUNCH_EN;
  return `https://www.youtube.com/watch?v=${id}`;
};
