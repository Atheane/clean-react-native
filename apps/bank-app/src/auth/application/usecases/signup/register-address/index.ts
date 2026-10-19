/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterAddressCommand, User } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../../shared/application/commands/manage-global-errors';
import {
  ISignupTypes,
  addressRegistered,
  fetchSignupUser,
  initializeSignupStep,
} from '../../../commands/signup';
import {
  selectUserFromSignup,
  selectEmailFromSignup,
  selectPhoneOtpFromSignup,
} from '../../../state-management/selectors';

export function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator);
}
export function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  try {
    let user = yield select(selectUserFromSignup);

    if (!user) {
      const email = yield select(selectEmailFromSignup);
      user = User.Create(email);
    }
    // add password property to user instance
    user.registerAddress(payload);

    // domain event
    yield put(addressRegistered(user));

    const phoneOtp = yield select(selectPhoneOtpFromSignup);
    yield put(fetchSignupUser({ user, phoneOtp }));
  } catch (e: unknown) {
    yield put(initializeSignupStep());
    yield put(showUnknownError(e as Error));
  }
}
