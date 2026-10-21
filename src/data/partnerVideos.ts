import { countryVideos } from './countryVideos';
import { walkthroughVideo } from './walkthroughVideo';

// Our own "how to open a company with <partner>" videos. Add YouTube ids as they go live.
// Key: partner name as in countriesData. A missing entry falls back to the country video.
export type PartnerVideo = { en?: string; ar?: string };
export const partnerVideos: Record<string, PartnerVideo> = {
  Doola: { en: 'bno9wQIbX4I', ar: '3yuIo4WCdhc' },
  '1office': { en: 'lfGI_zlTgBM', ar: '_2ZIO0UB3Es' },
  Privatily: { en: 'G_CVBmKCUC0', ar: '651JaZRI7aY' },
};

const LAUNCH_EN = 'f4HvKTM3zoc';
export const getPartnerVideoId = (partnerName: string, countryId: string, isRTL: boolean): string => {
  const own = partnerVideos[partnerName];
  const c = countryVideos[countryId.toUpperCase()];
  return (isRTL ? own?.ar ?? c?.ar ?? walkthroughVideo.ar : own?.en ?? c?.en ?? LAUNCH_EN) as string;
};
