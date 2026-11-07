import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getLocales } from 'expo-localization';

import { WebViewer, ModalError } from '@clean-rn/ui-mobile';
import { SUPPORTED_LANGUAGES_WEBSITE } from '../constants';
import { useTranslation } from 'react-i18next';

const locales = getLocales();

export const ScreenModalWebview = () => {
  const {
    params: { uid, url },
  } = useRoute() as { params: { uid?: string; url?: string } };

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  const { t } = useTranslation();

  const uri = url || `${process.env.EXPO_PUBLIC_BASE_URL || 'https://www.example.com'}/${lng}/${uid}`;
  return unknownError ? (
    <ModalError
      error={unknownError}
      errorCode={t('modal-error.code')}
      errorDetails={t('modal-error.details')}
      errorStack={t('modal-error.stack')}
      genericMessage={t('errors.other')}
    />
  ) : (
    <WebViewer uri={uri} handleError={handleError} />
  );
};
