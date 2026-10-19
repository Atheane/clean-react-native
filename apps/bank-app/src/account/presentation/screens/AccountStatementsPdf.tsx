import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

import { IAccount, IStatementsPeriod } from '@clean-rn/account/domain';

import { ModalError, WebViewer } from '@clean-rn/ui-mobile';
import { ServerError } from '@clean-rn/shared/infrastructure';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { IAuthStackPages } from '../../../shared/presentation/types';

export const AccountStatementsPdf = () => {
  const { t } = useTranslation();
  const {
    params: { account, period },
  } = useRoute() as { params: { account: IAccount; period: IStatementsPeriod } };
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);

  const [userUnauthenticated, setUserUnauthenticated] = useState<Error>();

  const [unknownError, setUnknownError] = useState<Error>();

  const navigation = useNavigation();
  const handleError = (error: unknown) => {
    if (error instanceof ServerError && error.statusCode === 401) {
      setUserUnauthenticated(userUnauthenticated);
      navigation.goBack();
      navigation.navigate(IAuthStackPages.LOGIN as never);
    } else {
      setUnknownError(error as Error);
    }
  };

  return userUnauthenticated ? null : unknownError ? (
    <ModalError error={unknownError} />
  ) : (
    <ErrorBoundary t={t}>
      <WebViewer
        uri={`${Constants.expoConfig?.extra?.BASE_URL_API}/app/account/${account.accountId}/statement?period=${period}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        handleError={handleError}
      />
    </ErrorBoundary>
  );
};
