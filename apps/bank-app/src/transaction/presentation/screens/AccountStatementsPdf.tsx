import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

import { IAccount } from '@clean-rn/account/domain';
import { IStatementsPeriod } from '@clean-rn/transaction/domain';

import { Download, ModalError, PdfDownloader, PdfViewer } from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const AccountStatementsPdf = () => {
  const { t } = useTranslation();
  const {
    params: { account, period },
  } = useRoute() as { params: { account: IAccount; period: IStatementsPeriod } };
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
        uri={`${process.env.EXPO_PUBLIC_BASE_URL_API}/app/account/${account.accountId}/statement?period=${period}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleError={handleError}
        icon={Download}
        fileName={`statement-${period}.pdf`}
      />
      <PdfViewer
        uri={`${process.env.EXPO_PUBLIC_BASE_URL_API}/app/account/${account.accountId}/statement?period=${period}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleError={handleError}
      />
    </ErrorBoundary>
  );
};
