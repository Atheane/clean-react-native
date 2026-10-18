/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, select, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { ISignupUserCommand, User } from '@clean-rn/auth/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { navigate } from '../../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../../shared/presentation/types';
import { selectUser, selectEmail } from '../../../state-management/selectors';
import { ISignupTypes, userSignedUp } from '../../../commands/signup';

export function* signupUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection);
}

export function* signupUserGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISignupUserCommand;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  const { uid } = yield call([api, api.createUser], payload);

  let user = yield select(selectUser);
  if (!user) {
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  user.signup({ id: uid, properties: user.properties });
  // domain event
  yield put(userSignedUp(user));
  yield call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS });
}
