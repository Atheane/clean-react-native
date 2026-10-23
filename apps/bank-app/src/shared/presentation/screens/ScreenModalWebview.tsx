import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import Constants from 'expo-constants';

import { WebViewer, ModalError } from '@clean-rn/ui-mobile';
import { SUPPORTED_LANGUAGES_WEBSITE } from '../constants';

const locales = getLocales();

export const ScreenModalWebview = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  return unknownError ? (
    <ModalError error={unknownError} />
  ) : (
    <WebViewer
      uri={`${Constants.expoConfig?.extra?.BASE_URL || 'https://www.example.com'}/${lng}/${uid}`}
      handleError={handleError}
    />
  );
};
