import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { useNavigation } from '@react-navigation/native';

import { ModalError, PdfDownloader, PdfViewer, Download } from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../hoc';
import { SUPPORTED_LANGUAGES_WEBSITE, pdfUrls } from '../constants';

export const CguPdf = () => {
  const { t } = useTranslation();

  const locales = getLocales();

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  const navigation = useNavigation();

  const nextNavigation = () => {
    navigation.goBack();
  };

  return unknownError ? (
    <ModalError error={unknownError} />
  ) : (
    <ErrorBoundary t={t}>
      <PdfDownloader
        uri={pdfUrls(lng).cgu}
        handleError={handleError}
        icon={Download}
        fileName={`terms.pdf`}
        nextNavigation={nextNavigation}
      />
      <PdfViewer uri={pdfUrls(lng).cgu} handleError={handleError} />
    </ErrorBoundary>
  );
};
