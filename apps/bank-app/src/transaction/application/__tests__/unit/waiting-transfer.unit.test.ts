/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import {
  Amount,
  ITransactionType,
  ITransaction,
  TransactionError,
  ITransactionWaitingCommand,
} from '@clean-rn/transaction/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

import { transactionWaitingGenerator, transactionWaitingSaga, transferGenerator } from '../../usecases';
import {
  ITransactionsTypes,
  initTransaction,
  transactionFailed,
  transactionWaitingSucceded,
} from '../../commands';
import { Phone } from '@clean-rn/contact/domain';

describe('TransactionWaiting - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = TransactionApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = transactionWaitingSaga(httpConnection);

  const mockResponse: ITransaction = {
    amount: new Amount('10.00', ITransactionType.PAYOUT),
    label: 'Payin Generated from UTs on User Test',
    id: 1686814688829,
    type: ITransactionType.PAYOUT,
    date: new Date('2023-06-15T07:38:09.217Z'),
  };

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthenticated',
    response: {
      statusCode: 401,
      message: 'Unauthenticated',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/transaction/waitingTransaction',
    method: 'POST',
  };

  const mockError403 = {
    statusCode: 403,
    message: 'Unauthorized',
    response: {
      statusCode: 403,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/transaction/waitingTransaction',
    method: 'POST',
  };

  const mockError500 = {
    message: 'Core::TransactionService::WaitingTransaction - Server Error',
    statusCode: 500,
    response: 'Core::TransactionService::WaitingTransaction - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/transaction/waitingTransaction',
  };

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const payload: ITransactionWaitingCommand = {
    accountId: 4004318954,
    phone: new Phone('+33612345678'),
    amount: new Amount('10.00', ITransactionType.TRANSFER_OUT),
    label: 'Payin Generated from UTs on User Test',
  };

  it('Should wait for FETCH_TRANSACTION_WAITING action and call transactionWaitingGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ITransactionsTypes.FETCH_TRANSACTION_WAITING, transactionWaitingGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call transactionWaitingSucceded if no cached data', async () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.sendTransactionWaiting], payload) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(transactionWaitingSucceded(mockResponse))
      .next()
      .call(navigate, {
        route: IBeneficiaryStackPages.MENU,
        params: { screen: IBeneficiaryStackPages.TRANSFER_SUCCESS },
      })
      .next();
  });

  it('Should call navigate to Login modale action if 401 from Server', () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call transferFailed if 403 from Server', () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError403))
      .put(transactionFailed(new TransactionError.TransferAmountTooHigh(mockError403)))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError500))
      .put(initTransaction())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new Error('unknown error'))
      .put(initTransaction())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
