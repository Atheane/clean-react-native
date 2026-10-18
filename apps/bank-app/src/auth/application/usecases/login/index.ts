/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { IAuth, AuthError } from '@clean-rn/auth/domain';
import { Logger } from '@clean-rn/logger';

import { AxiosSingleton, ServerError, getItemFromStore, storeItem } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  IFetchLoginRequestPayload,
  fetchLoginSuccess,
  loginFailure,
  ILoginTypes,
} from '../../commands/login';
import { IStoreKey } from '../../../../shared/application/types';
// import { fetchAccountsRequest } from '../../commands/login';

function* loginApiSaga(
  authApi: AuthApi,
  {
    payload,
  }: {
    type: string;
    payload: IFetchLoginRequestPayload;
  },
): Generator<StrictEffect, any, any> {
  try {
    const response = yield call(authApi.login, payload);
    const email = yield call(getItemFromStore, IStoreKey.USER_EMAIL);
    if (email && email !== payload.email.value) {
      yield put(
        loginFailure({
          error: new AuthError.LoginFailureOneEmailByPhone('Phone already registered'),
        }),
      );
      yield cancel();
    }

    const auth = response.data as IAuth;
    // dispatch action to the store
    yield put(
      fetchLoginSuccess({
        auth,
      }),
    );

    yield call(AxiosSingleton.attachBearerToken, auth.accessToken);

    yield call(storeItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
    yield call(storeItem, IStoreKey.USER_EMAIL, payload.email.value);

    // yield put(fetchAccountsRequest());
  } catch (e: any) {
    let error;
    if (e?.response?.data) {
      error = new ServerError(e.response.data);
    } else {
      error = e;
    }
    Logger.getInstance().error(error);
    Sentry.captureException(error);
    yield put(
      loginFailure({
        error,
      }),
    );
  }
}

function* loginSaga(api: AuthApi): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_LOGIN_REQUEST, loginApiSaga, api);
}

export { loginSaga, loginApiSaga };
