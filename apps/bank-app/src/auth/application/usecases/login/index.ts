import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { AuthError, ILoginParams } from '@clean-rn/auth/domain';
import { Logger } from '@clean-rn/logger';

import { getItemFromStore, storeItem } from '@clean-rn/shared/infrastructure';

import { loginSuccess, loginFailure, ILoginTypes } from '../../commands/login';
import { authApi } from '../../../infrastructure/network';

import { IStoreKey } from '../../../../shared/application/types';

function* loginApiSaga({
  payload,
}: {
  type: string;
  payload: ILoginParams;
}): Generator<StrictEffect, any, any> {
  try {
    // api call
    const auth = yield call(authApi.login, payload);

    // get email from async storage
    const email = yield call(getItemFromStore, IStoreKey.USER_EMAIL);

    // compare stored email with input
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
      loginSuccess({
        auth,
      }),
    );

    // store token and email in async storage
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
  yield takeEvery(ILoginTypes.FETCH_LOGIN, loginApiSaga);
}

export { loginSaga, loginApiSaga };
