import { select, put, call } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';
import { jwtDecode } from 'jwt-decode';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { refreshSuccess } from '../../../auth/application/commands';
import { selectAuth } from '../../../auth/application/state-management/selectors';
// Fonction helper pour vérifier et rafraîchir le token
export function* ensureTokenRefreshed(httpConnection: HttpConnection) {
  try {
    const { accessToken, refreshToken } = yield select(selectAuth);
    const currentTime = Date.now() / 1000;
    const tokenExpiry = jwtDecode(accessToken)?.exp || currentTime;
    const delay = tokenExpiry - currentTime;
    console.log(`tokenExpiry: ${tokenExpiry}, currentTime: ${currentTime}, delay: ${delay}`);
    if (delay > 0) {
      return; // access token not yet expired
    }
    console.log('token expired'); // should not happen
    // access token expired, need to refresh
    const authApi = AuthApi.getInstance(httpConnection);
    const refreshedAuth = yield call([authApi, authApi.refresh], refreshToken);
    yield put(refreshSuccess({ auth: refreshedAuth }));
  } catch (e: unknown) {
    console.log('ENSURE_REFRESH_TOKEN_ERROR', e);
    Sentry.captureException(e); //errorInfos contains information on which sagaStack the error comes from
  }
}
