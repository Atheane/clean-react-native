/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IRegisterBirthCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, birthRegistered } from '../../../commands/signup';
import { selectEmail, selectUser } from '../../../state-management';

export function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator);
}

export function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand;
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
  user.registerBirth(payload);

  // domain event
  yield put(birthRegistered(user));
}
