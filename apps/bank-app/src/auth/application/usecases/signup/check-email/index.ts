/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import { ISearchEmailQuery, AuthError } from '@clean-rn/auth/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi, IUserSearchServerCode } from '@clean-rn/auth/infrastructure';

import { loadStorage } from '../../../../../shared/application/commands/initialize-application';
import { IStoreKey } from '../../../../../shared/application/types';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

import { ISignupTypes, emailNotFound, initializeSignupStep, signupFailed } from '../../../commands/signup';

export function* checkEmailExistsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SEARCH_EMAIL, checkEmailExistsGenerator, httpConnection);
}

export function* checkEmailExistsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISearchEmailQuery;
  },
): Generator<StrictEffect, any, any> {
  try {
    const api = AuthApi.getInstance(httpConnection);
    // api call
    const response: number = yield call([api, api.searchEmail], payload);
    switch (response) {
      case IUserSearchServerCode.EMAIL_EXISTS:
        yield put(signupFailed(new AuthError.SignupFailureEmailExists()));
        yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
        yield put(loadStorage());
        yield call(navigate, { route: IAuthStackPages.LOGIN });
        yield cancel();
        break;
      case IUserSearchServerCode.KELVIN_USER:
        yield put(signupFailed(new AuthError.SignupFailureEmailExists()));
        yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
        yield put(loadStorage());
        yield call(navigate, { route: IAuthStackPages.CHOOSE_PASSWORD });
        yield cancel();
        break;
      default:
        // domain event
        yield put(emailNotFound());
        yield call(navigate, { route: IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE });
    }
  } catch (e: unknown) {
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
