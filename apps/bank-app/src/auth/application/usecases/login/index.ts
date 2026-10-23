/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthError, ILoginCommand } from '@clean-rn/auth/domain';
import { CardError } from '@clean-rn/card/domain';

import { AuthApi, IAuthServerCode } from '@clean-rn/auth/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';

import { IStoreKey } from '../../../../shared/application/types';
import { goBack, navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { ISharedStackPages, IUserStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { checkCustomerStatus } from '../../../../kyc/application/commands/customer';

import { loginFailure, IAuthTypes, initializeAuth, loginSuccess, resetError } from '../../commands';
import { initializeUser, userSaved } from '../../../../user/application/commands';
import { cardForbidden, cardGetSuccess, cardNotFound } from '../../../../card/application/commands';

export function* loginSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.FETCH_LOGIN, loginGenerator, httpConnection);
}

export function* loginGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ILoginCommand & { locale: string };
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

    const userApi = UserApi.getInstance(httpConnection);
    let user = yield call([userApi, userApi.getUser]);

    try {
      const cardApi = CardApi.getInstance(httpConnection);
      const card = yield call([cardApi, cardApi.getCard]);

      yield put(cardGetSuccess(card));
    } catch (error: unknown) {
      if (error instanceof ServerError && error.statusCode === 403) {
        yield put(cardForbidden(new CardError.Forbidden(error)));
      }
      if (error instanceof CardError.NotFound) {
        yield put(cardNotFound(error));
      }
      console.log(error);
    }

    if (user.properties.config && user.properties.config.lang !== payload.locale) {
      user = yield call([userApi, userApi.updateConfig], {
        lang: payload.locale,
      });
    }

    yield put(loginSuccess({ auth }));
    yield put(userSaved(user));
    yield put(checkCustomerStatus({ user }));

    yield call(navigate, { route: ISharedStackPages.HOME });
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof ServerError) {
      switch (error.codeError) {
        case IAuthServerCode.USER_INVALID_CREDENTIAL:
          yield put(loginFailure(new AuthError.LoginFailureInvalidCredentials(error)));
          yield cancel();
        case IAuthServerCode.USER_NOT_FOUND:
          yield put(loginFailure(new AuthError.LoginFailureUserNotFound(error)));
          yield cancel();
        case IAuthServerCode.USER_PHONE_NOT_VALIDATED:
          // need to reinit userReducer if user comes from signup flow (because not store data)
          yield put(initializeUser());
          yield put(loginFailure(new AuthError.LoginFailurePhoneNotValidated(error)));
          yield call(navigate, {
            route: IUserStackPages.SIGNUP_PHONE,
          });
          yield cancel();
      }
    }

    yield put(initializeAuth());
    yield put(showUnknownError(error as Error));
  }
}

export function* closeLoginModalSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IAuthTypes.LOGIN_SUCCEDED, closeLoginModalGenerator);
}

export function* closeLoginModalGenerator(): Generator<StrictEffect, any, any> {
  yield put(resetError());
  yield call(goBack);
}
