/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { IUpdateUserConfigCommand } from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectAuth } from '../../../../auth/application/state-management/selectors';

import { refreshSuccess } from '../../../../auth/application/commands';
import { IUserTypes, initializeUser, notificationUpdated } from '../../../../user/application/commands';

export function* updateNotificationsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_UPDATE_NOTIFICATIONS, updateNotificationsGenerator, httpConnection);
}

export function* updateNotificationsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IUpdateUserConfigCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    // refreshToken
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.updateConfig], payload);
    yield put(
      notificationUpdated({
        user,
      }),
    );
  } catch (error: unknown) {
    yield put(initializeUser());
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
