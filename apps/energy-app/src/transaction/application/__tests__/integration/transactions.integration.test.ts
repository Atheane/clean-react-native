/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { IAccountType, Iban, Bic } from '@clean-rn/account/domain';
import { Amount, TransactionCategory, ITransactionType, ITransaction } from '@clean-rn/transaction/domain';
import { ITransactionServer } from '@clean-rn/transaction/infrastructure';

import {
  ITransactionsTypes,
  listTransactions,
  transactionsListed,
  initializeTransactionsList,
} from '../../commands';
import { ITransactionsState, transactionsReducer } from '../../state-management';

import { listTransactionsSaga } from '../../usecases';

describe('Transactions - integration', () => {
  let sagaTester: SagaTester;

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
    amount: new Amount(item.amount.toString(), item.transactionType as ITransactionType),
    label: item.label,
    category: item.mccCode
      ? new TransactionCategory(item.transactionType as ITransactionType, item.mccCode)
      : new TransactionCategory(item.transactionType as ITransactionType),
    date: new Date(item.updatedAt),
    type: item.transactionType as ITransactionType, //todo: maybe delete this, and make use of category only, easier to map, and this is all we need to know in the app
  }));

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
      error: null,
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
      error: null,
    });
  });

  it('Should store correct state if TRANSACTIONS_LISTED', () => {
    sagaTester.start(listTransactionsSaga);
    sagaTester.dispatch(listTransactions({ account }));
    sagaTester.dispatch(transactionsListed(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      transactions: mockResponse,
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_LIST_TRANSACTIONS', () => {
    sagaTester.start(listTransactionsSaga);
    sagaTester.dispatch(initializeTransactionsList());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      transactions: null,
      error: null,
    });
  });
});
