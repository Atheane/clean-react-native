/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ISignupUserCommand, IUserProperties, PhoneOtp } from '@clean-rn/auth/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

import { ISignupTypes, initializeSignupStep, userSignedUp } from '../../../commands/signup';

export function* signupUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection);
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
    const { user, phoneOtp } = payload;

    const api = AuthApi.getInstance(httpConnection);
    const { uid } = yield call([api, api.createUser], { ...user.properties, phoneOtp } as IUserProperties & {
      phoneOtp: PhoneOtp;
    });

    user.signup({ id: uid, properties: user.properties as IUserProperties });
    // domain event
    yield put(userSignedUp(user));
    yield call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
