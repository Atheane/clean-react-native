import { call, put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import { ICheckEmailQuery, IRegisterIdentityCommand, ISuccess, Prospect } from '@clean-rn/auth/domain';

import { ISignupTypes, emailChecked, identityRegistered } from '../../commands/signup';
import { selectEmail } from '../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

function* checkEmailGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ICheckEmailQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const emailExists: ISuccess = yield call([api, api.searchEmail], payload);
  //attachBearerToken to httpConnection
  yield put(emailChecked(emailExists));
}

function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand;
}): Generator<StrictEffect, any, any> {
  const email = yield select(selectEmail);

  const prospect = Prospect.Create(email);

  prospect.registerIdentity(payload);
  yield put(identityRegistered(prospect));
}

// function* registerPasswordGenerator({
//   payload,
// }: {
//   type: string;
//   payload: IRegisterPasswordCommand;
// }): Generator<StrictEffect, any, any> {
//   const prospect = yield select(selectProspect);

//   prospect.registerIdentity(payload);

//   yield put(registerIdentity(prospect));
// }

function* checkEmailSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_EMAIL, checkEmailGenerator, httpConnection);
}

function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

export {
  checkEmailSaga,
  registerIdentitySaga,
  checkEmailGenerator,
  registerIdentityGenerator,
  // registerPasswordGenerator,
};
