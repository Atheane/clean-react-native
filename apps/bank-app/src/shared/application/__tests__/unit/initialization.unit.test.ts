import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IInitializationTypes, initializeApplicationSuccess } from '../../commands/initialization';
import { initializationSaga, initialization } from '../../usecases/initialization';
import { IStoreKey } from '../../types';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

describe('Initialization - usecase', () => {
  const genObject = initializationSaga();

  it('Should wait for INITIALIZE_APPLICATION action and call initializationSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initialization),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call initializationSuccess', async () => {
    testSaga(initialization)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(new Email('test@example.com').value)
      .put(
        initializeApplicationSuccess({
          email: new Email('test@example.com'),
          initRouteName: IAuthStackPages.LOGIN,
        }),
      )
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next();
  });
});
