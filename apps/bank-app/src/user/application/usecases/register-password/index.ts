/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterPasswordCommand, User } from '@clean-rn/user/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { initializeUser, IUserTypes, passwordRegistered } from '../../commands';
import { selectUser, selectEmail } from '../../state-management/selectors';

export function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

export function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand;
}): Generator<StrictEffect, any, any> {
  try {
    const { password } = payload;
    // retrieve user from redux store
    let user = yield select(selectUser);

    if (!user) {
      const email = yield select(selectEmail);
      user = User.CreateFromEmail(email);
    }
    // add password property to prospect instance
    user.registerPassword(password);

    // domain event
    yield put(passwordRegistered(user));
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeUser());
    yield put(showUnknownError(e as Error));
  }
}
