import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { IResetPasswordCommand } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IResetPasswordTypes, passwordReset } from '../../commands/reset-password';

function* resetPasswordApiSaga(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IResetPasswordCommand;
  },
): Generator<StrictEffect, any, any> {
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
}

function* resetPasswordSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordApiSaga, httpConnection);
}

export { resetPasswordApiSaga, resetPasswordSaga };
