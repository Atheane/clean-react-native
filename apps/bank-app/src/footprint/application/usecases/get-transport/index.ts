/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { Transport, ISearchTransportQuery } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { transportCreated, IFootprintTypes, initializeFootprint } from '../../commands';

export function* getTransportSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.GET_TRANSPORT, getTransportGenerator, httpConnection);
}

export function* getTransportGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    const user = yield select(selectUser);
    // check if house already exists
    const query: ISearchTransportQuery = {
      userId: user.id,
    };
    let transport: Transport = yield call([footprintApi, footprintApi.searchTransport], query);
    if (!transport) {
      transport = yield call([footprintApi, footprintApi.createTransport], {
        userId: user.id,
      });
    }

    yield put(transportCreated(transport));
  } catch (error: any) {
    console.log(error);
    yield put(initializeFootprint());
    yield put(showUnknownError(error as Error));
  }
}
