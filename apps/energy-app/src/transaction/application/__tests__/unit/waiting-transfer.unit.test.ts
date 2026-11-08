/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import {
  Amount,
  ITransactionType,
  ITransaction,
  TransactionError,
  ITransactionWaitingCommand,
} from '@clean-rn/transaction/domain';
import { Phone } from '@clean-rn/contact/domain';
import { BeneficiaryError } from '@clean-rn/beneficiary/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { transactionWaitingGenerator, transactionWaitingSaga } from '../../usecases';
import {
  ITransactionsTypes,
  initTransaction,
  transactionFailed,
  transactionWaitingSucceded,
} from '../../commands';
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

describe('TransactionWaiting - usecase', () => {
  let httpConnection: HttpConnection;
  let api: TransactionApi;

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
    api = TransactionApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const mockResponse: ITransaction = {
    amount: new Amount('10.00', ITransactionType.PAYOUT),
    label: 'Payin Generated from UTs on User Test',
    id: 1686814688829,
    type: ITransactionType.PAYOUT,
    date: new Date('2023-06-15T07:38:09.217Z'),
  };

  const mockError400 = {
    statusCode: 400,
    message: 'Wallet id must differ from user wallet id',
    response: {
      statusCode: 400,
      message: 'Wallet id must differ from user wallet id',
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

  const payload: ITransactionWaitingCommand = {
    accountId: 4004318954,
    phone: new Phone('+33612345678'),
    amount: new Amount('10.00', ITransactionType.TRANSFER_OUT),
    label: 'Payin Generated from UTs on User Test',
  };

  it('Should wait for FETCH_TRANSACTION_WAITING action and call transactionWaitingGenerator, should be done on next iteration', () => {
    const genObject = transactionWaitingSaga(httpConnection);

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
      .call(ensureTokenRefreshed, httpConnection)
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

  it('Should call transferFailed if 400 from Server', () => {
    const serverError = new ServerError(mockError400);
    serverError.statusCode = 400;

    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(serverError)
      .put(initTransaction())
      .next()
      .put(transactionFailed(new BeneficiaryError.BeneficiaryMustDifferFromAccount(serverError.message)))
      .next()
      .cancel();
  });

  it('Should call transferFailed if 403 from Server', () => {
    const serverError = new ServerError(mockError403);
    serverError.statusCode = 403;

    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(serverError)
      .put(initTransaction())
      .next()
      .put(transactionFailed(new TransactionError.TransferAmountTooHigh(serverError)))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(transactionWaitingGenerator, httpConnection, {
      type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
      payload,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
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
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initTransaction())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
