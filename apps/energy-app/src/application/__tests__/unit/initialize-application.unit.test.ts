import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IInitializationTypes, applicationInitialized } from '../../commands/initialize-application';
import {
  initializeApplicationSaga,
  initializeApplicationGenerator,
} from '../../usecases/initialize-application';
import { IStoreKey } from '../../types';
import { showUnknownError } from '../../../application/commands/manage-global-errors';

describe('Initialization - usecase', () => {
  const genObject = initializeApplicationSaga();

  it('Should wait for INITIALIZE_APPLICATION action and call initializationSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initializeApplicationGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call applicationInitialized if email is not null', async () => {
    testSaga(initializeApplicationGenerator)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(new Email('test@example.com').value)
      .put(
        applicationInitialized({
          email: new Email('test@example.com'),
        }),
      )
      .next();
  });

  it('Should call applicationInitialized if email is null', async () => {
    testSaga(initializeApplicationGenerator)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(null)
      .put(
        applicationInitialized({
          email: null,
        }),
      )
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(initializeApplicationGenerator)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .throw(new Error('Unknown error'))
      .put(showUnknownError(new Error('Unknown error')))
      .next();
  });
});
