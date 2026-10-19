import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { IAccount, IStatementsPeriod } from '@clean-rn/account/domain';

import { useEffect } from 'react';

import { WebViewer } from '@clean-rn/ui-mobile';
import { AuthError } from '@clean-rn/auth/domain';
import { ServerError } from '@clean-rn/shared/infrastructure';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

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

  useEffect(() => {
    if (!accessToken) {
      dispatch(userUnauthenticated(new AuthError.UserUnauthenticated()));
    }
  }, [dispatch, accessToken]);

  const handleHttpError = (error: unknown) => {
    if (error instanceof ServerError && error.statusCode === 401) {
      dispatch(userUnauthenticated(new AuthError.UserUnauthenticated()));
    } else {
      dispatch(showUnknownError(error as Error));
    }
  };

  return (
    <ErrorBoundary t={t}>
      <WebViewer
        uri={`https://sandbox.example.com/app/account/${account.accountId}/statement?period=${period}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleHttpError={handleHttpError}
      />
    </ErrorBoundary>
  );
};
