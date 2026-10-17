import { getLocales } from 'expo-localization';

const locales = getLocales();

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const toLocalDateString = (date: Date) => {
  return date.toLocaleDateString(locales[0], options);
};

export const todayYear = () => new Date().getFullYear();
