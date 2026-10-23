/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import {
  Amount,
  ITransactionType,
  ITransaction,
  TransactionError,
  ITransferCommand,
} from '@clean-rn/transaction/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

import { transferGenerator, transferSaga } from '../../usecases';
import { ITransactionsTypes, transferSucceded, initTransaction, transactionFailed } from '../../commands';

describe('Transfer - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = TransactionApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const genObject = transferSaga(httpConnection);

  const mockResponse: ITransaction = {
    amount: new Amount('10.00', ITransactionType.TRANSFER_OUT),
    label: 'Payin Generated from UTs on User Test',
    id: 1686814688829,
    type: ITransactionType.TRANSFER_OUT,
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
    path: '/app/transaction/transfer',
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
    path: '/app/transaction/transfer',
    method: 'POST',
  };

  const mockError500 = {
    message: 'Core::TransactionService::Transfer - Server Error',
    statusCode: 500,
    response: 'Core::TransactionService::Transfer - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/transaction/transfer',
  };

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const payload: ITransferCommand = {
    accountId: 4004318954,
    beneficiaryAccountId: 5004318954,
    amount: new Amount('10.00', ITransactionType.TRANSFER_OUT),
    label: 'Payin Generated from UTs on User Test',
  };

  it('Should wait for FETCH_TRANSFER action and call transferGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ITransactionsTypes.FETCH_TRANSFER, transferGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call transferWaitingSent if no cached data', async () => {
    testSaga(transferGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSFER,
      payload,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.transfer], payload) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(transferSucceded(mockResponse))
      .next()
      .call(navigate, {
        route: IBeneficiaryStackPages.MENU,
        params: { screen: IBeneficiaryStackPages.TRANSFER_SUCCESS },
      })
      .next();
  });

  it('Should call navigate to Login modale action if 401 from Server', () => {
    testSaga(transferGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSFER,
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
    testSaga(transferGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSFER,
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
    testSaga(transferGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSFER,
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
    testSaga(transferGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSFER,
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
