/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';
import { FuelE } from '@bank/carbon-weight/dist/vehicle/types';
import { TransportEmissions } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import {
  computeTransportEmissionsSaga,
  computeTransportEmissionsGenerator,
} from '../../usecases/compute-transport-emissions';
import { IFootprintTypes, transportEmissionsComputed, initializeTransportEmissions } from '../../commands';

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

describe('ComputeTransportEmissions - usecase', () => {
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

  const mockData: VehicleConsumptionT = {
    distanceByYear: 20000,
    fuel: FuelE.E85,
    mpg: 8,
  };
  it('Should wait for COMPUTE_TRANSPORT_EMISSIONS action and call computeTransportEmissionsGenerator, should be done on next iteration', () => {
    const genObject = computeTransportEmissionsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(
        IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
        computeTransportEmissionsGenerator,
        httpConnection,
      ),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call transportEmissionsComputed', async () => {
    const carbonFootprint = new TransportEmissions(mockData);
    testSaga(computeTransportEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(
        transportEmissionsComputed({
          footprint: carbonFootprint.value,
          average: carbonFootprint.valueAverage,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.TRANSPORT_EMISSION, carbonFootprint.value.toFixed(2))
      .next(carbonFootprint.value.toFixed(2))
      .call(
        AsyncStorage.setItem,
        IStoreKey.AVERAGE_TRANSPORT_EMISSION,
        carbonFootprint.valueAverage.toFixed(2),
      )
      .next(carbonFootprint.valueAverage.toFixed(2))
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeTransportEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeTransportEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
