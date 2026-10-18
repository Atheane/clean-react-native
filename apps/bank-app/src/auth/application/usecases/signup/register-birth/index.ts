/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterBirthCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, birthRegistered } from '../../../commands/signup';

export function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator);
}

export function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand & { user: User };
}): Generator<StrictEffect, any, any> {
  const { user, ...properties } = payload;

  // add password property to user instance
  user.registerBirth(properties);

  // domain event
  yield put(birthRegistered(user));
}
