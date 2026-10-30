/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlightI } from '@bank/carbon-weight/dist';

import { FlyEmissions } from '@clean-rn/footprint/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { IFootprintTypes, flyEmissionsComputed, initializeFlyEmissions } from '../../commands';

export function* computeFlyEmissionsSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.COMPUTE_FLY_EMISSIONS, computeFlyEmissionsGenerator);
}

export function* computeFlyEmissionsGenerator({
  payload,
}: {
  type: string;
  payload: FlightI[];
}): Generator<StrictEffect, any, any> {
  try {
    const flyCarbonFootprint = payload.reduce((acc: number, flight: FlightI) => {
      acc += new FlyEmissions(flight).value;
      return acc;
    }, 0);
    const avgFlyCarbonFootprint = new FlyEmissions(payload[0]).valueAverage;

    yield put(
      flyEmissionsComputed({
        footprint: flyCarbonFootprint,
        average: avgFlyCarbonFootprint,
      }),
    );
    yield call(AsyncStorage.setItem, IStoreKey.FLY_EMISSION, flyCarbonFootprint.toFixed(2));
    yield call(AsyncStorage.setItem, IStoreKey.AVERAGE_FLY_EMISSION, avgFlyCarbonFootprint.toFixed(2));
    yield call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION });
  } catch (error: unknown) {
    yield put(initializeFlyEmissions());
    yield put(showUnknownError(error as Error));
  }
}
