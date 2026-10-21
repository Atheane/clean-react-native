/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { Logger } from '@clean-rn/logger';
import { IEmailNotifications, IPhoneNotifications } from '@clean-rn/profile/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import {
  IProfileTypes,
  resetNotifications,
  notificationUpdated,
} from '../../../../profile/application/commands';
import { selectAuthFromLogin } from '../../../../auth/application/state-management/selectors';

import { refreshSuccess } from '../../../../auth/application/commands';

export function* updateNotificationsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IProfileTypes.FETCH_UPDATE_NOTIFICATIONS, updateNotificationsGenerator, httpConnection);
}

export function* updateNotificationsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      phoneNotificationsDisabled?: IPhoneNotifications[];
      emailNotificationsDisabled?: IEmailNotifications[];
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    // refreshToken
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuthFromLogin);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const userApi = UserApi.getInstance(httpConnection);
    // yield call([userApi, userApi.updateConfig], {
    //   notifFirebaseDisabled: payload.phoneNotificationsDisabled,
    //   notifEmailDisabled: payload.emailNotificationsDisabled,
    // });

    yield put(
      notificationUpdated({
        phoneNotificationsDisabled: payload.phoneNotificationsDisabled,
        emailNotificationsDisabled: payload.emailNotificationsDisabled,
      }),
    );
  } catch (error: unknown) {
    yield put(resetNotifications());
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
