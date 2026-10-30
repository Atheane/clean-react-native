/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { AuthError } from '@clean-rn/auth/domain';

import { logoutSaga, logoutGenerator } from '../../usecases/logout';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthTypes, loggedOut, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('Loggout - usecase', () => {
  let httpConnection: HttpConnection;
  let authApi: AuthApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    authApi = AuthApi.getInstance(httpConnection);
  });

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/logout',
  };

  it('Should wait for FETCH_LOGOUT action and call loginGenerator, should be done on next iteration', () => {
    const genObject = logoutSaga(httpConnection);

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
