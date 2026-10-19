/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IGlobalErrorTypes } from '../../commands/manage-global-errors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ServerError } from '@clean-rn/shared/infrastructure';

export function* showUnknownErrorSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IGlobalErrorTypes.SHOW_UNKNOWN_ERROR, showUnknownErrorGenerator);
}

export function* showUnknownErrorGenerator({
  payload,
}: {
  type: string;
  payload: ServerError | Error;
}): Generator<StrictEffect, any, any> {
  // dispatch action to the store
  yield call(navigate, { route: IAuthStackPages.MODAL_ERROR });
}
