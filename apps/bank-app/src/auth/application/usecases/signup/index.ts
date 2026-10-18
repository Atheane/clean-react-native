import { put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { IRegisterIdentityCommand, User } from '@clean-rn/auth/domain';

import { registerIdentity, ISignupTypes } from '../../commands/signup';

function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand;
}): Generator<StrictEffect, any, any> {
  //attachBearerToken to httpConnection
  const email = yield select((state) => state.signup.checkEmail.email);
  const user = User.Create(email);
  user.registerIdentity(payload);
  yield put(registerIdentity(user));
}

function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

export { registerIdentitySaga, registerIdentityGenerator };
