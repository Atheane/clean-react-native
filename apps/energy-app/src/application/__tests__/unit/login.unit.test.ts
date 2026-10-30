/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthError, Email, Password } from '@clean-rn/auth/domain';
import { KYC_REVIEW } from '@clean-rn/user/domain';

import { UserApi, mapUserServerToUserProperties } from '@clean-rn/user/infrastructure';
import { AuthApi, IAuthServerCode } from '@clean-rn/auth/infrastructure';

import { loginSaga, loginGenerator } from '../../usecases/login';
import { IAuthTypes, loginSuccess, loginFailure, initializeAuth } from '../../commands/login';
import { IStoreKey } from '../../../application/types';
import { showUnknownError } from '../../../application/commands/manage-global-errors';
import { ISharedStackPages } from '../../../presentation/types';
import { navigate } from '../../../presentation/navigation/navigationRef';

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

describe('Login - usecase', () => {
  let httpConnection: HttpConnection;
  let userApi: UserApi;
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
    userApi = UserApi.getInstance(httpConnection);
    authApi = AuthApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const mockData = {
    email: new Email('test@example.com'),
    password: new Password('123123'),
    rememberMe: false,
  };

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401InvalidCredentials = {
    message: 'Core::AuthService::Auth - Incorrect email or password.',
    statusCode: 401,
    codeError: IAuthServerCode.USER_INVALID_CREDENTIAL,
    response: 'Core::AuthService::Auth - Incorrect email or password.',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const mockError401UserNotFound = {
    message: 'Core::AuthService::Auth - User not found',
    statusCode: 401,
    codeError: IAuthServerCode.USER_NOT_FOUND,
    response: 'Core::AuthService::Auth - User not found.',
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

  const mockUserManData = {
    birthday: '1982-11-07T00:00:00.000Z',
    email: 'dev2@example.com',
    firstname: 'John',
    lastname: 'Smith',
    nationality: 'FR',
    phone: '+33600000002',
    specifiedUSPerson: 0,
    title: 'M',
    userId: 3952560,
    kycReview: KYC_REVIEW,
    kycReviewComment: '',
    birthCountry: 'FR',
    address: {
      str: 'aze',
      zip: 'aze',
      city: 'aze',
      country: 'FR',
    },
  };

  it('Should wait for FETCH_LOGIN action and call loginGenerator, should be done on next iteration', () => {
    const genObject = loginSaga(httpConnection);

    expect(genObject.next().value).toEqual(takeEvery(IAuthTypes.FETCH_LOGIN, loginGenerator, httpConnection));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call loginSuccess and save user email if rememberMe is true', async () => {
    const user = mapUserServerToUserProperties(mockUserManData);
    user.setConfig({ lang: 'fr' });

    const updatedMockData = {
      ...mockData,
      rememberMe: true,
    };

    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: updatedMockData,
    })
      .next()
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, mockData.email.value)
      .next()
      .call([authApi, authApi.login], updatedMockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next()
      .call([userApi, userApi.getUser])
      .next(user)
      .put(loginSuccess({ auth: mockResponse }))
      .next()
      .call(navigate, { route: ISharedStackPages.HOME })
      .next();
  });

  it('Should call loginSuccess and remove user email if rememberMe is false', async () => {
    const user = mapUserServerToUserProperties(mockUserManData);
    user.setConfig({ lang: 'fr' });

    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL)
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next()
      .call([userApi, userApi.getUser])
      .next(user)
      .put(loginSuccess({ auth: mockResponse }))
      .next()
      .call(navigate, { route: ISharedStackPages.HOME })
      .next();
  });

  it('Should call loginFailure action if invalid credentials', () => {
    const serverError = new ServerError(mockError401InvalidCredentials);
    serverError.codeError = IAuthServerCode.USER_INVALID_CREDENTIAL;

    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL)
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(serverError)
      .put(loginFailure(new AuthError.LoginFailureInvalidCredentials(serverError.message)))
      .next();
  });

  it('Should call loginFailure action if user not found', () => {
    const serverError = new ServerError(mockError401UserNotFound);
    serverError.codeError = IAuthServerCode.USER_NOT_FOUND;
    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL)
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(serverError)
      .put(loginFailure(new AuthError.LoginFailureUserNotFound(serverError.message)))
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL)
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeAuth())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(loginGenerator, httpConnection, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.removeItem, IStoreKey.USER_EMAIL)
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initializeAuth())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
