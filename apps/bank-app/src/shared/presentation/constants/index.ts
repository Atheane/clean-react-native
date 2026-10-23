import { getLocales } from 'expo-localization';

export const pdfUrls = (lng: string) => ({
  legal: lng === 'fr' ? 'https://example.com/pol-data' : 'https://example.com/en/pol-data',
  cgu: `https://example.com/assets/docs/cgu.pdf`,
  cguKycProvider:
    lng === 'fr'
      ? 'https://www.kyc-provider.com/fr/cgu-conditions-generale-dutilisation/'
      : 'https://www.kyc-provider.com/general-terms-conditions-of-use/',
});

const locales = getLocales()[0];

export const APPLE_STORE_LINK = `https://apps.apple.com/${
  locales?.languageCode || 'en'
}/app/bank-app/id0000000000?l=${locales?.languageTag || 'en-GB'}`;
export const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=com.example.energyapp';
