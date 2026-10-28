import { getLocales } from 'expo-localization';
import { eventsCardsContent } from './eventsCardsContent';
import { Colors } from './Colors';
import { Fonts, FontNames } from './Fonts';
import { NEEDS_SMALL_TEXT } from './SmallText';

const pdfUrls = (lng: string) => ({
  legal: lng === 'fr' ? 'https://example.com/pol-data' : 'https://example.com/en/pol-data',
  cgu: `https://example.com/assets/docs/cgu.pdf`,
  cguKycProvider:
    lng === 'fr'
      ? 'https://www.kyc-provider.com/fr/cgu-conditions-generale-dutilisation/'
      : 'https://www.kyc-provider.com/general-terms-conditions-of-use/',
});

const locales = getLocales()[0];

const APPLE_STORE_LINK = `https://apps.apple.com/${
  locales?.languageCode || 'en'
}/app/bank-app/id6478209342`;
const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=com.example.bankapp';

const SUPPORTED_LANGUAGES_WEBSITE = ['en', 'fr'];

export {
  GOOGLE_PLAY_LINK,
  APPLE_STORE_LINK,
  pdfUrls,
  eventsCardsContent,
  SUPPORTED_LANGUAGES_WEBSITE,
  Colors,
  Fonts,
  FontNames,
  NEEDS_SMALL_TEXT,
};
