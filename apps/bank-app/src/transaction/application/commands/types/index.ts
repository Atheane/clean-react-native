import { IAccount } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';

export enum ITransactionsTypes {
  //commands
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  FETCH_TRANSFER = 'FETCH_TRANSFER',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
  //domain Events
  TRANSACTIONS_LISTED = 'TRANSACTIONS_LISTED',
  TRANSFER_SENT = 'TRANSFER_SENT',
  TRANSFER_FAILED = 'TRANSFER_FAILED',
}

//commands
export type IListTransactions = {
  type: typeof ITransactionsTypes.LIST_TRANSACTIONS;
  payload: {
    account: IAccount;
  };
};

export type IFetchTransfer = {
  type: typeof ITransactionsTypes.FETCH_TRANSFER;
  payload: {
    accountId: number;
    beneficiaryId: number;
    amount: number;
    label: string;
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

export type ITransferSent = {
  type: typeof ITransactionsTypes.TRANSFER_SENT;
  payload: ITransaction;
};

export type ITransferFailed = {
  type: typeof ITransactionsTypes.TRANSFER_FAILED;
  payload: ITransaction;
};

export type ITransactionsActions = IListTransactions | ITransactionsListed | IInitializeTransactionsList;
