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
  IValidatePhoneQuery,
} from '@clean-rn/auth/domain';

import {
  ISignupTypes,
  emailChecked,
  identityRegistered,
  passwordRegistered,
  birthRegistered,
  addressRegistered,
  signupFailed,
  phoneValidated,
  phoneChecked,
} from '../../commands/signup';
import { selectEmail, selectProspect } from '../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

function* checkEmailExistsGenerator(
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
    yield put(signupFailed(new AuthError.SignupFailureEmailExists()));
    yield cancel();
  }
  yield put(emailChecked());
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

function* checkPhoneExistsGenerator(
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
    yield put(signupFailed(new AuthError.SignupFailurePhoneExists()));
    yield cancel();
  }
  yield put(phoneChecked());
}

function* validatePhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IValidatePhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  const api = AuthApi.getInstance(httpConnection);
  // api call
  const otpIsValid: ISuccess = yield call([api, api.validatePhone], payload);
  if (!otpIsValid.success) {
    yield put(signupFailed(new AuthError.SignupFailureInvalidPhoneCode()));
    yield cancel();
  }
  yield put(phoneValidated());
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

function* checkEmailExistsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_EMAIL_EXISTS, checkEmailExistsGenerator, httpConnection);
}

function* registerIdentitySaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator);
}

function* registerPasswordSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator);
}

function* checkPhoneExistsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_PHONE_EXISTS, checkPhoneExistsGenerator, httpConnection);
}

function* registerBirthSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator);
}

function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}

function* validatePhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection);
}

export {
  checkEmailExistsSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneExistsSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  checkEmailExistsGenerator,
  registerIdentityGenerator,
  registerPasswordGenerator,
  checkPhoneExistsGenerator,
  registerBirthGenerator,
  registerAddressGenerator,
  validatePhoneGenerator,
};
