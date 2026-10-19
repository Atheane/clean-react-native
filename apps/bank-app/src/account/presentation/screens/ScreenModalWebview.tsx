import { WebViewer } from '@clean-rn/ui-mobile';
import { useRoute } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import Constants from 'expo-constants';

const locales = getLocales();

export const ScreenModalWebview = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  const lng = locales[0]?.languageCode || 'en';

  return <WebViewer uri={`${Constants.expoConfig?.extra?.BASE_URL}/${lng}/${uid}`} />;
};
