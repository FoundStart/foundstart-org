type CountryPartnerState = { id: string; name: string; offerAvailable?: boolean };

// A missing partner must never inherit another country's formation offer.
export function countryPartnerEmptyState(country: CountryPartnerState, ar: boolean): string {
  if (country.id === 'EG') {
    return ar ? 'التأسيس في مصر عن طريق FoundStart.' : 'Egypt formation is handled by FoundStart.';
  }
  if (country.offerAvailable === false) {
    return ar
      ? `لا تقدم FoundStart حاليا خدمة تأسيس في ${country.name}، ولا يوجد شريك تأسيس مؤكد معروض هنا.`
      : `FoundStart does not currently offer formation in ${country.name}, and no confirmed formation partner is listed here.`;
  }
  return ar
    ? `لا يوجد شريك تأسيس مؤكد معروض لـ${country.name} حاليا.`
    : `No confirmed formation partner is currently listed for ${country.name}.`;
}
