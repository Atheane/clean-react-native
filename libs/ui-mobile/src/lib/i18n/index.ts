import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../translation';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // necessary for Android compatibility
  resources,
  lng: 'fr',
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
