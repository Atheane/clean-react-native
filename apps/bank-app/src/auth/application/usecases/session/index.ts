/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { fetchLogout, IAuthTypes } from '../../commands';

export function* sessionSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.LOGIN_SUCCEDED, sessionGenerator);
}

export function* sessionGenerator(): Generator<StrictEffect, any, any> {
  yield delay(50 * 5 * 1000); // 58s to be able to logout (logout needs refresh token)
  console.log('Session expired, fetching logout');
  // Exécuter l'action LOGOUT après 5 minutes
  yield put(fetchLogout());
}
