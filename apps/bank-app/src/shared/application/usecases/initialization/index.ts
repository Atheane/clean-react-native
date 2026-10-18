/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { initializeApplicationSuccess, IInitializationTypes } from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';

function* initialization(): Generator<StrictEffect, any, any> {
  // retireve data from async storage
  const emailString = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);

  // dispatch action to the store
  yield put(initializeApplicationSuccess(emailString ? new Email(emailString) : null));
}

function* initializationSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initialization);
}

export { initializationSaga, initialization };
