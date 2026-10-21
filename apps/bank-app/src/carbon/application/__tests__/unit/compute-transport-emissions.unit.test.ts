/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { TransportEmissions } from '@clean-rn/carbon/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { ICarbonStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import {
  computeTransportEmissionsSaga,
  computeTransportEmissionsGenerator,
} from '../../usecases/compute-transport-emissions';
import { ICarbonTypes, transportEmissionsComputed, initializeTransportEmissions } from '../../commands';
import { FuelE } from '@bank/carbon-weight/dist/vehicle/types';

describe('ComputeTransportEmissions - usecase', () => {
  const genObject = computeTransportEmissionsSaga();

  const mockData: VehicleConsumptionT = {
    distanceByYear: 20000,
    fuel: FuelE.E85,
    mpg: 8,
  };
  it('Should wait for COMPUTE_TRANSPORT_EMISSIONS action and call computeTransportEmissionsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS, computeTransportEmissionsGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call transportEmissionsComputed', async () => {
    const carbonFootprint = new TransportEmissions(mockData);
    testSaga(computeTransportEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockData,
    })
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
      .call(navigate, { route: ICarbonStackPages.MENU })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeTransportEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockData,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeTransportEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
