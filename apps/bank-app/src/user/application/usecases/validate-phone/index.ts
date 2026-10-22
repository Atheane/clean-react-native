/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { ISuccess, UserError, IValidatePhoneQuery } from '@clean-rn/user/domain';

import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectUser } from '../../state-management/selectors';
import { IUserTypes, signupFailed, phoneValidated, initializeUser } from '../../commands';

export function* validatePhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection);
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
    const api = UserApi.getInstance(httpConnection);
    // api call
    const otpIsValid: ISuccess = yield call([api, api.checkPhoneValidation], payload);
    if (!otpIsValid.success) {
      yield put(signupFailed(new UserError.ValidatePhoneIncorrectPhoneCode()));
      yield cancel();
    }

    const user = yield select(selectUser);

    if (!user) {
      // user comes from login -> check phone flow (ex: already signup, and uses a new phone, or migration flow)
      yield put(phoneValidated(user));
      yield call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS });
      yield cancel();
    }
    // add phone to user property
    user.validatePhone(payload);
    // domain event
    yield put(phoneValidated(user));
    yield call(navigate, { route: IUserStackPages.SIGNUP_BIRTH });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeUser());
    yield put(showUnknownError(e as Error));
  }
}
