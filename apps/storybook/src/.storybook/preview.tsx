import { WithTheme, WithFont, WithTranslations } from '../wrappers';
import Geocoder from 'react-native-geocoding';

export const parameters = {
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

export const decorators = [WithTheme, WithFont, WithTranslations];
