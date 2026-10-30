/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlightI } from '@bank/carbon-weight/dist';
import { SeatE } from '@bank/carbon-weight/dist/flight/types';

import { FlyEmissions } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { computeFlyEmissionsSaga, computeFlyEmissionsGenerator } from '../../usecases/compute-fly-emissions';
import { IFootprintTypes, flyEmissionsComputed, initializeFlyEmissions } from '../../commands';
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

describe('ComputeFlyEmissions - usecase', () => {
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

  const mockFlyData1: FlightI = {
    fromIATA: 'CDG',
    toIATA: 'MYK',
    nbPassengers: 1,
    roundTrip: true,
    seatType: SeatE.business,
  };
  const mockFlyData2: FlightI = {
    fromIATA: 'BAB',
    toIATA: 'CDG',
    nbPassengers: 1,
    roundTrip: false,
    seatType: SeatE.economy,
  };
  const flyCarbonFootprint1 = new FlyEmissions(mockFlyData1);
  const flyCarbonFootprint2 = new FlyEmissions(mockFlyData2);

  it('Should wait for COMPUTE_FLY_EMISSIONS action and call computeFlyEmissionsGenerator, should be done on next iteration', () => {
    const genObject = computeFlyEmissionsSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.COMPUTE_FLY_EMISSIONS, computeFlyEmissionsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call flyEmissionsComputed', async () => {
    testSaga(computeFlyEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: [mockFlyData1, mockFlyData2],
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(
        flyEmissionsComputed({
          footprint: flyCarbonFootprint1.value + flyCarbonFootprint2.value,
          average: flyCarbonFootprint1.valueAverage,
        }),
      )
      .next()
      .call(
        AsyncStorage.setItem,
        IStoreKey.FLY_EMISSION,
        (flyCarbonFootprint1.value + flyCarbonFootprint2.value).toFixed(2),
      )
      .next((flyCarbonFootprint1.value + flyCarbonFootprint2.value).toFixed(2))
      .call(AsyncStorage.setItem, IStoreKey.AVERAGE_FLY_EMISSION, flyCarbonFootprint1.valueAverage.toFixed(2))
      .next(flyCarbonFootprint1.valueAverage.toFixed(2))
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeFlyEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_FLY_EMISSIONS,
      payload: [mockFlyData1, mockFlyData2],
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFlyEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
