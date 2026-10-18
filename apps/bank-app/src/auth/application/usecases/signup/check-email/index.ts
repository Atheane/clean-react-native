/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import { ICheckEmailQuery, ISuccess, AuthError } from '@clean-rn/auth/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { initializeApplication } from '../../../../../shared/application/commands/initialization';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';

import { ISignupTypes, emailChecked, signupFailed } from '../../../commands/signup';
import { IStoreKey } from '../../../../../shared/application/types';

export function* checkEmailExistsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_EMAIL_EXISTS, checkEmailExistsGenerator, httpConnection);
}

export function* checkEmailExistsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ICheckEmailQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const emailExists: ISuccess = yield call([api, api.searchEmail], payload);
  if (emailExists.success) {
    yield put(signupFailed(new AuthError.SignupFailureEmailExists()));
    yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
    yield put(initializeApplication());
    yield call(navigate, { route: IAuthStackPages.LOGIN });
    yield cancel();
  }
  // domain event
  yield put(emailChecked());
}
