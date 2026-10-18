/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery, select, call } from 'redux-saga/effects';
import { IRegisterBirthCommand, User } from '@clean-rn/auth/domain';

import { ISignupTypes, birthRegistered } from '../../../commands/signup';
import { selectUser, selectEmail } from '../../../state-management/selectors';
import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';

export function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator);
}

export function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand;
}): Generator<StrictEffect, any, any> {
  let user = yield select(selectUser);

  if (!user) {
    const email = yield select(selectEmail);
    user = User.Create(email);
  }
  // add password property to user instance
  user.registerBirth(payload);

  // domain event
  yield put(birthRegistered(user));
  yield call(navigate, { route: IAuthStackPages.SIGNUP_BIRTH });
}
