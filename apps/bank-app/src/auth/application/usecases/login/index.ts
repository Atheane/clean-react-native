/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError, ILoginCommand } from '@clean-rn/auth/domain';
import { AuthApi, IUserLoginServerCode, UserApi } from '@clean-rn/auth/infrastructure';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { IStoreKey } from '../../../../shared/application/types';
import { goBack, navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { checkCustomerStatus } from '../../../../kyc/application/commands/customer';

import { loginFailure, ILoginTypes, initializeLogin, loginSuccess, resetError } from '../../commands/login';
import { initializeSignupStep } from '../../commands/signup';

export function* loginSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.FETCH_LOGIN, loginGenerator, httpConnection);
}

export function* loginGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ILoginCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const email = yield call(AsyncStorage.getItem, IStoreKey.USER_EMAIL);
    if (!email) {
      // persist user email if absent from storage (first login after signup)
      yield call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, payload.email.value);
    }

    // api call
    const authApi = AuthApi.getInstance(httpConnection);
    const auth = yield call([authApi, authApi.login], payload);
    //attachBearerToken to httpConnection
    yield call(httpConnection.attachBearerToken, auth.accessToken);

    // store token and email in async storage
    yield call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, auth.accessToken);
    yield call(AsyncStorage.setItem, IStoreKey.JWT_REFRESH_TOKEN, auth.refreshToken);

    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.getUser]);

    yield put(loginSuccess({ auth, user }));
    yield put(checkCustomerStatus());
    yield call(navigate, { route: IHomeStackPages.HOME });
  } catch (error: unknown) {
    if (error instanceof ServerError) {
      switch (error.codeError) {
        case IUserLoginServerCode.USER_INVALID_CREDENTIAL:
          yield put(loginFailure(new AuthError.LoginFailureInvalidCredentials(error)));
          yield cancel();
        case IUserLoginServerCode.USER_NOT_FOUND:
          yield put(loginFailure(new AuthError.LoginFailureUserNotFound(error)));
          yield cancel();
        case IUserLoginServerCode.USER_PHONE_NOT_VALIDATED:
          // need to reinit signupReducer if user comes from signup flow (because not store data)
          yield put(initializeSignupStep());
          yield put(loginFailure(new AuthError.LoginFailurePhoneNotValidated(error)));
          yield call(navigate, { route: IAuthStackPages.SIGNUP_PHONE });
          yield cancel();
      }
    }
    yield put(initializeLogin());
    yield put(showUnknownError(error as Error));
  }
}

export function* closeLoginModalSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ILoginTypes.LOGIN_SUCCEDED, closeLoginModalGenerator);
}

export function* closeLoginModalGenerator(): Generator<StrictEffect, any, any> {
  yield put(resetError());
  yield call(goBack);
}
