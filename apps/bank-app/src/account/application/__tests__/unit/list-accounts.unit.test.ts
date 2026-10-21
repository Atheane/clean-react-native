/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IAccountType, Iban, Bic } from '@clean-rn/account/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IStoreKey } from '../../../../shared/application/types';

import { selectAccounts } from '../../state-management/selectors';
import { listAccountsGenerator, listAccountsSaga } from '../../usecases/account';
import { IAccountsTypes, accountsListed, initializeAccountsList } from '../../commands/accounts';

describe('ListAccounts - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = AccountApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = listAccountsSaga(httpConnection);

  const mockResponse = [
    {
      accountId: 4004318954,
      accountType: IAccountType.MAIN,
      authorizedBalance: 0,
      iban: new Iban('FR7616798000010000242599449'),
      bic: new Bic('TRZOFR21XXX'),
    },
  ];

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

  it('Should wait for LIST_ACCOUNTS action and call listAccountsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call accountsListed if no cached data', async () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .select(selectAccounts)
      .next({ accounts: null })
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token')
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(accountsListed(mockResponse))
      .next()
      .call(navigate, { route: IHomeStackPages.ACCOUNTS })
      .next();
  });

  it('Should call accountsListed if accounts cached', async () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .select(selectAccounts)
      .next({ accounts: mockResponse })
      .put(accountsListed(mockResponse))
      .next()
      .call(navigate, { route: IHomeStackPages.ACCOUNTS })
      .next();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .select(selectAccounts)
      .next({ accounts: null })
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token')
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .select(selectAccounts)
      .next({ accounts: null })
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token')
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeAccountsList())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .select(selectAccounts)
      .next({ accounts: null })
      .call(AsyncStorage.getItem, IStoreKey.JWT_REFRESH_TOKEN)
      .next('fake-refresh-token')
      .call([authApi, authApi.refresh], 'fake-refresh-token')
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initializeAccountsList())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
