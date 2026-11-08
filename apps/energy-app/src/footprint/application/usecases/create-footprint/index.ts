/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, cancel, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { FootprintError, HouseholdVO, ICreateFootprintCommand } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IFootprintTypes, footprintNotCreated, initializeFootprint, footprintCreated } from '../../commands';
import { mapHouseholdPropsToDomain } from '../../mappers';
import { IHouseholdProps } from '../../../presentation/types';
import { selectUser } from '../../../../user/application/state-management/selectors';

export function* createFootprintSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.CREATE_FOOTPRINT, createFootprintGenerator, httpConnection);
}

export function* createFootprintGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IHouseholdProps;
  },
): Generator<StrictEffect, any, any> {
  try {
    // validation du formulaire
    const householdVO: HouseholdVO = yield call(mapHouseholdPropsToDomain, payload);

    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    const user = yield select(selectUser);

    const cmd: ICreateFootprintCommand = {
      userId: user.id,
      household: householdVO,
    };
    // check if house already exists
    const footprint = yield call([footprintApi, footprintApi.createFootprint], cmd);
    yield put(footprintCreated(footprint));
  } catch (error: any) {
    console.log(error);
    yield put(initializeFootprint());
    if (FootprintError.isFootprintError(error)) {
      yield put(footprintNotCreated(error));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
