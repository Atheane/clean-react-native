import { IAccount } from '@clean-rn/account/domain';
import { IDomainError } from '@clean-rn/ddd';
import {
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
  ITransferCommand,
  ITransactionWaitingCommand,
  IPayoutCommand,
} from '@clean-rn/transaction/domain';

export enum ITransactionsTypes {
  //commands
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  FETCH_PAYOUT = 'FETCH_PAYOUT',
  FETCH_TRANSFER = 'FETCH_TRANSFER',
  FETCH_TRANSACTION_WAITING = 'FETCH_TRANSACTION_WAITING',
  //domain Events
  TRANSACTIONS_LISTED = 'TRANSACTIONS_LISTED',
  PAYOUT_SUCCEDED = 'PAYOUT_SUCCEDED',
  TRANSFER_SUCCEDED = 'TRANSFER_SUCCEDED',
  TRANSACTION_WAITING_SUCCEDED = 'TRANSACTION_WAITING_SUCCEDED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
  INIT_TRANSACTION = 'INIT_TRANSACTION',
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
  payload: ITransferCommand;
};

export type IFetchTransactionWaiting = {
  type: typeof ITransactionsTypes.FETCH_TRANSACTION_WAITING;
  payload: ITransactionWaitingCommand;
};

export type IFetchPayout = {
  type: typeof ITransactionsTypes.FETCH_PAYOUT;
  payload: IPayoutCommand;
};

export type IInitializeTransactionsList = {
  type: typeof ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST;
};

export type IInitTransaction = {
  type: typeof ITransactionsTypes.INIT_TRANSACTION;
};

//domain Events
export type ITransactionsListed = {
  type: typeof ITransactionsTypes.TRANSACTIONS_LISTED;
  payload: ITransaction[];
};

export type IPayoutSucceded = {
  type: typeof ITransactionsTypes.PAYOUT_SUCCEDED;
  payload: ITransaction;
};

export type ITransferSucceded = {
  type: typeof ITransactionsTypes.TRANSFER_SUCCEDED;
  payload: ITransaction;
};

export type ITransactionWaitingSucceded = {
  type: typeof ITransactionsTypes.TRANSACTION_WAITING_SUCCEDED;
  payload: ITransaction;
};

export type ITransactionFailed = {
  type: typeof ITransactionsTypes.TRANSACTION_FAILED;
  payload: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>;
};

export type ITransactionsActions =
  | IListTransactions
  | IFetchTransfer
  | IFetchTransactionWaiting
  | IFetchPayout
  | ITransactionsListed
  | ITransferSucceded
  | ITransactionWaitingSucceded
  | IPayoutSucceded
  | ITransactionFailed
  | IInitTransaction
  | IInitializeTransactionsList;
