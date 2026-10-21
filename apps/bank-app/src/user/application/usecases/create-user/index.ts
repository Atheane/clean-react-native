/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError } from '@clean-rn/auth/domain';
import { ISignupUserCommand, IUserProperties, PhoneOtp } from '@clean-rn/user/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IStoreKey } from '../../../../shared/application/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../shared/presentation/types';

import { loginSuccess } from '../../../../auth/application/commands';
import { selectUser } from '../../../../auth/application/state-management/selectors';

import { checkCustomerStatus } from '../../../../kyc/application/commands/customer';

import { IUserTypes, initializeSignupStep, userSignedUp } from '../../commands';

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
      ...payload.user.properties,
      phoneOtp: payload.phoneOtp,
    } as IUserProperties & {
      phoneOtp: PhoneOtp;
    });

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

    yield put(loginSuccess({ auth, user }));
    yield put(checkCustomerStatus());

    const userFromAuth = yield select(selectUser);
    userFromAuth.signup({ id: userFromAuth.id, properties: userFromAuth.properties as IUserProperties });

    // domain event
    yield put(userSignedUp(userFromAuth));

    yield call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
