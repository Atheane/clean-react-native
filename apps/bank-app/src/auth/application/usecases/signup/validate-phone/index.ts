/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { ISuccess, AuthError, IValidatePhoneQuery } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

import { selectUserFromSignup } from '../../../state-management/selectors';
import { ISignupTypes, signupFailed, phoneValidated, initializeSignupStep } from '../../../commands/signup';

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
  try {
    const api = AuthApi.getInstance(httpConnection);
    // api call
    const otpIsValid: ISuccess = yield call([api, api.checkPhoneValidation], payload);
    if (!otpIsValid.success) {
      yield put(signupFailed(new AuthError.ValidatePhoneIncorrectPhoneCode()));
      yield cancel();
    }

    const user = yield select(selectUserFromSignup);

    if (!user) {
      // user comes from login -> check phone flow (ex: already signup, and uses a new phone, or migration flow)
      yield put(phoneValidated(user));
      yield call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS });
      yield cancel();
    }
    // add phone to user property
    user.validatePhone(payload);
    // domain event
    yield put(phoneValidated(user));
    yield call(navigate, { route: IAuthStackPages.SIGNUP_BIRTH });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
