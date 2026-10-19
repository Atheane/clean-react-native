import { PdfViewer } from '@clean-rn/ui-mobile';
import { useRoute } from '@react-navigation/native';
import { getLocales } from 'expo-localization';

import { BASE_URL } from '../constants';

const locales = getLocales();

export const ScreenModalWebview = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  const lng = locales[0]?.languageCode || 'en';

  return <PdfViewer url={`${BASE_URL}/${lng}/${uid}`} />;
};
