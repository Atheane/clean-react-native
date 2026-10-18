/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IRegisterPasswordCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, passwordRegistered } from '../../../commands/signup';
import { selectEmail, selectUser } from '../../../state-management';

export function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

export function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }
  // add password property to prospect instance
  user.registerPassword(payload.password);

  // domain event
  yield put(passwordRegistered(user));
}
