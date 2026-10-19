/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ICheckPhoneQuery, ISuccess, AuthError, ISendPhoneValidationCommand } from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

import { ISignupTypes, signupFailed, phoneChecked, initializeSignupStep } from '../../../commands/signup';

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
  try {
    const api = AuthApi.getInstance(httpConnection);
    // api call
    const phoneExists: ISuccess = yield call([api, api.searchPhone], payload);
    if (phoneExists.success) {
      yield put(signupFailed(new AuthError.SignupFailurePhoneExists()));
      yield cancel();
    }
    yield call([api, api.sendPhoneValidation], payload as ISendPhoneValidationCommand);
    // domain event
    yield put(phoneChecked());
    // navigation
    yield call(navigate, { route: IAuthStackPages.SIGNUP_VALIDATE_PHONE });
  } catch (e: unknown) {
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
