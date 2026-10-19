/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HouseT } from '@bank/carbon-weight/dist';
import { HeaterE, HouseE, YearE } from '@bank/carbon-weight/dist/house/types';

import { HouseEmissions } from '@clean-rn/carbon/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { ICarbonStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import {
  computeHouseEmissionsSaga,
  computeHouseEmissionsGenerator,
} from '../../usecases/compute-house-emissions';
import { ICarbonTypes, houseEmissionsComputed, initializeHouseEmissions } from '../../commands';

describe('ComputeHouseEmissions - usecase', () => {
  const genObject = computeHouseEmissionsSaga();

  const mockData: HouseT & { consumption: number } & { builtYear: number } = {
    heater: HeaterE.fuelOil,
    built: YearE.old,
    surface: 60,
    consumption: 5000,
    builtYear: 1980,
    type: HouseE.house,
  };
  it('Should wait for COMPUTE_HOUSE_EMISSIONS action and call computeHouseEmissionsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICarbonTypes.COMPUTE_HOUSE_EMISSIONS, computeHouseEmissionsGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call houseEmissionsComputed', async () => {
    const houseCarbonFootprint = new HouseEmissions(mockData);
    testSaga(computeHouseEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_HOUSE_EMISSIONS,
      payload: mockData,
    })
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
      .call(navigate, { route: ICarbonStackPages.CARBON })
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(computeHouseEmissionsGenerator, {
      type: ICarbonTypes.COMPUTE_HOUSE_EMISSIONS,
      payload: mockData,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeHouseEmissions())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
