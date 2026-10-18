/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IRegisterAddressCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, addressRegistered } from '../../../commands/signup';
import { selectEmail, selectUser } from '../../../state-management';

export function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}
export function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add password property to user instance
  user.registerAddress(payload);

  // domain event
  yield put(addressRegistered(user));
}
