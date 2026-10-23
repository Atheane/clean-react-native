/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { ISearchEmailQuery } from '@clean-rn/user/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserError } from '@clean-rn/user/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi, IUserSearchServerCode } from '@clean-rn/user/infrastructure';

import { loadStorage } from '../../../../shared/application/commands/initialize-application';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages, IUserStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { IUserTypes, emailNotFound, resetError, signupFailed } from '../../commands';

export function* checkEmailSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_SEARCH_EMAIL, checkEmailGenerator, httpConnection);
}

export function* checkEmailGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISearchEmailQuery;
  },
): Generator<StrictEffect, any, any> {
  try {
    const api = UserApi.getInstance(httpConnection);
    // api call
    const response: number = yield call([api, api.searchEmail], payload);
    switch (response) {
      case IUserSearchServerCode.EMAIL_EXISTS:
        yield put(signupFailed(new UserError.SignupFailureEmailExists()));
        yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
        yield put(loadStorage());
        yield call(navigate, { route: IAuthStackPages.LOGIN });
        break;
      case IUserSearchServerCode.KELVIN_USER:
        yield put(signupFailed(new UserError.SignupFailureEmailExists()));
        yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
        yield put(loadStorage());
        yield call(navigate, { route: IUserStackPages.EMAIL_SENT });
        break;
      default:
        // domain event
        yield put(emailNotFound());
        yield call(navigate, { route: IUserStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE });
    }
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(resetError());
    yield put(showUnknownError(e as Error));
  }
}
