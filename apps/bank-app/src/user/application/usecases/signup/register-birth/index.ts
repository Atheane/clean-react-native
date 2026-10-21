/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery, select, call } from 'redux-saga/effects';
import { IRegisterBirthCommand, User } from '@clean-rn/user/domain';

import { IUserTypes, birthRegistered, initializeSignupStep } from '../../../commands';
import { selectUserFromSignup, selectEmailFromSignup } from '../../../state-management/selectors';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IUserStackPages } from '../../../../../shared/presentation/types';
import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';

export function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.REGISTER_BIRTH, registerBirthGenerator);
}

export function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand;
}): Generator<StrictEffect, any, any> {
  try {
    let user = yield select(selectUserFromSignup);

    if (!user) {
      const email = yield select(selectEmailFromSignup);
      user = User.CreateFromEmail(email);
    }
    // add password property to user instance
    user.registerBirth(payload);

    // domain event
    yield put(birthRegistered(user));
    yield call(navigate, { route: IUserStackPages.SIGNUP_ADDRESS });
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
