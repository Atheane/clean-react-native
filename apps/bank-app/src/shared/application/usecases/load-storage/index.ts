/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictEffect, put, takeLatest, call } from 'redux-saga/effects';

import { Storage } from '../../adapters/services/async-storage';
import { IStorage } from '../../types';
import { loadStorageSuccess, IStorageTypes } from '../../commands';

function* loadStorage() {
  const storage: IStorage = yield call(Storage.getInstance().getStorage);
  yield put(loadStorageSuccess(storage)); // call is a blocking call, as opposed to put
}

function* loadStorageSaga(): Generator<StrictEffect, any, any> {
  yield takeLatest(IStorageTypes.ASK_LOAD_STORAGE, loadStorage);
}

export { loadStorageSaga, loadStorage };
