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
  computeHouseEmissionsSaga,
  computeHouseEmissionsGenerator,
} from '../../usecases/compute-house-emissions';
import { IFootprintTypes, houseEmissionsComputed, initializeHouseEmissions } from '../../commands';
import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockHouseData, houseCarbonFootprint } from '../fixtures/mock-data';

describe('ComputeHouseEmissions - usecase', () => {
  let httpConnection: HttpConnection;
  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
  });
  it('Should wait for COMPUTE_HOUSE_EMISSIONS action and call computeHouseEmissionsGenerator, should be done on next iteration', () => {
    const genObject = computeHouseEmissionsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.COMPUTE_HOUSE_EMISSIONS, computeHouseEmissionsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call houseEmissionsComputed', async () => {
    testSaga(computeHouseEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_HOUSE_EMISSIONS,
      payload: mockHouseData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(
        houseEmissionsComputed({
          footprint: houseCarbonFootprint.value,
          average: houseCarbonFootprint.valueAverage,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.HOUSE_EMISSION, houseCarbonFootprint.value.toFixed(2))
      .next(houseCarbonFootprint.value.toFixed(2))
      .call(
        AsyncStorage.setItem,
        IStoreKey.AVERAGE_HOUSE_EMISSION,
        houseCarbonFootprint.valueAverage.toFixed(2),
      )
      .next(houseCarbonFootprint.valueAverage.toFixed(2))
      .call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeHouseEmissionsGenerator, httpConnection, {
      type: IFootprintTypes.COMPUTE_HOUSE_EMISSIONS,
      payload: mockHouseData,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeHouseEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
