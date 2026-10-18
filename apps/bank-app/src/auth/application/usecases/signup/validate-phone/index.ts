/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { Logger } from '@clean-rn/logger';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { ISuccess, AuthError, IValidatePhoneQuery, User } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { selectUser, selectEmail } from '../../../state-management/selectors';
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

  let user = yield select(selectUser);
  if (!user) {
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  Logger.getInstance().info('>>>>>>>>>>>>> user.validatePhone', user);

  // add password property to prospect instance
  user.validatePhone(payload);

  Logger.getInstance().info('<<<<<<<<<<<<< user.validatePhone', user);
  // domain event
  yield put(phoneValidated(user));
  yield call(navigate, { route: IAuthStackPages.SIGNUP_REGISTER_BIRTH });
}
