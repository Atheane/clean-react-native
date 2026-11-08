/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery, select, call, cancel } from 'redux-saga/effects';

import { IUpdateUserCommand } from '@clean-rn/user/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IUserTypes, resetError, userUpdated } from '../../commands';
import { selectUser } from '../../state-management/selectors';
import { IRoutes } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

export function* updateUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_UPDATE_USER, updateUserGenerator, httpConnection);
}

export function* updateUserGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IUpdateUserCommand & { nextRoute: IRoutes };
  },
): Generator<StrictEffect, any, any> {
  try {
    const { nextRoute, ...rest } = payload;
    if (Object.keys(rest).length === 0) {
      yield call(navigate, { route: payload.nextRoute });
      yield put(resetError());
      yield cancel();
    }
    yield call(ensureTokenRefreshed, httpConnection);

    const user = yield select(selectUser);
    const userApi = UserApi.getInstance(httpConnection);
    user.updateUser(payload);

    const newUser = yield call([userApi, userApi.updateUser], payload);

    yield put(userUpdated(newUser));

    yield call(navigate, { route: payload.nextRoute });
  } catch (e: unknown) {
    yield put(resetError());
    yield put(showUnknownError(e as Error));
  }
}
