/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FoodConsumptionT } from '@bank/carbon-weight/dist';

import { FoodEmissions } from '@clean-rn/footprint/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { IFootprintTypes, foodEmissionsComputed, initializeFoodEmissions } from '../../commands';

export function* computeFoodEmissionsSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.COMPUTE_FOOD_EMISSIONS, computeFoodEmissionsGenerator);
}

export function* computeFoodEmissionsGenerator({
  payload,
}: {
  type: string;
  payload: FoodConsumptionT;
}): Generator<StrictEffect, any, any> {
  try {
    const foodCarbonFootprint = new FoodEmissions(payload);
    yield put(
      foodEmissionsComputed({
        footprint: foodCarbonFootprint.value,
        average: foodCarbonFootprint.valueAverage,
      }),
    );
    yield call(AsyncStorage.setItem, IStoreKey.FOOD_EMISSION, foodCarbonFootprint.value.toFixed(2));
    yield call(
      AsyncStorage.setItem,
      IStoreKey.AVERAGE_FOOD_EMISSION,
      foodCarbonFootprint.valueAverage.toFixed(2),
    );
    yield call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION });
  } catch (error: any) {
    yield put(initializeFoodEmissions());
    yield put(showUnknownError(error as Error));
  }
}
