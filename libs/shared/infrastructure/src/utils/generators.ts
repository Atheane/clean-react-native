import { call, fork } from 'redux-saga/effects';
import { ServerError } from '../network/errors';

function* hideNotFoundError(fn: any, args: any) {
  try {
    yield call(fn, args);
  } catch (e: unknown) {
    if (e instanceof ServerError && e.code === '404') {
      return;
    }
    throw e;
  }
}

export function* wrapSagaHidingNotFoundError(fn: any, args: any) {
  yield fork(hideNotFoundError, fn, args);
}
