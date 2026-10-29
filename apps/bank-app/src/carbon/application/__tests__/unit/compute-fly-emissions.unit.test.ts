/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlightI } from '@bank/carbon-weight/dist';
import { SeatE } from '@bank/carbon-weight/dist/flight/types';

import { FlyEmissions } from '@clean-rn/carbon/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { ICarbonStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { computeFlyEmissionsSaga, computeFlyEmissionsGenerator } from '../../usecases/compute-fly-emissions';
import { ICarbonTypes, flyEmissionsComputed, initializeFlyEmissions } from '../../commands';

describe('ComputeFlyEmissions - usecase', () => {
  const genObject = computeFlyEmissionsSaga();

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
    expect(genObject.next().value).toEqual(
      takeEvery(ICarbonTypes.COMPUTE_FLY_EMISSIONS, computeFlyEmissionsGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call flyEmissionsComputed', async () => {
    testSaga(computeFlyEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: [mockFlyData1, mockFlyData2],
    })
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
      .call(navigate, { route: ICarbonStackPages.FOOTPRINT_ESTIMATION })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeFlyEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_FLY_EMISSIONS,
      payload: [mockFlyData1, mockFlyData2],
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFlyEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
