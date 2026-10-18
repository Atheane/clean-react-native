/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';

import { getItemFromStore } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';

import {
  initializeApplicationSucceded,
  initializeApplicationFailed,
  IInitializationTypes,
} from '../../commands/initialization';
import { IStoreKey } from '../../../../shared/application/types';

function* initialization(): Generator<StrictEffect, any, any> {
  try {
    const emailString = yield call(getItemFromStore, IStoreKey.USER_EMAIL);

    // dispatch action to the store
    yield put(
      initializeApplicationSucceded({
        email: new Email(emailString),
      }),
    );
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
