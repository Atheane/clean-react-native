import { getLocales, Locale } from 'expo-localization';

const locales: Locale[] = getLocales();

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const toLocalDateString = (date: Date) => {
  try {
    return date.toLocaleDateString(locales[0].languageCode, options);
  } catch (e: unknown) {
    return date.toLocaleDateString('fr', options);
  }
};

export const todayYear = () => new Date().getFullYear();
