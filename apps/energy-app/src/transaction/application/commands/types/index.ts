import { IAccount } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';

export enum ITransactionsTypes {
  //commands
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  //domain Events
  TRANSACTIONS_LISTED = 'TRANSACTIONS_LISTED',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
}

//commands
export type IListTransactions = {
  type: typeof ITransactionsTypes.LIST_TRANSACTIONS;
  payload: {
    account: IAccount;
  };
};

export type IInitializeTransactionsList = {
  type: typeof ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST;
};

//domain Events
export type ITransactionsListed = {
  type: typeof ITransactionsTypes.TRANSACTIONS_LISTED;
  payload: ITransaction[];
};

export type ITransactionsActions = IListTransactions | ITransactionsListed | IInitializeTransactionsList;
