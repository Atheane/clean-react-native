import i18n from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';

import { fr, en } from '../translation';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const locales = getLocales();
const lng = locales && locales.length > 0 ? locales[0].languageCode : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // necessary for Android compatibility
  resources: { fr, en },
  lng,
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
