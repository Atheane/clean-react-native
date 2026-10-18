/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ICheckPhoneQuery, ISuccess, AuthError, ISendPhoneValidationCommand } from '@clean-rn/auth/domain';

import { ISignupTypes, signupFailed, phoneChecked } from '../../../../commands/signup';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

export function* checkPhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_PHONE, checkPhoneGenerator, httpConnection);
}

export function* checkPhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ICheckPhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const phoneExists: ISuccess = yield call([api, api.searchPhone], payload);
  if (phoneExists.success) {
    yield put(signupFailed(new AuthError.SignupFailurePhoneExists()));
    yield cancel();
  }
  const phoneOtpSent: ISuccess = yield call(
    [api, api.sendPhoneValidation],
    payload as ISendPhoneValidationCommand,
  );
  if (!phoneOtpSent.success) {
    yield put(signupFailed(new AuthError.SignupFailureSendPhoneValidation()));
    yield cancel();
  }
  // domain event
  yield put(phoneChecked());
  // navigation
}
