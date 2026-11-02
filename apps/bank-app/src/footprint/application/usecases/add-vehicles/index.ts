/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, cancel, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { VehicleVO, FootprintError } from '@clean-rn/footprint/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { Transport } from '@clean-rn/footprint/domain';

import { selectUser } from '../../../../user/application/state-management/selectors';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { IVehiclesProps } from '../../../presentation/types';
import { selectTransport } from '../../selectors';
import { IFootprintTypes, vehiclesAdded, vehiclesNotAdded, initializeFootprint } from '../../commands';

export function* addVehiclesSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.ADD_VEHICLES, addVehiclesGenerator, httpConnection);
}

export function* addVehiclesGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IVehiclesProps;
  },
): Generator<StrictEffect, any, any> {
  try {
    // validation du formulaire
    const vehiclesVO: VehicleVO[] = payload.vehicles;

    yield call(ensureTokenRefreshed, httpConnection);

    // todo when back-end has transportId, retrieve from back-end rather than from user
    // necessary to allow for testability
    const user: Transport = yield select(selectUser);

    let transport: Transport = yield select(selectTransport);

    if (!transport) {
      transport = Transport.Create({ transportId: user.id });
    }

    const footprintApi = FootprintApi.getInstance(httpConnection);

    transport = yield call([footprintApi, footprintApi.addVehicles], {
      transport,
      vehiclesVO,
    });

    yield put(vehiclesAdded(transport));
  } catch (error: any) {
    yield put(initializeFootprint());
    if (FootprintError.isFootprintError(error)) {
      yield put(vehiclesNotAdded(error));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
