export const WA_NUMBER = '201002905764';
export const waLink = (isRTL: boolean) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    isRTL ? 'مرحبًا FoundStart، أريد الاستفسار عن خدماتكم.' : 'Hi FoundStart, I would like to ask about your services.'
  )}`;
