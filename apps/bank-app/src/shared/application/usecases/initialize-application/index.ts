/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IStoreKey } from '../../../../shared/application/types';
import { IAuthStackPages, IUserStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { applicationInitialized, IInitializationTypes } from '../../commands/initialize-application';

export function* initializeApplicationSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initializeApplicationGenerator);
}

export function* initializeApplicationGenerator(): Generator<StrictEffect, any, any> {
  // retireve data from async storage
  try {
    const emailString = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
    const initRouteName = emailString ? IAuthStackPages.LOGIN : IUserStackPages.SIGNUP_EMAIL;

    const houseEmissions = yield call(AsyncStorage.getItem, IStoreKey.HOUSE_EMISSION);
    const averageHouseEmissions = yield call(AsyncStorage.getItem, IStoreKey.AVERAGE_HOUSE_EMISSION);
    const transportEmissions = yield call(AsyncStorage.getItem, IStoreKey.TRANSPORT_EMISSION);
    const averageTransportEmissions = yield call(AsyncStorage.getItem, IStoreKey.AVERAGE_TRANSPORT_EMISSION);
    const foodEmissions = yield call(AsyncStorage.getItem, IStoreKey.FOOD_EMISSION);
    const averageFoodEmissions = yield call(AsyncStorage.getItem, IStoreKey.AVERAGE_FOOD_EMISSION);
    const flyEmissions = yield call(AsyncStorage.getItem, IStoreKey.FLY_EMISSION);
    const averageFlyEmissions = yield call(AsyncStorage.getItem, IStoreKey.AVERAGE_FLY_EMISSION);
    // dispatch action to the store
    yield put(
      applicationInitialized({
        email: emailString ? new Email(emailString) : null,
        initRouteName,
        carbon: {
          house: {
            footprint: houseEmissions ? parseFloat(houseEmissions) : null,
            average: averageHouseEmissions ? parseFloat(averageHouseEmissions) : null,
          },
          transport: {
            footprint: transportEmissions ? parseFloat(transportEmissions) : null,
            average: averageTransportEmissions ? parseFloat(averageTransportEmissions) : null,
          },
          food: {
            footprint: foodEmissions ? parseFloat(foodEmissions) : null,
            average: averageFoodEmissions ? parseFloat(averageFoodEmissions) : null,
          },
          fly: {
            footprint: flyEmissions ? parseFloat(flyEmissions) : null,
            average: averageFlyEmissions ? parseFloat(averageFlyEmissions) : null,
          },
        },
      }),
    );
    yield call(navigate, { route: initRouteName });
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
