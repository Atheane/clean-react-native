/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterAddressCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, addressRegistered, fetchSignupUser } from '../../../commands/signup';
import { selectUser, selectEmail } from '../../../state-management/selectors';

export function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}
export function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  let user = yield select(selectUser);

  if (!user) {
    const email = yield select(selectEmail);
    user = User.Create(email);
  }
  // add password property to user instance
  user.registerAddress(payload);

  // domain event
  yield put(addressRegistered(user));
  yield put(fetchSignupUser(user));
}
