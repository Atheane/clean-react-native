/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterIdentityCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, identityRegistered } from '../../../commands/signup';

export function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

export function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand & { user: User };
}): Generator<StrictEffect, any, any> {
  const { user, ...properties } = payload;
  // add identity property to prospect instance
  user.registerIdentity(properties);
  // domain event
  yield put(identityRegistered(user));
}
