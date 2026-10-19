import { IAccount, ITransaction } from '@clean-rn/account/domain';

export enum ITransactionsTypes {
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  TRANSACTIONS_LISTED = 'TRANSACTIONS_LISTED',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
}

export type IListTransactions = {
  type: typeof ITransactionsTypes.LIST_TRANSACTIONS;
  payload: {
    account: IAccount;
  };
};

export type ITransactionsListed = {
  type: typeof ITransactionsTypes.TRANSACTIONS_LISTED;
  payload: ITransaction[];
};

export type IInitializeTransactionsList = {
  type: typeof ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST;
};

export type ITransactionsActions = IListTransactions | ITransactionsListed | IInitializeTransactionsList;
