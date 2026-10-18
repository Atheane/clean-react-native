/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { AuthError } from '@clean-rn/auth/domain';
import { Logger } from '@clean-rn/logger';

import { ServerError, getItemFromStore, storeItem } from '@clean-rn/shared/infrastructure';
import { authApi } from '../../../infrastructure/network';

import {
  IFetchLoginRequestPayload,
  fetchLoginSuccess,
  loginFailure,
  ILoginTypes,
} from '../../commands/login';
import { IStoreKey } from '../../../../shared/application/types';
// import { fetchAccountsRequest } from '../../commands/login';

function* loginApiSaga({
  payload,
}: {
  type: string;
  payload: IFetchLoginRequestPayload;
}): Generator<StrictEffect, any, any> {
  try {
    const auth = yield call(authApi.login, payload);

    const email = yield call(getItemFromStore, IStoreKey.USER_EMAIL);

    if (email && email !== payload.email.value) {
      yield put(
        loginFailure({
          error: new AuthError.LoginFailureOneEmailByPhone('Phone already registered'),
        }),
      );
      yield cancel();
    }

    // dispatch action to the store
    yield put(
      fetchLoginSuccess({
        auth,
      }),
    );

    yield call(storeItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
    yield call(storeItem, IStoreKey.USER_EMAIL, payload.email.value);
  } catch (e: unknown) {
    Logger.getInstance().error(e);
    Sentry.captureException(e);
    yield put(
      loginFailure({
        error: e as Error,
      }),
    );
  }
}

function* loginSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_LOGIN_REQUEST, loginApiSaga);
}

export { loginSaga, loginApiSaga };
