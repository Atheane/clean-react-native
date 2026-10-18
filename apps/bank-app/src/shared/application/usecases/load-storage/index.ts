/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IInitializationTypes, storageLoaded } from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';

export function* loadStorageSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.LOAD_STORAGE, loadStorage);
}

export function* loadStorage(): Generator<StrictEffect, any, any> {
  // retireve data from async storage
  const emailString = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
  // dispatch action to the store
  yield put(storageLoaded({ email: emailString ? new Email(emailString) : null }));
}
