/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { IAccountType, Iban, Bic } from '@clean-rn/account/domain';
import { Amount, TransactionCategory, ITransactionType, ITransaction } from '@clean-rn/transaction/domain';
import { ITransactionServer } from '@clean-rn/transaction/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, ITransactionStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

import { accountSelected } from '../../../../account/application/commands/accounts';

import { selectTransactions } from '../../selectors';
import { listTransactionsGenerator, listTransactionsSaga } from '../../usecases';
import { ITransactionsTypes, transactionsListed, initializeTransactionsList } from '../../commands';

describe('ListTransactions - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = TransactionApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = listTransactionsSaga(httpConnection);

  const mockResponse: ITransaction[] = [
    {
      amount: 0.25,
      updatedAt: '2023-06-15T07:38:09.217Z',
      label: 'Payin Generated from UTs on User Test',
      transactionId: 1686814688829,
      transactionType: ITransactionType.PAYIN,
    },
    {
      amount: 244.99,
      updatedAt: '2023-05-23T06:47:10.000Z',
      label: 'GASCOVERT AUC',
      mccCode: 5992,
      transactionId: 1686814773049,
      transactionType: ITransactionType.CARD_TRANSACTION,
    },
  ].map((item: ITransactionServer) => ({
    id: item.transactionId,
    amount: new Amount(item.amount, item.transactionType as ITransactionType),
    label: item.label,
    category: item.mccCode
      ? new TransactionCategory(item.transactionType as ITransactionType, item.mccCode)
      : new TransactionCategory(item.transactionType as ITransactionType),
    date: new Date(item.updatedAt),
    type: item.transactionType as ITransactionType, //todo: maybe delete this, and make use of category only, easier to map, and this is all we need to know in the app
  }));

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

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const account = {
    accountId: 4004318954,
    accountType: IAccountType.MAIN,
    authorizedBalance: 0,
    iban: new Iban('FR7616798000010000242599449'),
    bic: new Bic('TRZOFR21XXX'),
  };

  it('Should wait for LIST_TRANSACTIONS action and call listTransactionsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ITransactionsTypes.LIST_TRANSACTIONS, listTransactionsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call transactionsListed if no cached data', async () => {
    testSaga(listTransactionsGenerator, httpConnection, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: { account },
    })
      .next()
      .select(selectTransactions)
      .next({ transactions: null })
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.getTransactions], account.accountId) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(transactionsListed(mockResponse))
      .next()
      .put(accountSelected(account))
      .next()
      .call(navigate, { route: ITransactionStackPages.MENU })
      .next();
  });

  it('Should call transactionsListed if accounts cached', async () => {
    testSaga(listTransactionsGenerator, httpConnection, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: { account },
    })
      .next()
      .select(selectTransactions)
      .next({ transactions: mockResponse })
      .put(transactionsListed(mockResponse))
      .next()
      .put(accountSelected(account))
      .next()
      .call(navigate, { route: ITransactionStackPages.MENU })
      .next();
  });

  it('Should call navigate to Login modale action if 401 from Server', () => {
    testSaga(listTransactionsGenerator, httpConnection, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: { account },
    })
      .next()
      .select(selectTransactions)
      .next({ transactions: null })
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.getTransactions], account.accountId) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(listTransactionsGenerator, httpConnection, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: { account },
    })
      .next()
      .select(selectTransactions)
      .next({ transactions: null })
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.getTransactions], account.accountId)
      .throw(new ServerError(mockError500))
      .put(initializeTransactionsList())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(listTransactionsGenerator, httpConnection, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: { account },
    })
      .next()
      .select(selectTransactions)
      .next({ transactions: mockResponse })
      .put(transactionsListed(mockResponse))
      .throw(new Error('unknown error'))
      .put(initializeTransactionsList())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
