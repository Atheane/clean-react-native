/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { IResetPasswordCommand } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthTypes, passwordReset, initializeAuth } from '../../commands';
import { AuthApi } from '@clean-rn/auth/infrastructure';

export function* resetPasswordSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_RESET_PASSWORD, resetPasswordGenerator, httpConnection);
}
export function* resetPasswordGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IResetPasswordCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    // api call
    const api = AuthApi.getInstance(httpConnection);
    const response = yield call([api, api.resetPassword], { email: payload.email });
    const success = response.success;

    // dispatch action to the store
    yield put(
      passwordReset({
        success,
      }),
    );
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeAuth());
    yield put(showUnknownError(error as Error));
  }
}
