/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { refreshSaga, refreshGenerator } from '../../usecases/refresh';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ISharedStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { IAuthTypes, refreshSuccess, resetError } from '../../commands';

describe('Refresh - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = refreshSaga(httpConnection);

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
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
      takeEvery(IAuthTypes.FETCH_REFRESH, refreshGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call refreshSuccess if no nextRoute payload', async () => {
    testSaga(refreshGenerator, httpConnection, {
      type: IAuthTypes.FETCH_REFRESH,
    })
      .next()
      .select(selectAuth)
      .next(mockResponse)
      .call([authApi, authApi.refresh], mockResponse.refreshToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(refreshSuccess({ auth: mockResponse }))
      .next();
  });

  it('Should call refreshSuccess if nextRoute payload', async () => {
    testSaga(refreshGenerator, httpConnection, {
      type: IAuthTypes.FETCH_REFRESH,
      payload: {
        nextRoute: ISharedStackPages.HOME,
      },
    })
      .next()
      .select(selectAuth)
      .next(mockResponse)
      .call([authApi, authApi.refresh], mockResponse.refreshToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(refreshSuccess({ auth: mockResponse }))
      .next()
      .call(navigate, { route: ISharedStackPages.HOME, params: undefined })
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(refreshGenerator, httpConnection, {
      type: IAuthTypes.FETCH_REFRESH,
    })
      .next()
      .select(selectAuth)
      .next(mockResponse)
      .call([authApi, authApi.refresh], mockResponse.refreshToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(refreshGenerator, httpConnection, {
      type: IAuthTypes.FETCH_REFRESH,
    })
      .next()
      .select(selectAuth)
      .next(mockResponse)
      .call([authApi, authApi.refresh], mockResponse.refreshToken) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
