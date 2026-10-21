/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthError, Email, Password, User, Phone, BirthDay, Country, IGender } from '@clean-rn/auth/domain';
import { AuthApi, IUserLoginServerCode, UserApi } from '@clean-rn/auth/infrastructure';

import { loginSaga, loginGenerator } from '../../usecases/login';
import { ILoginTypes, loginSuccess, loginFailure, initializeLogin } from '../../commands/login';
import { initializeSignupStep } from '../../commands/signup';
import { IStoreKey } from '../../../../shared/application/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

describe('Login - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const authApi = AuthApi.getInstance(httpConnection);
  const userApi = UserApi.getInstance(httpConnection);

  const genObject = loginSaga(httpConnection);

  const mockData = {
    email: new Email('test@example.com'),
    password: new Password('123123'),
  };

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401InvalidCredentials = {
    message: 'Core::AuthService::Auth - Incorrect email or password.',
    statusCode: 401,
    codeError: IUserLoginServerCode.USER_INVALID_CREDENTIAL,
    response: 'Core::AuthService::Auth - Incorrect email or password.',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const mockError401UserNotFound = {
    message: 'Core::AuthService::Auth - User not found',
    statusCode: 401,
    codeError: IUserLoginServerCode.USER_NOT_FOUND,
    response: 'Core::AuthService::Auth - User not found.',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const mockError401UserPhoneNotValidated = {
    message: 'Core::AuthService::Auth - User phone not validated',
    statusCode: 401,
    codeError: IUserLoginServerCode.USER_PHONE_NOT_VALIDATED,
    response: 'Core::AuthService::Auth - User phone not validated.',
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
  };

  const mockUserWomanData = {
    birthday: '1984-10-06T00:00:00.000Z',
    email: 'dev1@example.com',
    firstname: 'Jane',
    lastname: 'Doe',
    nationality: 'FR',
    phone: '+33600000002',
    specifiedUSPerson: 0,
    title: 'Mme',
    userId: 3952561,
  };

  const mockUserNeutralData = {
    birthday: '1984-10-06T00:00:00.000Z',
    email: 'dev1@example.com',
    firstname: 'Jane',
    lastname: 'Doe',
    nationality: 'FR',
    phone: '+33600000002',
    specifiedUSPerson: 0,
    title: 'Mlle',
    userId: 3952561,
  };

  it('Should wait for FETCH_LOGIN action and call loginGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ILoginTypes.FETCH_LOGIN, loginGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call loginSuccess if user is a man', async () => {
    let gender = IGender.NEUTRAL;
    if (mockUserManData.title === 'Mme') {
      gender = IGender.WOMAN;
    } else if (mockUserManData.title === 'M') {
      gender = IGender.MAN;
    }

    const user = User.Create({
      id: mockUserManData.userId,
      properties: {
        email: new Email(mockUserManData.email),
        phone: new Phone(mockUserManData.phone),
        identity: {
          gender,
          firstName: mockUserManData.firstname,
          lastName: mockUserManData.lastname,
        },
        birth: {
          birthday: new BirthDay(dayjs(mockUserManData.birthday)),
          nationality: new Country(mockUserManData.nationality),
        },
        USPerson: mockUserManData.specifiedUSPerson === 1,
      },
    });
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next()
      .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
      .next()
      .call([userApi, userApi.getUser])
      .next(mockUserManData)
      .put(loginSuccess({ auth: mockResponse, user }))
      .next();
  });

  it('Should call loginSuccess if user is a woman', async () => {
    let gender = IGender.NEUTRAL;
    if (mockUserWomanData.title === 'Mme') {
      gender = IGender.WOMAN;
    } else if (mockUserWomanData.title === 'M') {
      gender = IGender.MAN;
    }

    const user = User.Create({
      id: mockUserWomanData.userId,
      properties: {
        email: new Email(mockUserWomanData.email),
        phone: new Phone(mockUserWomanData.phone),
        identity: {
          gender,
          firstName: mockUserWomanData.firstname,
          lastName: mockUserWomanData.lastname,
        },
        birth: {
          birthday: new BirthDay(dayjs(mockUserWomanData.birthday)),
          nationality: new Country(mockUserWomanData.nationality),
        },
        USPerson: mockUserWomanData.specifiedUSPerson === 1,
      },
    });
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next()
      .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
      .next()
      .call([userApi, userApi.getUser])
      .next(mockUserWomanData)
      .put(loginSuccess({ auth: mockResponse, user }))
      .next();
  });

  it('Should call loginSuccess if user is neutral', async () => {
    let gender = IGender.NEUTRAL;
    if (mockUserNeutralData.title === 'Mme') {
      gender = IGender.WOMAN;
    } else if (mockUserNeutralData.title === 'M') {
      gender = IGender.MAN;
    }

    const user = User.Create({
      id: mockUserNeutralData.userId,
      properties: {
        email: new Email(mockUserNeutralData.email),
        phone: new Phone(mockUserNeutralData.phone),
        identity: {
          gender,
          firstName: mockUserNeutralData.firstname,
          lastName: mockUserNeutralData.lastname,
        },
        birth: {
          birthday: new BirthDay(dayjs(mockUserNeutralData.birthday)),
          nationality: new Country(mockUserNeutralData.nationality),
        },
        USPerson: mockUserNeutralData.specifiedUSPerson === 1,
      },
    });
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next()
      .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
      .next()
      .call([userApi, userApi.getUser])
      .next(mockUserNeutralData)
      .put(loginSuccess({ auth: mockResponse, user }))
      .next();
  });

  it('Should call loginFailure action if invalid credentials', () => {
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401InvalidCredentials))
      .put(
        loginFailure(
          new AuthError.LoginFailureInvalidCredentials(new ServerError(mockError401InvalidCredentials)),
        ),
      )
      .next();
  });

  it('Should call loginFailure action if user not found', () => {
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401UserNotFound))
      .put(loginFailure(new AuthError.LoginFailureUserNotFound(new ServerError(mockError401UserNotFound))))
      .next();
  });

  it('Should call loginFailure action if user phone not validated', () => {
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401UserPhoneNotValidated))
      .put(initializeSignupStep())
      .next()
      .put(
        loginFailure(
          new AuthError.LoginFailurePhoneNotValidated(new ServerError(mockError401UserPhoneNotValidated)),
        ),
      )
      .next()
      .call(navigate, { route: IAuthStackPages.SIGNUP_PHONE })
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeLogin())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(loginGenerator, httpConnection, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(null)
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, 'test@example.com')
      .next()
      .call([authApi, authApi.login], mockData) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initializeLogin())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
