/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { ISuccess, AuthError, IValidatePhoneQuery, User } from '@clean-rn/auth/domain';

import { ISignupTypes, signupFailed, phoneValidated } from '../../../commands/signup';
import { selectEmail, selectUser } from '../../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

export function* validatePhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection);
}

export function* validatePhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IValidatePhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const otpIsValid: ISuccess = yield call([api, api.checkPhoneValidation], payload);
  if (!otpIsValid.success) {
    yield put(signupFailed(new AuthError.SignupFailureInvalidPhoneCode()));
    yield cancel();
  }
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);
  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add password property to prospect instance
  user.validatePhone(payload);

  // domain event
  yield put(phoneValidated(user));
}
