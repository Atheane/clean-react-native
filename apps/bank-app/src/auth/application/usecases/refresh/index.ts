/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { AuthApi } from '@clean-rn/auth/infrastructure';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages, IRoutes } from '../../../../shared/presentation/types';
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
    console.log(IAuthTypes.FETCH_REFRESH);
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);

    yield put(refreshSuccess({ auth }));

    if (payload) {
      yield call(navigate, { route: payload.nextRoute, params: payload.params });
    }
  } catch (error: unknown) {
    yield put(resetError());
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
