/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterAddressCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, addressRegistered } from '../../../commands/signup';

export function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}
export function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand & { user: User };
}): Generator<StrictEffect, any, any> {
  const { user, ...properties } = payload;

  // add password property to user instance
  user.registerAddress(properties);

  // domain event
  yield put(addressRegistered(user));
}
