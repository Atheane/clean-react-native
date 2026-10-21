/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { refreshSaga, refreshGenerator } from '../../usecases/refresh';

import { ILoginTypes, refreshSuccess, resetError } from '../../commands/login';
import { IStoreKey } from '../../../../shared/application/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

describe('Refresh - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = refreshSaga(httpConnection);

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/account',
    method: 'GET',
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/account',
  };

  it('Should wait for FETCH_REFRESH action and call loginGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ILoginTypes.FETCH_REFRESH, refreshGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call refreshSuccess if user is a man', async () => {
    testSaga(refreshGenerator, httpConnection)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token') // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .call(httpConnection.attachBearerToken, mockResponse.accessToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next('fake-access-token')
      .call(AsyncStorage.setItem, IStoreKey.JWT_ACCESS_TOKEN, mockResponse.accessToken)
      .next()
      .call(AsyncStorage.setItem, IStoreKey.JWT_REFRESH_TOKEN, mockResponse.refreshToken)
      .next()
      .put(refreshSuccess({ auth: mockResponse }))
      .next();
  });

  it('Should call showUnknownError action if 401 from Server', () => {
    testSaga(refreshGenerator, httpConnection)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token') // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .put(resetError())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(refreshGenerator, httpConnection)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token') // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(refreshGenerator, httpConnection)
      .next()
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token') // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
