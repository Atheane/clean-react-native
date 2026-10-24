/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IParametersStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { IUserTypes, initializeUser, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

export function* deleteUserAccountSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_DELETE_USER_ACCOUNT, deleteUserAccountGenerator, httpConnection);
}

export function* deleteUserAccountGenerator(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);
    const userApi = UserApi.getInstance(httpConnection);
    yield call([userApi, userApi.deleteUserAccount]);
    yield put(initializeUser());
    yield call(navigate, { route: IParametersStackPages.GOODBYE });
  } catch (error: unknown) {
    yield put(resetError());
    yield put(showUnknownError(error as Error));
  }
}
