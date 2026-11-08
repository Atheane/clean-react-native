/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IAccountType, Iban, Bic } from '@clean-rn/account/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ISharedStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { listAccountsGenerator, listAccountsSaga } from '../../usecases';
import { IAccountsTypes, accountsListed, resetPending } from '../../commands/accounts';
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

describe('ListAccounts - usecase', () => {
  let httpConnection: HttpConnection;
  let api: AccountApi;

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
    api = AccountApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockResponse = [
    {
      accountId: 4004318954,
      accountType: IAccountType.MAIN,
      authorizedBalance: 0,
      iban: new Iban('FR7616798000010000242599449'),
      bic: new Bic('TRZOFR21XXX'),
    },
  ];

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/account',
  };

  it('Should wait for LIST_ACCOUNTS action and call listAccountsGenerator, should be done on next iteration', () => {
    const genObject = listAccountsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call accountsListed if no cached data', async () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(accountsListed(mockResponse))
      .next()
      .call(navigate, { route: ISharedStackPages.HOME })
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetPending())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(listAccountsGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getAccounts]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetPending())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
