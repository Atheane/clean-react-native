/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthError, Email, Password } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { loginSaga, loginApiSaga } from '../../usecases/login';
import { ILoginTypes, loginSuccess, loginFailure, initializeLogin } from '../../commands/login';
import { IStoreKey } from '../../../../shared/application/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('Login - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);
  const genObject = loginSaga(httpConnection);

  const mockData = {
    email: new Email('test@example.com'),
    password: new Password('123123'),
  };

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401 = {
    message: 'Core::AuthService::Auth - Incorrect email or password.',
    statusCode: 401,
    response: 'Core::AuthService::Auth - Incorrect email or password.',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('Should wait for FETCH_LOGIN action and call loginApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(ILoginTypes.FETCH_LOGIN, loginApiSaga, httpConnection));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call loginSuccess', async () => {
    testSaga(loginApiSaga, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call([api, api.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(loginSuccess(mockResponse))
      .next()
      .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
      .next();
  });

  it('Should call loginFailure action if 401', () => {
    testSaga(loginApiSaga, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call([api, api.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .put(loginFailure(new AuthError.LoginFailureInvalidCredentials(new ServerError(mockError401))))
      .next();
  });

  it('Should call showUnknownError action if 500', () => {
    testSaga(loginApiSaga, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call([api, api.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeLogin())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
