/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterIdentityCommand, Email, User } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';
import { ISignupTypes, identityRegistered, initializeSignupStep } from '../../../commands/signup';

export function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

export function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand & { email: Email };
}): Generator<StrictEffect, any, any> {
  try {
    const { email, ...properties } = payload;

    const user = User.Create(email);
    // add identity property to prospect instance
    user.registerIdentity(properties);
    // domain event
    yield put(identityRegistered(user));
  } catch (e: unknown) {
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
