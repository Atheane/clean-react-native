import { ITransaction } from '@clean-rn/account/domain';
import {
  ITransactionsTypes,
  ITransactionsActions,
  IListTransactions,
  ITransactionsListed,
  IInitializeTransactionsList,
} from './types';

// commands
export const listTransactions = (payload: { accountId: number }): IListTransactions => ({
  type: ITransactionsTypes.LIST_TRANSACTIONS,
  payload,
});

export const initializeTransactionsList = (): IInitializeTransactionsList => ({
  type: ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST,
});

// domainEvents
export const transactionsListed = (payload: ITransaction[]): ITransactionsListed => ({
  type: ITransactionsTypes.TRANSACTIONS_LISTED,
  payload,
});

export { ITransactionsTypes, ITransactionsActions };
