/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { IResetPasswordCommand } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { initializeResetPassword, IResetPasswordTypes, passwordReset } from '../../commands/reset-password';
import { fetchRefresh } from '../../../../auth/application/commands/login';
import { IAuthStackPages } from '../../../../shared/presentation/types';

export function* resetPasswordSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordGenerator, httpConnection);
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
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(fetchRefresh());
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeResetPassword());
    yield put(showUnknownError(error as Error));
  }
}
