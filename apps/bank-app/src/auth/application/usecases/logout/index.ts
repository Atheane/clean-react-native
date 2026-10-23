/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { AuthError } from '@clean-rn/auth/domain';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthTypes, loggedOut } from '../../commands';

import { IAuthStackPages } from '../../../../shared/presentation/types';

export function* logoutSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_LOGOUT, logoutGenerator, httpConnection);
}
export function* logoutGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    // api call
    const api = AuthApi.getInstance(httpConnection);
    const { success } = yield call([api, api.logout]);
    if (!success) {
      throw new AuthError.LogoutFailure();
    }
    // dispatch action to the store
    yield put(loggedOut());
    yield call(navigate, { route: IAuthStackPages.LOGIN });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(loggedOut());
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
