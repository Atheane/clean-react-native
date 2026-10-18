import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import Constants from 'expo-constants';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { IResetPasswordCommand } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IResetPasswordTypes, resetPasswordSuccess } from '../../commands/reset-password';

function* resetPasswordApiSaga({
  payload,
}: {
  type: string;
  payload: IResetPasswordCommand;
}): Generator<StrictEffect, any, any> {
  // api call
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);
  const response = yield call([api, api.resetPassword], { email: payload.email });
  const success = response.success;

  // dispatch action to the store
  yield put(
    resetPasswordSuccess({
      success,
    }),
  );
}

function* resetPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordApiSaga);
}

export { resetPasswordApiSaga, resetPasswordSaga };
