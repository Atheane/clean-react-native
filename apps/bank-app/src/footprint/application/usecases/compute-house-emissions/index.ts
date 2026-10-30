/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HouseT } from '@bank/carbon-weight/dist';
import { HouseEmissions } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IFootprintStackPages } from '../../../../shared/presentation/types';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { IFootprintTypes, houseEmissionsComputed, initializeHouseEmissions } from '../../commands';

export function* computeHouseEmissionsSaga(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.COMPUTE_HOUSE_EMISSIONS, computeHouseEmissionsGenerator, httpConnection);
}

export function* computeHouseEmissionsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: HouseT & { consumption: number } & { builtYear: number };
  },
): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const houseCarbonFootprint = new HouseEmissions(payload);
    yield put(
      houseEmissionsComputed({
        footprint: houseCarbonFootprint.value,
        average: houseCarbonFootprint.valueAverage,
      }),
    );
    yield call(AsyncStorage.setItem, IStoreKey.HOUSE_EMISSION, houseCarbonFootprint.value.toFixed(2));
    yield call(
      AsyncStorage.setItem,
      IStoreKey.AVERAGE_HOUSE_EMISSION,
      houseCarbonFootprint.valueAverage.toFixed(2),
    );
    yield call(navigate, { route: IFootprintStackPages.FOOTPRINT_ESTIMATION });
  } catch (error: any) {
    yield put(initializeHouseEmissions());
    yield put(showUnknownError(error as Error));
  }
}
