export const pdfUrls = (lng: string) => ({
  legal: lng === 'fr' ? 'https://example.com/pol-data' : 'https://example.com/en/pol-data',
  cgu: `https://example.com/assets/docs/cgu.pdf`,
  cguKycProvider:
    lng === 'fr'
      ? 'https://www.kyc-provider.com/fr/cgu-conditions-generale-dutilisation/'
      : 'https://www.kyc-provider.com/general-terms-conditions-of-use/',
});
