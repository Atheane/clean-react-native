/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterPasswordCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, passwordRegistered } from '../../../../commands/signup';

export function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

export function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand & { user: User };
}): Generator<StrictEffect, any, any> {
  const { user, password } = payload;
  // add password property to prospect instance
  user.registerPassword(password);

  // domain event
  yield put(passwordRegistered(user));
}
