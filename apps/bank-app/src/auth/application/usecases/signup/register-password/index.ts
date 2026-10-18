/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterPasswordCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, passwordRegistered } from '../../../commands/signup';

import { selectUser, selectEmail } from '../../../state-management/selectors';
export function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

export function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand;
}): Generator<StrictEffect, any, any> {
  const { password } = payload;
  // retrieve user from redux store
  let user = yield select(selectUser);

  if (!user) {
    const email = yield select(selectEmail);
    user = User.Create(email);
  }
  // add password property to prospect instance
  user.registerPassword(password);

  // domain event
  yield put(passwordRegistered(user));
}
