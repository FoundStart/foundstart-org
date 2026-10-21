import { countryVideos } from './countryVideos';
import { walkthroughVideo } from './walkthroughVideo';

// Our own "how to open a company with <partner>" videos. Add YouTube ids as they go live.
// Key: partner name as in countriesData. A missing entry falls back to the country video.
export type PartnerVideo = { en?: string; ar?: string };
export const partnerVideos: Record<string, PartnerVideo> = {
  // Doola: {},
  // '1office': {},
  // Privatily: {},
};

const LAUNCH_EN = 'f4HvKTM3zoc';
export const getPartnerVideoId = (partnerName: string, countryId: string, isRTL: boolean): string => {
  const own = partnerVideos[partnerName];
  const c = countryVideos[countryId.toUpperCase()];
  return (isRTL ? own?.ar ?? c?.ar ?? walkthroughVideo.ar : own?.en ?? c?.en ?? LAUNCH_EN) as string;
};
