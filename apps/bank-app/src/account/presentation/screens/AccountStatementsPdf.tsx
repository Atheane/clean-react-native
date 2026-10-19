import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

import { IAccount, IStatementsPeriod } from '@clean-rn/account/domain';

import { ModalError, WebViewer } from '@clean-rn/ui-mobile';
import { AuthError } from '@clean-rn/auth/domain';
import { ServerError } from '@clean-rn/shared/infrastructure';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { userUnauthenticated } from '../../../auth/application/commands/login';

export const AccountStatementsPdf = () => {
  const { t } = useTranslation();
  const {
    params: { account, period },
  } = useRoute() as { params: { account: IAccount; period: IStatementsPeriod } };
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);

  const dispatch = useDispatch();

  const [error, setError] = useState<Error>();
  const handleHttpError = (error: unknown) => {
    setError(error as Error);
    if (error instanceof ServerError && error.statusCode === 401) {
      dispatch(userUnauthenticated(new AuthError.UserUnauthenticated()));
    }
  };

  return error ? (
    <ModalError error={error} />
  ) : (
    <ErrorBoundary t={t}>
      <WebViewer
        uri={`${Constants.expoConfig?.extra?.BASE_URL_API}/app/account/${account.accountId}/statement?period=${period}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleHttpError={handleHttpError}
      />
    </ErrorBoundary>
  );
};
