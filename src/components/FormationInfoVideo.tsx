const sources = {
  CA: 'https://www.canada.ca/en/services/business/start/register-with-gov/register-corp.html',
  EG: 'https://gafiadmin.gafi.gov.eg/media/n22f13kw/isc-guide-2026_eng_19102026_final.pdf',
};
export default function FormationInfoVideo({countryId, ar}: {countryId: 'CA' | 'EG'; ar: boolean}) {
  const country = countryId === 'CA' ? 'canada' : 'egypt';
  const name = countryId === 'CA' ? (ar ? 'كندا' : 'Canada') : (ar ? 'مصر' : 'Egypt');
  const stem = `/media/formation-${country}-${ar ? 'ar' : 'en'}`;
  return <div className="space-y-2" data-formation-video={countryId}>
    <p className="text-sm font-medium">{ar ? `مقدمة عن تأسيس شركة في ${name}` : `${name} company formation: an introduction`}</p>
    <video key={stem} controls playsInline preload="none" poster={`${stem}.jpg`} className="w-full aspect-video rounded-lg bg-black" aria-label={ar ? `فيديو معلومات عن تأسيس شركة في ${name}` : `${name} formation information video`}>
      <source src={`${stem}.mp4`} type="video/mp4" />
      <track kind="captions" src={`${stem}.vtt`} srcLang={ar ? 'ar' : 'en'} label={ar ? 'العربية' : 'English'} />
      <a href={`${stem}.mp4`}>{ar ? 'افتح الفيديو' : 'Open video'}</a>
    </video>
    <p className="text-xs text-muted-foreground">{ar ? 'معلومات عامة، وليست استشارة قانونية أو ضريبية. المصدر: ' : 'General information, not legal or tax advice. Source: '}<a className="underline underline-offset-2" href={sources[countryId]} target="_blank" rel="noopener noreferrer">{countryId === 'CA' ? (ar ? 'حكومة كندا' : 'Government of Canada') : (ar ? 'دليل هيئة الاستثمار' : 'GAFI Investor Service Center guide')}</a></p>
  </div>;
}
