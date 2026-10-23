/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ISearchPhoneQuery, UserError, ISendPhoneValidationCommand } from '@clean-rn/user/domain';
import { ContactError } from '@clean-rn/contact/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi, IUserSearchServerCode } from '@clean-rn/user/infrastructure';

import { IUserStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { IUserTypes, signupFailed, phoneCodeSent, resetError } from '../../commands';

export function* checkPhoneSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_SEARCH_PHONE, checkPhoneGenerator, httpConnection);
}

export function* checkPhoneGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ISearchPhoneQuery;
  },
): Generator<StrictEffect, any, any> {
  try {
    const api = UserApi.getInstance(httpConnection);
    // api call
    const response: number = yield call([api, api.searchPhone], payload);

    if (response === IUserSearchServerCode.PHONE_EXISTS) {
      yield put(signupFailed(new UserError.SignupFailurePhoneExists()));
      yield cancel();
    }

    yield call([api, api.sendPhoneValidation], payload as ISendPhoneValidationCommand);
    // domain event
    yield put(phoneCodeSent());
    // navigation
    yield call(navigate, { route: IUserStackPages.SIGNUP_VALIDATE_PHONE });
  } catch (e: unknown) {
    yield put(resetError());
    if (e instanceof ServerError && e.statusCode === 400) {
      yield put(signupFailed(new ContactError.InvalidPhone(e.message)));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(e as Error));
  }
}
