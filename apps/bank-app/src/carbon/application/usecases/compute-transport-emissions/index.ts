/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { TransportEmissions } from '@clean-rn/carbon/domain';

import { ICarbonTypes, transportEmissionsComputed, initializeTransportEmissions } from '../../commands';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ICarbonStackPages } from '../../../../shared/presentation/types';

export function* computeTransportEmissionsSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS, computeTransportEmissionsGenerator);
}

export function* computeTransportEmissionsGenerator({
  payload,
}: {
  type: string;
  payload: VehicleConsumptionT;
}): Generator<StrictEffect, any, any> {
  try {
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
    yield call(navigate, { route: ICarbonStackPages.CARBON });
  } catch (error: any) {
    yield put(initializeTransportEmissions());
    yield put(showUnknownError(error as Error));
  }
}
