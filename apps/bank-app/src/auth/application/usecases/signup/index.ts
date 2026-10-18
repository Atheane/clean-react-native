import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import {
  ICheckEmailQuery,
  ICheckPhoneQuery,
  IRegisterIdentityCommand,
  ISuccess,
  Prospect,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  AuthError,
} from '@clean-rn/auth/domain';

import {
  ISignupTypes,
  emailChecked,
  identityRegistered,
  passwordRegistered,
  birthRegistered,
  addressRegistered,
  phoneChecked,
  signupFailed,
} from '../../commands/signup';
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
  if (emailExists.success) {
    yield put(
      signupFailed({
        error: new AuthError.SignupFailureEmailExists(),
        success: emailExists.success,
      }),
    );
    yield cancel();
  }
  yield put(emailChecked(emailExists));
}

function* registerIdentityGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterIdentityCommand;
}): Generator<StrictEffect, any, any> {
  let prospect: Prospect;
  // retrieve prospect from redux store
  prospect = yield select(selectProspect);

  if (!prospect) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    prospect = Prospect.Create(email);
  }

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
  let prospect: Prospect;
  // retrieve prospect from redux store
  prospect = yield select(selectProspect);

  if (!prospect) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    prospect = Prospect.Create(email);
  }
  // add password property to prospect instance
  prospect.registerPassword(payload.password);
  // save prospect with identity & password registered in redux store
  yield put(passwordRegistered(prospect));
}

function* checkPhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ICheckPhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const phoneExists: ISuccess = yield call([api, api.searchPhone], payload);
  if (phoneExists.success) {
    yield cancel();
    throw new AuthError.SignupFailurePhoneExists();
  }
  yield put(phoneChecked(phoneExists));
}

function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand;
}): Generator<StrictEffect, any, any> {
  let prospect: Prospect;
  // retrieve prospect from redux store
  prospect = yield select(selectProspect);

  if (!prospect) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    prospect = Prospect.Create(email);
  }

  // add password property to prospect instance
  prospect.registerBirth(payload);
  // save prospect with identity & password registered in redux store
  yield put(birthRegistered(prospect));
}

function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  let prospect: Prospect;
  // retrieve prospect from redux store
  prospect = yield select(selectProspect);

  if (!prospect) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    prospect = Prospect.Create(email);
  }

  // add password property to prospect instance
  prospect.registerAddress(payload);
  // save prospect with identity & password registered in redux store
  yield put(addressRegistered(prospect));
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

function* checkPhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_PHONE, checkPhoneGenerator, httpConnection);
}

function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator);
}

function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}

export {
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  checkEmailGenerator,
  registerIdentityGenerator,
  registerPasswordGenerator,
  registerBirthGenerator,
  registerAddressGenerator,
};
