/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IRegisterIdentityCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, identityRegistered } from '../../../commands/signup';
import { selectEmail, selectUser } from '../../../state-management';

export function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

export function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve user from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add identity property to prospect instance
  user.registerIdentity(payload);
  // domain event
  yield put(identityRegistered(user));
}
