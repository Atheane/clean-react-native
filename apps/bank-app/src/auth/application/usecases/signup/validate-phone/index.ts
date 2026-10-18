/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { ISuccess, AuthError, IValidatePhoneQuery, User } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { ISignupTypes, signupFailed, phoneValidated } from '../../../commands/signup';

export function* validatePhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection);
}

export function* validatePhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IValidatePhoneQuery & { user: User };
  },
): Generator<StrictEffect, any, any> {
  const { user, ...properties } = payload;

  const api = AuthApi.getInstance(httpConnection);
  // api call
  const otpIsValid: ISuccess = yield call([api, api.checkPhoneValidation], properties);
  if (!otpIsValid.success) {
    yield put(signupFailed(new AuthError.SignupFailureInvalidPhoneCode()));
    yield cancel();
  }

  // add password property to prospect instance
  user.validatePhone(properties);

  // domain event
  yield put(phoneValidated(user));
}
