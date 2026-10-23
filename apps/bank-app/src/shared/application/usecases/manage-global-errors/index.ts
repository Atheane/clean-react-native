/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';
import { ServerError } from '@clean-rn/shared/infrastructure';

import { IGlobalErrorTypes } from '../../commands/manage-global-errors';
import { ISharedStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

export function* showUnknownErrorSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IGlobalErrorTypes.SHOW_UNKNOWN_ERROR, showUnknownErrorGenerator);
}

export function* showUnknownErrorGenerator({
  payload,
}: {
  type: string;
  payload: ServerError | Error;
}): Generator<StrictEffect, any, any> {
  if (payload.message === 'Network request failed') {
    yield cancel();
  } else if (payload instanceof ServerError && payload.statusCode === 401) {
    yield call(Sentry.captureException, payload);
    yield cancel();
  }
  yield call(Sentry.captureException, payload);
  yield call(navigate, { route: ISharedStackPages.MODAL_ERROR, params: { error: payload } });
}
