/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import { Footprint } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IFootprintTypes, initializeFootprint, footprintCreated, footprintNotFound } from '../../commands';

export function* getFootprintSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.GET_FOOTPRINT, getFootprintGenerator, httpConnection);
}

export function* getFootprintGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    const footprint: Footprint = yield call([footprintApi, footprintApi.getFootprint]);

    if (!footprint) {
      yield put(footprintNotFound());
      yield cancel();
    }

    yield put(footprintCreated(footprint));
  } catch (error: any) {
    console.log(error);
    yield put(initializeFootprint());
    yield put(showUnknownError(error as Error));
  }
}
