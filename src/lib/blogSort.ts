const AR_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export const isArPost = (p: { title: string; slug: string }) =>
  /[\u0600-\u06FF]/.test(p.title) || p.slug.endsWith('-ar');

export const postTime = (d: string) => {
  const m = (d || '').match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  const i = m ? AR_MONTHS.indexOf(m[2]) : -1;
  const t = i >= 0 ? Date.UTC(+m![3], i, +m![1]) : Date.parse((d || '') + ' UTC');
  return isNaN(t) ? 0 : t;
};

// Posts for one language only, newest first (ties keep source order).
export function postsForLanguage<T extends { title: string; slug: string; date: string }>(posts: T[], language: string): T[] {
  return posts
    .filter((p) => (language === 'ar' ? isArPost(p) : !isArPost(p)))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => postTime(b.p.date) - postTime(a.p.date) || a.i - b.i)
    .map((x) => x.p);
}
