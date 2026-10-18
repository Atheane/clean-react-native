/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError, ILoginCommand } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { loginSuccess, loginFailure, ILoginTypes } from '../../commands/login';

import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IHomeStackPages } from '../../../../shared/presentation/types';

export function* loginSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_LOGIN, loginApiSaga, httpConnection);
}

export function* loginApiSaga(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ILoginCommand;
  },
): Generator<StrictEffect, any, any> {
  // get email from async storage
  const api = AuthApi.getInstance(httpConnection);
  let auth;
  try {
    // api call
    auth = yield call([api, api.login], payload);
    //attachBearerToken to httpConnection
    httpConnection.attachBearerToken(auth.accessToken);
    // dispatch action to the store
    yield put(loginSuccess(auth));
    // store token and email in async storage
  } catch (error: unknown) {
    yield put(loginFailure(new AuthError.LoginFailureInvalidCredentials(error)));
    yield cancel();
  }
  yield call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
  yield call(navigate, { route: IHomeStackPages.HOME });
}
