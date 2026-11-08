/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IRegisterAddressCommand, User } from '@clean-rn/user/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IUserTypes, addressRegistered, fetchSignupUser, resetError } from '../../commands';
import { selectUser, selectEmail, selectPhoneOtp } from '../../state-management/selectors';

export function* registerAddressSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.REGISTER_ADDRESS, registerAddressGenerator);
}
export function* registerAddressGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterAddressCommand;
}): Generator<StrictEffect, any, any> {
  try {
    let user = yield select(selectUser);

    if (!user) {
      const email = yield select(selectEmail);
      user = User.CreateFromEmail(email);
    }
    // add password property to user instance
    user.registerAddress(payload);

    // domain event
    yield put(addressRegistered(user));
    const phoneOtp = yield select(selectPhoneOtp);
    yield put(fetchSignupUser({ user, phoneOtp }));
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(resetError());
    yield put(showUnknownError(e as Error));
  }
}
