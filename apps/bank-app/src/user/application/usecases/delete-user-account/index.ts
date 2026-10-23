/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages, IProfileStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectAuth } from '../../../../auth/application/state-management/selectors';

import { refreshSuccess } from '../../../../auth/application/commands';
import { IUserTypes, initializeUser, userAccountDeleted } from '../../commands';
import { selectUser } from '../../state-management/selectors';

export function* deleteUserAccountSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_DELETE_USER_ACCOUNT, deleteUserAccountGenerator, httpConnection);
}

export function* deleteUserAccountGenerator(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  try {
    // refreshToken
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const user = yield select(selectUser);
    const userApi = UserApi.getInstance(httpConnection);
    yield call([userApi, userApi.deleteUserAccount]);
    yield put(userAccountDeleted(user));
    yield call(navigate, { route: IProfileStackPages.GOODBYE });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(initializeUser());
    yield put(showUnknownError(error as Error));
  }
}
