/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FoodConsumptionT } from '@bank/carbon-weight/dist';

import { FoodEmissions } from '@clean-rn/carbon/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { ICarbonStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import {
  computeFoodEmissionsSaga,
  computeFoodEmissionsGenerator,
} from '../../usecases/compute-food-emissions';
import { ICarbonTypes, foodEmissionsComputed, initializeFoodEmissions } from '../../commands';

describe('ComputeFoodEmissions - usecase', () => {
  const genObject = computeFoodEmissionsSaga();

  const mockData: FoodConsumptionT = {
    alcohol: 7,
    bread: 7,
    cheese: 7,
    fish: 7,
    harvestExotic: 7,
    harvestLocal: 7,
    meatRed: 7,
    meatWhite: 7,
    rice: 7,
    soft: 7,
  };
  it('Should wait for COMPUTE_FOOD_EMISSIONS action and call computeFoodEmissionsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICarbonTypes.COMPUTE_FOOD_EMISSIONS, computeFoodEmissionsGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call foodEmissionsComputed', async () => {
    const carbonFootprint = new FoodEmissions(mockData);
    testSaga(computeFoodEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockData,
    })
      .next()
      .put(
        foodEmissionsComputed({
          footprint: carbonFootprint.value,
          average: carbonFootprint.valueAverage,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.FOOD_EMISSION, carbonFootprint.value.toFixed(2))
      .next(carbonFootprint.value.toFixed(2))
      .call(AsyncStorage.setItem, IStoreKey.AVERAGE_FOOD_EMISSION, carbonFootprint.valueAverage.toFixed(2))
      .next(carbonFootprint.valueAverage.toFixed(2))
      .call(navigate, { route: ICarbonStackPages.MENU })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeFoodEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockData,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFoodEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
