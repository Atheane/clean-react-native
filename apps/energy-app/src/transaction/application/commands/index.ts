import { IAccount } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';

import {
  ITransactionsTypes,
  ITransactionsActions,
  IListTransactions,
  IInitializeTransactionsList,
  ITransactionsListed,
} from './types';

// commands
export const listTransactions = (payload: { account: IAccount }): IListTransactions => ({
  type: ITransactionsTypes.LIST_TRANSACTIONS,
  payload,
});

// domainEvents
export const transactionsListed = (payload: ITransaction[]): ITransactionsListed => ({
  type: ITransactionsTypes.TRANSACTIONS_LISTED,
  payload,
});

export const initializeTransactionsList = (): IInitializeTransactionsList => ({
  type: ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST,
});

export { ITransactionsTypes, ITransactionsActions };
