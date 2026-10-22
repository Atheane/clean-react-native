import { IAccount } from '@clean-rn/account/domain';
import { IDomainError } from '@clean-rn/ddd';
import {
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
  ITransfer,
  ISendTransferCommand,
} from '@clean-rn/transaction/domain';

export enum ITransactionsTypes {
  //commands
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  FETCH_SEND_TRANSFER = 'FETCH_SEND_TRANSFER',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
  INIT_TRANSFER = 'INIT_TRANSFER',
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

export type IFetchSendTransfer = {
  type: typeof ITransactionsTypes.FETCH_SEND_TRANSFER;
  payload: ISendTransferCommand;
};

export type IInitializeTransactionsList = {
  type: typeof ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST;
};

export type IInitTransfer = {
  type: typeof ITransactionsTypes.INIT_TRANSFER;
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
  payload: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>;
};

export type ITransactionsActions =
  | IListTransactions
  | IFetchSendTransfer
  | IInitializeTransactionsList
  | IInitTransfer
  | ITransactionsListed
  | ITransferSent
  | ITransferFailed;
