/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { AuthError } from '@clean-rn/auth/domain';

import { logoutSaga, logoutGenerator } from '../../usecases/logout';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthTypes, loggedOut, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

describe('Loggout - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = logoutSaga(httpConnection);

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/logout',
  };

  it('Should wait for FETCH_LOGOUT action and call loginGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IAuthTypes.FETCH_LOGOUT, logoutGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call loggedOut if api return success true', async () => {
    testSaga(logoutGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([authApi, authApi.logout]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next({
        success: true,
      })
      .put(loggedOut())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next();
  });

  it('Should throw LogoutFailure if api return success false', async () => {
    testSaga(logoutGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([authApi, authApi.logout]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next({
        success: false,
      })
      .put(resetError())
      .next()
      .put(showUnknownError(new AuthError.LogoutFailure()))
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(logoutGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([authApi, authApi.logout]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(logoutGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([authApi, authApi.logout]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
