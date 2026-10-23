/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';

import { AuthApi } from '@clean-rn/auth/infrastructure';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IRoutes } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectAuth } from '../../../../auth/application/state-management/selectors';

import { IAuthTypes, refreshSuccess, resetError } from '../../commands';

export function* refreshSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_REFRESH, refreshGenerator, httpConnection);
}

export function* refreshGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload?: { nextRoute: IRoutes; params?: any };
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);

    yield put(refreshSuccess({ auth }));

    if (payload) {
      yield call(navigate, { route: payload.nextRoute, params: payload.params });
    }
  } catch (error: unknown) {
    console.log('REFRESH error', error);

    yield put(resetError());
    yield put(showUnknownError(error as Error));
  }
}
