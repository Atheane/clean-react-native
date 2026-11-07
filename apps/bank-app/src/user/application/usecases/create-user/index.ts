/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError, IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';
import {
  ISignupUserCommand,
  IUserErrorCodes,
  IUserErrorMessage,
  IUserProperties,
  UserError,
} from '@clean-rn/user/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IStoreKey } from '../../../../shared/application/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../shared/presentation/types';

import { loginSuccess } from '../../../../auth/application/commands';

import { checkCustomerStatus } from '../../../../kyc/application/commands';

import { initializeUser, IUserTypes, userNotCreated, userSignedUp } from '../../commands';
import { IDomainError } from '@clean-rn/ddd';

export function* signupUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection);
}

export function* signupUserGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISignupUserCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    if (!payload.user.properties.email) {
      throw new AuthError.InvalidEmail(payload.user.properties.email);
    }

    if (!payload.user.properties.password) {
      throw new AuthError.InvalidPassword(payload.user.properties.password);
    }

    const api = UserApi.getInstance(httpConnection);
    yield call([api, api.createUser], {
      user: payload.user,
      phoneOtp: payload.phoneOtp,
    } as ISignupUserCommand);

    // call rather than put will wait for the end of the saga, we need it for userFromAuth
    const email = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
    if (!email) {
      // persist user email if absent from storage (first login after signup)
      yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.user.properties.email.value);
    }

    // api call
    const authApi = AuthApi.getInstance(httpConnection);
    const auth = yield call([authApi, authApi.login], {
      email: payload.user.properties.email,
      password: payload.user.properties.password,
    });
    //attachBearerToken to httpConnection
    yield call(httpConnection.attachBearerToken, auth.accessToken);

    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.getUser]);
    user.signup({ id: user.id, properties: user.properties as IUserProperties });
    yield put(userSignedUp(user));

    yield put(loginSuccess({ auth }));

    yield put(checkCustomerStatus({ user }));

    // domain event

    yield call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeUser());
    if (UserError.isUserError(e)) {
      yield put(userNotCreated(e as IDomainError<IUserErrorCodes, IUserErrorMessage>));
    } else if (AuthError.isAuthError(e)) {
      yield put(userNotCreated(e as IDomainError<IAuthErrorCodes, IAuthErrorMessage>));
    } else {
      yield put(showUnknownError(e as Error));
    }
  }
}
