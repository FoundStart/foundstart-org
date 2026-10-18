// One entry per course per language. Parts come from mediaVideos (category matches).
// To add a course: add a playlist entry here and its videos to mediaVideos.ts.
import type { MediaCategory, MediaLang } from './mediaVideos';
export interface CoursePlaylist {
  lang: MediaLang;
  category: MediaCategory;
  playlistId: string; // YouTube playlist id
  title: string;
  description: string;
}
export const coursePlaylists: CoursePlaylist[] = [
  { lang: 'en', category: 'course-dt', playlistId: 'PLaFapNxU4Ol0', title: 'Domain Trading Course', description: 'How the domain world works, what makes a name valuable, how to find, buy and sell domains, and a 90-day action plan. Built on real sales.' },
  { lang: 'en', category: 'course-dp', playlistId: 'PLeXn_nuZ5VA8', title: 'Digital Products Course', description: 'From PLR products and store setup to listings, marketing, scaling and legal basics for selling digital products online.' },
  { lang: 'ar', category: 'course-dt', playlistId: 'PLIHkeadn4JWc', title: 'كورس تجارة الدومينات', description: 'إزاي بيشتغل عالم الدومينات، إيه اللي بيخلي الاسم غالي، وإزاي تلاقي وتشتري وتبيع، وخطة تسعين يوم. مبني على صفقات حقيقية.' },
  { lang: 'ar', category: 'course-dp', playlistId: 'PLdzA84ehIoPs', title: 'كورس المنتجات الرقمية', description: 'من منتجات PLR وإعداد المتجر لحد تحسين القوائم والتسويق والدروب شيبينج الرقمي.' },
];
