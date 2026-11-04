/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery, select } from 'redux-saga/effects';

import { IRegisterRevenuesCommand, User } from '@clean-rn/user/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IUserTypes, revenuesRegistered, resetError, fetchSignupUser } from '../../commands';
import { selectEmail, selectPhoneOtp, selectUser } from '../../state-management/selectors';

export function* registerRevenuesSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.REGISTER_REVENUES, registerRevenuesGenerator);
}

export function* registerRevenuesGenerator({
  payload,
}: {
  type: string;
  payload: IRegisterRevenuesCommand;
}): Generator<StrictEffect, any, any> {
  try {
    let user = yield select(selectUser);
    if (!user) {
      const email = yield select(selectEmail);
      user = User.CreateFromEmail(email);
    }

    user.registerRevenues(payload);

    // domain event
    yield put(revenuesRegistered(user));

    const phoneOtp = yield select(selectPhoneOtp);
    yield put(fetchSignupUser({ user, phoneOtp }));
  } catch (e: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(resetError());
    yield put(showUnknownError(e as Error));
  }
}
