/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Email } from '@clean-rn/auth/domain';

import { IStoreKey } from '../../../../shared/application/types';
import { IAuthStackPages } from '../../../../shared/presentation/types';
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
    const initRouteName = emailString ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_EMAIL;
    // dispatch action to the store
    yield put(
      applicationInitialized({
        email: emailString ? new Email(emailString) : null,
        initRouteName,
      }),
    );
    yield call(navigate, { route: initRouteName });
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
