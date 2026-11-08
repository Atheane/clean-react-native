/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';
import { FuelE } from '@bank/carbon-weight/dist/vehicle/types';

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

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockTransportData, transportCarbonFootprint } from '../fixtures/mock-data';

describe('ComputeTransportEmissions - usecase', () => {
  let httpConnection: HttpConnection;

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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
    testSaga(computeTransportEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockTransportData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(
        transportEmissionsComputed({
          footprint: transportCarbonFootprint.value,
          average: transportCarbonFootprint.valueAverage,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.TRANSPORT_EMISSION, transportCarbonFootprint.value.toFixed(2))
      .next(transportCarbonFootprint.value.toFixed(2))
      .call(
        AsyncStorage.setItem,
        IStoreKey.AVERAGE_TRANSPORT_EMISSION,
        transportCarbonFootprint.valueAverage.toFixed(2),
      )
      .next(transportCarbonFootprint.valueAverage.toFixed(2))
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeTransportEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockTransportData,
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
