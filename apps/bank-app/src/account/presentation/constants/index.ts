import { eventsCardsContent } from './eventsCardsContent';

import { getLocales } from 'expo-localization';

const locales = getLocales()[0];

export const APPLE_STORE_LINK = `https://apps.apple.com/${
  locales?.languageCode || 'en'
}/app/bank-app/id0000000000?l=${locales?.languageTag || 'en-GB'}`;
export const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=com.example.energyapp';

export { eventsCardsContent };
