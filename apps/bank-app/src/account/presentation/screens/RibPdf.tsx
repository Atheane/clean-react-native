import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

import { IAccount } from '@clean-rn/account/domain';
import { ModalError, PdfViewer, PdfDownloader, Download } from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const RibPdf = () => {
  const { t } = useTranslation();
  const {
    params: { account },
  } = useRoute() as { params: { account: IAccount } };
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth);

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  return unknownError ? (
    <ModalError error={unknownError} />
  ) : (
    <ErrorBoundary t={t}>
      <PdfDownloader
        uri={`${Constants.expoConfig?.extra?.BASE_URL_API}/app/account/${account.accountId}/rib`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleError={handleError}
        icon={Download}
        fileName={`account-details.pdf`}
      />
      <PdfViewer
        uri={`${Constants.expoConfig?.extra?.BASE_URL_API}/app/account/${account.accountId}/rib`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleError={handleError}
      />
    </ErrorBoundary>
  );
};
