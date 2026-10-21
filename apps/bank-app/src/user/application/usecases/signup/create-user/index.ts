/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ISignupUserCommand, IUserProperties, PhoneOtp, User } from '@clean-rn/user/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';
import { applicationInitialized } from '../../../../../shared/application/commands/initialize-application';
import { IStoreKey } from '../../../../../shared/application/types';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../../shared/presentation/types';

import { IUserTypes, initializeSignupStep, userSignedUp } from '../../../commands';

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
    const api = UserApi.getInstance(httpConnection);
    yield call([api, api.createUser], {
      ...payload.user.properties,
      phoneOtp: payload.phoneOtp,
    } as IUserProperties & {
      phoneOtp: PhoneOtp;
    });
    const user = User.Create({ id: parseInt(payload.user.id), properties: payload.user.properties });
    user.signup({ id: user.id, properties: user.properties as IUserProperties });
    // domain event
    yield put(userSignedUp(user));
    if (user.properties.email) {
      yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, user.properties.email.value);
    }
    const initRouteName = IUserStackPages.SIGNUP_CONGRATS;
    yield put(
      applicationInitialized({
        email: user.properties.email ?? null,
        initRouteName,
        carbon: {
          house: {
            footprint: null,
            average: null,
          },
          transport: {
            footprint: null,
            average: null,
          },
          food: {
            footprint: null,
            average: null,
          },
          fly: {
            footprint: null,
            average: null,
          },
        },
      }),
    );
    yield call(navigate, { route: initRouteName });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
