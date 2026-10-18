/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IUserProperties } from '@clean-rn/auth/domain';

import { ISignupTypes, userSignedUp } from '../../../commands/signup';
import { selectPhoneOtp, selectUser } from '../../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

export function* signupUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection);
}

export function* signupUserGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  const user = yield select(selectUser);
  const phoneOtp = yield select(selectPhoneOtp);

  const api = AuthApi.getInstance(httpConnection);
  const { uid } = yield call([api, api.createUser], { ...user.properties, phoneOtp });
  user.signup({ id: uid, ...(user.properties as IUserProperties) });

  // domain event
  yield put(userSignedUp(user));
}
