/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { HeaterVO, FootprintError } from '@clean-rn/footprint/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectHouse } from '../../selectors';

import { IFootprintTypes, heatersAdded, heatersNotAdded, initializeFootprint } from '../../commands';
import { mapHeaterPropsToDomain } from '../../mappers';
import { IHeaterProps } from '../../../presentation/types';

export function* addHeatersSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.ADD_HEATERS, addHeatersGenerator, httpConnection);
}

export function* addHeatersGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IHeaterProps;
  },
): Generator<StrictEffect, any, any> {
  try {
    // validation du formulaire
    const heatersVO: HeaterVO[] = yield call(mapHeaterPropsToDomain, payload);

    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    let house = yield select(selectHouse);
    // check if house already exists
    house = yield call([footprintApi, footprintApi.addHeaters], {
      house,
      heaters: heatersVO,
    });

    yield put(heatersAdded(house));
  } catch (error: any) {
    console.log(error);
    yield put(initializeFootprint());
    if (
      error instanceof FootprintError.InvalidHeaterDate ||
      error instanceof FootprintError.InvalidHeaterType ||
      error instanceof FootprintError.InvalidHeaterUsage
    ) {
      yield put(heatersNotAdded(error));
    } else if (error instanceof ServerError && error.statusCode === 400) {
      yield put(heatersNotAdded(new FootprintError.HeaterAlreadyExists()));
    } else {
      yield put(showUnknownError(error as Error));
    }
  }
}
