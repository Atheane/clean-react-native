import { call, put, StrictEffect, select, takeEvery } from 'redux-saga/effects';

import {
  ICheckEmailQuery,
  IRegisterIdentityCommand,
  ISuccess,
  Prospect,
  IRegisterPasswordCommand,
} from '@clean-rn/auth/domain';

import { ISignupTypes, emailChecked, identityRegistered, passwordRegistered } from '../../commands/signup';
import { selectEmail, selectProspect } from '../../state-management';
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
  yield put(emailChecked(emailExists));
}

function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand;
}): Generator<StrictEffect, any, any> {
  // retrieve email from redux store
  const email = yield select(selectEmail);
  const prospect = Prospect.Create(email);
  // add identity property to prospect instance
  prospect.registerIdentity(payload);
  // save prospect with identity registered in redux store
  yield put(identityRegistered(prospect));
}

function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand;
}): Generator<StrictEffect, any, any> {
  // retrieve prospect with identity registered from redux store
  const prospect = yield select(selectProspect);
  // add password property to prospect instance
  prospect.registerPassword(payload);
  // save prospect with identity & password registered in redux store
  yield put(passwordRegistered(prospect));
}

function* checkEmailSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_EMAIL, checkEmailGenerator, httpConnection);
}

function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

export {
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkEmailGenerator,
  registerIdentityGenerator,
  registerPasswordGenerator,
};
