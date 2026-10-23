/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { AuthError } from '@clean-rn/auth/domain';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthTypes, loggedOut, resetError } from '../../commands';

import { IAuthStackPages } from '../../../../shared/presentation/types';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

export function* logoutSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_LOGOUT, logoutGenerator, httpConnection);
}
export function* logoutGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    // api call
    yield call(ensureTokenRefreshed, httpConnection);

    const api = AuthApi.getInstance(httpConnection);
    const { success } = yield call([api, api.logout]);
    if (!success) {
      throw new AuthError.LogoutFailure();
    }
    // dispatch action to the store
    yield put(loggedOut());
    yield call(navigate, { route: IAuthStackPages.LOGIN });
  } catch (error: unknown) {
    yield put(resetError());
    yield put(showUnknownError(error as Error));
  }
}
