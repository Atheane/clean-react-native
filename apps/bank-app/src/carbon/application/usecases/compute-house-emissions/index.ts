/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HouseT } from '@bank/carbon-weight/dist';

import { HouseEmissions } from '@clean-rn/carbon/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ICarbonStackPages } from '../../../../shared/presentation/types';
import { ICarbonTypes, houseEmissionsComputed, initializeHouseEmissions } from '../../commands';

export function* computeHouseEmissionsSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ICarbonTypes.COMPUTE_HOUSE_EMISSIONS, computeHouseEmissionsGenerator);
}

export function* computeHouseEmissionsGenerator({
  payload,
}: {
  type: string;
  payload: HouseT & { consumption: number } & { builtYear: number };
}): Generator<StrictEffect, any, any> {
  try {
    const houseCarbonFootprint = new HouseEmissions(payload);
    yield put(
      houseEmissionsComputed({
        footprint: houseCarbonFootprint.value,
        average: houseCarbonFootprint.valueAverage,
      }),
    );
    yield call(AsyncStorage.setItem, IStoreKey.HOUSE_EMISSION, houseCarbonFootprint.value.toFixed(2));
    yield call(
      AsyncStorage.setItem,
      IStoreKey.AVERAGE_HOUSE_EMISSION,
      houseCarbonFootprint.valueAverage.toFixed(2),
    );
    yield call(navigate, { route: ICarbonStackPages.MENU });
  } catch (error: any) {
    yield put(initializeHouseEmissions());
    yield put(showUnknownError(error as Error));
  }
}
