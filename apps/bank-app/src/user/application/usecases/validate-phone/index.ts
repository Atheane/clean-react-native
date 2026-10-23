/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { ISuccess, UserError, IValidatePhoneQuery } from '@clean-rn/user/domain';

import { IAuth } from '@clean-rn/auth/domain';

import { AuthApi } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectEmail, selectPassword } from '../../../../auth/application/state-management/selectors';

import { selectUser } from '../../state-management/selectors';
import { IUserTypes, signupFailed, phoneValidated, initializeUser } from '../../commands';
import { loginSuccess } from 'apps/bank-app/src/auth/application/commands';

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
    const userApi = UserApi.getInstance(httpConnection);
    // api call
    const otpIsValid: ISuccess = yield call([userApi, userApi.checkPhoneValidation], payload);
    if (!otpIsValid.success) {
      yield put(signupFailed(new UserError.ValidatePhoneIncorrectPhoneCode()));
      yield cancel();
    }

    let user = yield select(selectUser);

    // signup flow
    if (user) {
      // add phone to user property
      user.validatePhone(payload);
      // domain event
      yield put(phoneValidated(user));
      yield call(navigate, { route: IUserStackPages.SIGNUP_BIRTH });
      yield cancel();
    }

    // migration flow (no user yet)
    const email = yield select(selectEmail);
    const password = yield select(selectPassword);
    const authApi = AuthApi.getInstance(httpConnection);
    const auth: IAuth = yield call([authApi, authApi.logPhone], {
      email,
      password,
      phone: payload.phone,
    });
    yield put(loginSuccess({ auth }));

    yield call(httpConnection.attachBearerToken, auth.accessToken);

    user = yield call([userApi, userApi.getUser]);
    yield put(phoneValidated(user));

    yield call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeUser());
    yield put(showUnknownError(e as Error));
  }
}
