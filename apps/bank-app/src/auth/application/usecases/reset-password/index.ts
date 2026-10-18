import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { Email } from '@clean-rn/auth/domain';

import {
  IResetPasswordTypes,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../../commands/reset-password';
import { authApi } from '../../../infrastructure/network';

function* resetPasswordApiSaga({
  payload,
}: {
  type: string;
  payload: { email: Email };
}): Generator<StrictEffect, any, any> {
  try {
    // api call
    const response = yield call(authApi.resetPassword, { email: payload.email });
    const success = response.success;

    // dispatch action to the store
    yield put(
      resetPasswordSuccess({
        success,
      }),
    );
  } catch (error: unknown) {
    Logger.getInstance().error(error);
    Sentry.captureException(error);
    yield put(
      resetPasswordFailure({
        error: error as Error,
      }),
    );
  }
}

function* resetPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordApiSaga);
}

export { resetPasswordApiSaga, resetPasswordSaga };
