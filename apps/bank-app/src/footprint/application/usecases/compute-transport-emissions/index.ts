/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { TransportEmissions } from '@clean-rn/footprint/domain';

import { IFootprintTypes, transportEmissionsComputed, initializeTransportEmissions } from '../../commands';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IFootprintStackPages } from '../../../../shared/presentation/types';

export function* computeTransportEmissionsSaga(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  yield takeEvery(
    IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
    computeTransportEmissionsGenerator,
    httpConnection,
  );
}

export function* computeTransportEmissionsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: VehicleConsumptionT;
  },
): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const transportCarbonFootprint = new TransportEmissions(payload);
    yield put(
      transportEmissionsComputed({
        footprint: transportCarbonFootprint.value,
        average: transportCarbonFootprint.valueAverage,
      }),
    );

    yield call(AsyncStorage.setItem, IStoreKey.TRANSPORT_EMISSION, transportCarbonFootprint.value.toFixed(2));
    yield call(
      AsyncStorage.setItem,
      IStoreKey.AVERAGE_TRANSPORT_EMISSION,
      transportCarbonFootprint.valueAverage.toFixed(2),
    );
    yield call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION });
  } catch (error: any) {
    yield put(initializeTransportEmissions());
    yield put(showUnknownError(error as Error));
  }
}
