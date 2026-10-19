/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ISearchPhoneQuery, AuthError, ISendPhoneValidationCommand } from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi, IUserSearchServerCode } from '@clean-rn/auth/infrastructure';

import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

import { ISignupTypes, signupFailed, phoneNotFound, initializeSignupStep } from '../../../commands/signup';

export function* checkPhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SEARCH_PHONE, checkPhoneGenerator, httpConnection);
}

export function* checkPhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISearchPhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  try {
    const api = AuthApi.getInstance(httpConnection);
    // api call
    const response: number = yield call([api, api.searchPhone], payload);
    if (response === IUserSearchServerCode.PHONE_EXISTS) {
      yield put(signupFailed(new AuthError.SignupFailurePhoneExists()));
      yield cancel();
    }
    yield call([api, api.sendPhoneValidation], payload as ISendPhoneValidationCommand);
    // domain event
    yield put(phoneNotFound());
    // navigation
    yield call(navigate, { route: IAuthStackPages.SIGNUP_VALIDATE_PHONE });
  } catch (e: unknown) {
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
