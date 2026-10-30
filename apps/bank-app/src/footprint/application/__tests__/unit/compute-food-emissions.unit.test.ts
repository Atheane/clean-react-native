/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FoodConsumptionT } from '@bank/carbon-weight/dist';
import { FoodEmissions } from '@clean-rn/footprint/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import {
  computeFoodEmissionsSaga,
  computeFoodEmissionsGenerator,
} from '../../usecases/compute-food-emissions';
import { IFootprintTypes, foodEmissionsComputed, initializeFoodEmissions } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('ComputeFoodEmissions - usecase', () => {
  let httpConnection: HttpConnection;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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
    const genObject = computeFoodEmissionsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.COMPUTE_FOOD_EMISSIONS, computeFoodEmissionsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call foodEmissionsComputed', async () => {
    const carbonFootprint = new FoodEmissions(mockData);
    testSaga(computeFoodEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
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
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeFoodEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockData,
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
