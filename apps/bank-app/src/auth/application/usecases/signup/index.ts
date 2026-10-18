import { call, put, StrictEffect, select, takeEvery, cancel } from 'redux-saga/effects';

import {
  ICheckEmailQuery,
  ICheckPhoneQuery,
  IRegisterIdentityCommand,
  ISuccess,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  AuthError,
  IValidatePhoneQuery,
  ISendPhoneValidationCommand,
  User,
  IUserProperties,
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
  userSignedUp,
} from '../../commands/signup';
import { selectEmail, selectPhoneOtp, selectUser } from '../../state-management';
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
  let user: User;
  // retrieve user from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add identity property to prospect instance
  user.registerIdentity(payload);
  // save prospect with identity registered in redux store
  yield put(identityRegistered(user));
}

function* registerPasswordGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterPasswordCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }
  // add password property to prospect instance
  user.registerPassword(payload.password);
  // save prospect with identity & password registered in redux store
  yield put(passwordRegistered(user));
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
    yield put(signupFailed(new AuthError.SignupFailurePhoneExists()));
    yield cancel();
  }
  const phoneOtpSent: ISuccess = yield call(
    [api, api.sendPhoneValidation],
    payload as ISendPhoneValidationCommand,
  );
  if (!phoneOtpSent.success) {
    yield put(signupFailed(new AuthError.SignupFailureSendPhoneValidation()));
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
  const otpIsValid: ISuccess = yield call([api, api.checkPhoneValidation], payload);
  if (!otpIsValid.success) {
    yield put(signupFailed(new AuthError.SignupFailureInvalidPhoneCode()));
    yield cancel();
  }
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);
  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add password property to prospect instance
  user.validatePhone(payload);
  yield put(phoneValidated(user));
}

function* registerBirthGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterBirthCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add password property to user instance
  user.registerBirth(payload);
  // save user with identity & password registered in redux store
  yield put(birthRegistered(user));
}

function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  let user: User;
  // retrieve prospect from redux store
  user = yield select(selectUser);

  if (!user) {
    // retrieve email from redux store
    const email = yield select(selectEmail);
    user = User.Create(email);
  }

  // add password property to user instance
  user.registerAddress(payload);
  // save user with identity & password registered in redux store
  yield put(addressRegistered(user));
}

function* signupUserGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  const user = yield select(selectUser);
  const phoneOtp = yield select(selectPhoneOtp);

  const api = AuthApi.getInstance(httpConnection);
  const { uid } = yield call([api, api.createUser], { ...user.properties, phoneOtp });
  user.signup({ id: uid, ...(user.properties as IUserProperties) });
  yield put(userSignedUp(user));
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

function* checkPhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_CHECK_PHONE, checkPhoneGenerator, httpConnection);
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

function* signupUserSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection);
}

export {
  checkEmailExistsSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  signupUserSaga,
  checkEmailExistsGenerator,
  registerIdentityGenerator,
  registerPasswordGenerator,
  checkPhoneGenerator,
  registerBirthGenerator,
  registerAddressGenerator,
  validatePhoneGenerator,
  signupUserGenerator,
};
