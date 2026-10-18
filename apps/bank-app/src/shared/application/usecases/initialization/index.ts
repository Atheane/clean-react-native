/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { initializeApplicationSuccess, IInitializationTypes } from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

function* initialization(): Generator<StrictEffect, any, any> {
  // retireve data from async storage
  const emailString = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
  const initRouteName = emailString ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_EMAIL;
  console.log('initialization', initRouteName);
  // dispatch action to the store
  yield put(
    initializeApplicationSuccess({ email: emailString ? new Email(emailString) : undefined, initRouteName }),
  );
  yield call(navigate, { route: initRouteName });
}

function* initializationSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initialization);
}

export { initializationSaga, initialization };
