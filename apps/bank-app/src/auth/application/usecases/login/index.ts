import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { AuthError, ILoginCommand } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { loginSuccess, loginFailure, ILoginTypes } from '../../commands/login';

import { IStoreKey } from '../../../../shared/application/types';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

function* loginApiSaga({
  payload,
}: {
  type: string;
  payload: ILoginCommand;
}): Generator<StrictEffect, any, any> {
  // get email from async storage
  const email = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);

  // compare stored email with input
  if (email && email !== payload.email.value) {
    yield put(loginFailure(new AuthError.LoginFailureOneEmailByPhone('Phone already registered')));
    yield cancel();
  }

  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  let auth;
  try {
    // api call
    auth = yield call([api, api.login], payload);
    // dispatch action to the store
    yield put(loginSuccess(auth));
  } catch (error: unknown) {
    yield put(loginFailure(new AuthError.LoginFailureInvalidCredentials(error)));
    yield cancel();
  }
  // store token and email in async storage
  yield call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
  yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
}

function* loginSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_LOGIN, loginApiSaga);
}

export { loginSaga, loginApiSaga };
