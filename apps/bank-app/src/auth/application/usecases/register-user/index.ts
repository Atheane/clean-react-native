import { put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { ICheckEmailQuery, ISuccess } from '@clean-rn/auth/domain';

import { checkEmailSuccess, ICheckEmailTypes } from '../../commands/check-email';

function* registerNameGenerator({
  payload,
}: {
  type: string;
  payload: ICheckEmailQuery;
}): Generator<StrictEffect, any, any> {
  //attachBearerToken to httpConnection
  yield put(checkEmailSuccess(emailExists));
}

function* registerNameSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ICheckEmailTypes.FETCH_CHECK_EMAIL, registerNameGenerator);
}

export { registerNameSaga, registerNameGenerator };
