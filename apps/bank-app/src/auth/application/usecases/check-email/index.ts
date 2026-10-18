import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { ICheckEmailQuery } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { checkEmailSuccess, ICheckEmailTypes } from '../../commands/check-email';

import { ISuccess } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

function* checkEmailApiSaga(
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
  yield put(checkEmailSuccess(emailExists));
}

function* checkEmailSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICheckEmailTypes.FETCH_CHECK_EMAIL, checkEmailApiSaga, httpConnection);
}

export { checkEmailSaga, checkEmailApiSaga };
