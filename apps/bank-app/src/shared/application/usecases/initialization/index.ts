/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';

import { getItemFromStore } from '@clean-rn/shared/infrastructure';

import {
  initializeApplicationSucceded,
  initializeApplicationFailed,
  IInitializationTypes,
} from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';
import { navigate } from '../../../presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../presentation/types';

function* initialization(): Generator<StrictEffect, any, any> {
  try {
    const email = yield call(getItemFromStore, IStoreKey.USER_EMAIL);
    console.log('initialization email', email);

    if (!email) {
      yield put(
        initializeApplicationFailed({
          error: new Error('Email not found'),
        }),
      );
      yield call(navigate, { route: IAuthStackPages.SIGNUP_STEP1 });
    }

    // dispatch action to the store
    yield put(
      initializeApplicationSucceded({
        email,
      }),
    );

    yield call(navigate, { route: IAuthStackPages.LOGIN });
    // yield put(fetchAccountsRequest());
  } catch (error: unknown) {
    Logger.getInstance().error(error);
    Sentry.captureException(error);
    yield put(
      initializeApplicationFailed({
        error,
      }),
    );
  }
}

function* initializationSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IInitializationTypes.INITIALIZE_APPLICATION, initialization);
}

export { initializationSaga, initialization };
