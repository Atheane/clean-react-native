/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import nock from 'nock';
import * as path from 'path';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthError, Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { loginSaga, loginApiSaga } from '../usecases/login';
import { ILoginTypes, loginSuccess, loginFailure } from '../commands/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStoreKey } from '../../../shared/application/types';

describe('Login - usecase', () => {
  const genObject = loginSaga();
  const mockData = {
    email: new Email('test@example.com'),
    password: '123123',
  };

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError400 = {
    message: 'Core::AuthService::Auth - Incorrect email or password.',
    statusCode: 400,
    response: 'Core::AuthService::Auth - Incorrect email or password.',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const httpConnection = HttpConnection.getInstance('https://sandbox.example.com');
  const api = AuthApi.getInstance(httpConnection);

  beforeAll(async () => {
    nock.back.fixtures = path.resolve(`${__dirname}/fixtures`);
    nock.back.setMode('record');
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('Should wait for FETCH_LOGIN action and call loginApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(ILoginTypes.FETCH_LOGIN, loginApiSaga));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call loginSuccess', async () => {
    nock.back('login-response-ok.json', (nockDone) => {
      testSaga(loginApiSaga, {
        type: ILoginTypes.FETCH_LOGIN,
        payload: mockData,
      })
        .next()
        .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
        .next(new Email('test@example.com').value)
        .call([api, api.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
        .next(mockResponse)
        .put(loginSuccess(mockResponse))
        .next()
        .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
        .next();

      nockDone();
    });
  });

  it('Should call loginFailure action if 400', () => {
    nock.back('login-response-400.json', (nockDone) => {
      testSaga(loginApiSaga, {
        type: ILoginTypes.FETCH_LOGIN,
        payload: mockData,
      })
        .next()
        .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
        .next(new Email('test@example.com').value)
        .call([api, api.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
        .throw(new ServerError(mockError400))
        .put(loginFailure(new AuthError.LoginFailureInvalidCredentials(new ServerError(mockError400))))
        .next();

      nockDone();
    });
  });

  it('Should call loginFailure if login with different email that the one stored on the phone', () => {
    testSaga(loginApiSaga, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(new Email('another_email@example.com').value)
      .put(loginFailure(new AuthError.LoginFailureOneEmailByPhone()))
      .next()
      .cancel();
  });
});
