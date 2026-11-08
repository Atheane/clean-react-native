import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IInitializationTypes, storageLoaded } from '../../commands/initialize-application';
import { loadStorageSaga, loadStorage } from '../../usecases/load-storage';
import { IStoreKey } from '../../types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('Load Storage - usecase', () => {
  const genObject = loadStorageSaga();

  it('Should wait for LOAD_STORAGE action and call initializationSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(IInitializationTypes.LOAD_STORAGE, loadStorage));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call initializationSuccess', async () => {
    testSaga(loadStorage)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(new Email('test@example.com').value)
      .put(
        storageLoaded({
          email: new Email('test@example.com'),
        }),
      )
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(loadStorage)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .throw(new Error('Unknown error'))
      .put(showUnknownError(new Error('Unknown error')))
      .next();
  });
});
