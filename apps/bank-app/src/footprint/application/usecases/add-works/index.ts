/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, select, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import { WorkVO, FootprintError } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectHouse } from '../../selectors';

import { IFootprintTypes, worksAdded, worksNotAdded, initializeFootprint } from '../../commands';
import { mapWorkPropsToDomain } from '../../mappers';
import { IWorksProps } from '../../../presentation/types';

/**
 * Saga to handle adding works.
 *
 * Listens for the ADD_WORKS action type and triggers the addWorksGenerator
 * with the provided HttpConnection instance.
 *
 * @param httpConnection - The HttpConnection instance to be used for API requests.
 */

export function* addWorksSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.ADD_WORKS, addWorksGenerator, httpConnection);
}

export function* addWorksGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IWorksProps;
  },
): Generator<StrictEffect, any, any> {
  try {
    // validation du formulaire
    const worksVO: WorkVO[] = yield call(mapWorkPropsToDomain, payload);
    yield call(ensureTokenRefreshed, httpConnection);

    let house = yield select(selectHouse);
    house.addWorks(worksVO);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    house = yield call([footprintApi, footprintApi.addWorks], {
      house,
      worksVO: worksVO,
    });

    yield put(worksAdded(house));
  } catch (error: any) {
    yield put(initializeFootprint());
    if (FootprintError.isFootprintError(error)) {
      yield put(worksNotAdded(error));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
