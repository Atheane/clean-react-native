/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError, ILoginCommand } from '@clean-rn/auth/domain';

import { AuthApi, IAuthServerCode } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { IStoreKey } from '../../../application/types';
import { navigate } from '../../../presentation/navigation/navigationRef';
import { ISharedStackPages } from '../../../presentation/types';
import { showUnknownError } from '../../../application/commands/manage-global-errors';

import { loginFailure, IAuthTypes, initializeAuth, loginSuccess } from '../../commands/login';

export function* loginSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_LOGIN, loginGenerator, httpConnection);
}

export function* loginGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ILoginCommand & { rememberMe: boolean };
  },
): Generator<StrictEffect, any, any> {
  try {
    if (payload.rememberMe) {
      yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
    } else {
      yield call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL);
    }

    // api call
    const authApi = AuthApi.getInstance(httpConnection);
    const auth = yield call([authApi, authApi.login], payload);
    // 2 min token expiration
    yield call(httpConnection.attachBearerToken, auth.accessToken);

    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.getUser]);
    console.log('user', user);
    yield put(loginSuccess({ auth }));
    // yield put(userSaved(user));
    yield call(navigate, { route: ISharedStackPages.HOME });
  } catch (error: unknown) {
    if (error instanceof ServerError) {
      switch (error.codeError) {
        case IAuthServerCode.USER_INVALID_CREDENTIAL:
          yield put(loginFailure(new AuthError.LoginFailureInvalidCredentials(error)));
          yield cancel();
        case IAuthServerCode.USER_NOT_FOUND:
          yield put(loginFailure(new AuthError.LoginFailureUserNotFound(error)));
          yield cancel();
      }
    }
    yield put(initializeAuth());
    yield put(showUnknownError(error as Error));
  }
}
