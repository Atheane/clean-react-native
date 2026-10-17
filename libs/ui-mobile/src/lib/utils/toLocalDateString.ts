import { getLocales, Locale } from 'expo-localization';

const locales: Locale[] = getLocales();

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const toLocalDateString = (date: Date) => {
  if (locales && locales.length > 0 && locales[0].regionCode) {
    return date.toLocaleDateString(locales[0].regionCode, options);
  }
  return  null;
};

export const todayYear = () => new Date().getFullYear();
