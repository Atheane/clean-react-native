/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { applicationInitialized, IInitializationTypes } from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

export function* initializeApplicationSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initializeApplicationGenerator);
}

export function* initializeApplicationGenerator({
  payload,
}: {
  type: string;
  payload?: boolean;
}): Generator<StrictEffect, any, any> {
  // retireve data from async storage
  const emailString = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
  const initRouteName = emailString ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_EMAIL;
  // dispatch action to the store
  yield put(
    applicationInitialized({
      email: emailString ? new Email(emailString) : null,
      initRouteName,
    }),
  );
  yield call(navigate, { route: initRouteName });
}
