/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthApi } from '@clean-rn/auth/infrastructure';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages, IRoutes } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { ILoginTypes, refreshSuccess, resetError } from '../../commands/login';
import { Logger } from '@clean-rn/logger';

export function* refreshSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_REFRESH, refreshGenerator, httpConnection);
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
    Logger.getInstance().info(ILoginTypes.FETCH_REFRESH);
    const authApi = AuthApi.getInstance(httpConnection);
    const refreshToken = yield call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN);
    const auth = yield call([authApi, authApi.refresh], refreshToken);
    yield call(httpConnection.attachBearerToken, auth.accessToken);

    yield call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
    yield call(AsyncStorage.setItem, IStoreKey.JWT_REFRESH_TOKEN, auth.refreshToken);
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
