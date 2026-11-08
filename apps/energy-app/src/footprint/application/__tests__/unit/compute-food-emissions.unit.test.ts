/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import {
  computeFoodEmissionsSaga,
  computeFoodEmissionsGenerator,
} from '../../usecases/compute-food-emissions';
import { IFootprintTypes, foodEmissionsComputed, initializeFoodEmissions } from '../../commands';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockFoodData, foodCarbonFootprint } from '../fixtures/mock-data';

describe('ComputeFoodEmissions - usecase', () => {
  let httpConnection: HttpConnection;

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for COMPUTE_FOOD_EMISSIONS action and call computeFoodEmissionsGenerator, should be done on next iteration', () => {
    const genObject = computeFoodEmissionsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.COMPUTE_FOOD_EMISSIONS, computeFoodEmissionsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call foodEmissionsComputed', async () => {
    testSaga(computeFoodEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockFoodData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(
        foodEmissionsComputed({
          footprint: foodCarbonFootprint.value,
          average: foodCarbonFootprint.valueAverage,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.FOOD_EMISSION, foodCarbonFootprint.value.toFixed(2))
      .next(foodCarbonFootprint.value.toFixed(2))
      .call(
        AsyncStorage.setItem,
        IStoreKey.AVERAGE_FOOD_EMISSION,
        foodCarbonFootprint.valueAverage.toFixed(2),
      )
      .next(foodCarbonFootprint.valueAverage.toFixed(2))
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeFoodEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockFoodData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFoodEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
