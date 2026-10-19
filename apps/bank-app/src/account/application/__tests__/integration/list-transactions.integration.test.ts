/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import {
  IAccountType,
  Iban,
  Bic,
  Amount,
  TransactionCategory,
  ITransactionType,
  ITransaction,
} from '@clean-rn/account/domain';
import { ITransactionServer } from '@clean-rn/account/infrastructure';

import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  ITransactionsTypes,
  listTransactions,
  transactionsListed,
  initializeTransactionsList,
} from '../../commands/transactions';
import { ITransactionsState, transactionsReducer } from '../../state-management';

import { listTransactionsSaga } from '../../usecases/transactions';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('ListTransactions - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

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

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  const account = {
    accountId: 4004318954,
    accountType: IAccountType.MAIN,
    authorizedBalance: 0,
    iban: new Iban('FR7616798000010000242599449'),
    bic: new Bic('TRZOFR21XXX'),
  };

  beforeEach(() => {
    const initialState: ITransactionsState = {
      pending: false,
      transactions: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: transactionsReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = transactionsReducer(undefined, {
      type: ITransactionsTypes.LIST_TRANSACTIONS,
      payload: {
        account,
      },
    });

    expect(newState).toEqual({
      pending: true,
      transactions: null,
    });
  });

  it('Should store correct state if TRANSACTIONS_LISTED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listTransactionsSaga, httpConnection);
    sagaTester.dispatch(listTransactions({ account }));
    sagaTester.dispatch(transactionsListed(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      transactions: mockResponse,
    });
  });

  it('Should store correct state if INITIALIZE_LIST_TRANSACTIONS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listTransactionsSaga, httpConnection);
    sagaTester.dispatch(initializeTransactionsList());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      transactions: null,
    });
  });
});
