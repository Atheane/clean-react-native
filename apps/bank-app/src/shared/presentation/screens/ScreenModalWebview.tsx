import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import Constants from 'expo-constants';

import { WebViewer, ModalError } from '@clean-rn/ui-mobile';

const locales = getLocales();

export const ScreenModalWebview = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  const regionCode = locales[0]?.regionCode;
  let lng = regionCode?.toLocaleLowerCase();
  if (lng !== 'fr') lng = 'en';

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  return unknownError ? (
    <ModalError error={unknownError} />
  ) : (
    <WebViewer uri={`${Constants.expoConfig?.extra?.BASE_URL}/${lng}/${uid}`} handleError={handleError} />
  );
};
