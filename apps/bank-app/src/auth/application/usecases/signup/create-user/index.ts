/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IUserProperties, ISignupUserCommand, User, PhoneOtp } from '@clean-rn/auth/domain';

import { ISignupTypes, userSignedUp } from '../../../commands/signup';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

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
  const api = AuthApi.getInstance(httpConnection);
  const { uid } = yield call([api, api.createUser], payload);
  const user = User.Create(payload.email);
  const userProperties = {
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    identity: payload.identity,
    birth: payload.birth,
    address: payload.address,
    USPerson: payload.USPerson,
  };
  user.signup({ id: uid, properties: userProperties });
  // domain event
  yield put(userSignedUp(user));
}
