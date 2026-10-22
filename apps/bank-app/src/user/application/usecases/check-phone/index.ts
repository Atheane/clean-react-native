/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { ISearchPhoneQuery, UserError, ISendPhoneValidationCommand } from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi, IUserSearchServerCode } from '@clean-rn/user/infrastructure';

import { IUserStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectUser } from '../../state-management/selectors';
import { IUserTypes, signupFailed, phoneNotFound, initializeUser, phoneCodeSent } from '../../commands';

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
    const user = yield select(selectUser);
    if (!user && response === IUserSearchServerCode.NOT_FOUND) {
      // user comes from login -> check phone flow as in migration flow (phone number must exists)
      yield put(phoneNotFound(new UserError.ValidatePhoneFailurePhoneNotFound()));
      yield cancel();
    }

    if (user && response === IUserSearchServerCode.PHONE_EXISTS) {
      // user comes from signup -> check phone flow (phone number must be new)
      yield put(signupFailed(new UserError.SignupFailurePhoneExists()));
      yield cancel();
    }

    yield call([api, api.sendPhoneValidation], payload as ISendPhoneValidationCommand);
    // domain event
    yield put(phoneCodeSent());
    // navigation
    yield call(navigate, { route: IUserStackPages.SIGNUP_VALIDATE_PHONE });
  } catch (e: unknown) {
    if (e instanceof ServerError && e.statusCode === 400) {
      yield put(signupFailed(new UserError.InvalidPhone(e.message)));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeUser());
    yield put(showUnknownError(e as Error));
  }
}
