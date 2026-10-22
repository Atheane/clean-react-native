import { IAccount } from '@clean-rn/account/domain';
import {
  ISendTransferCommand,
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
  ITransfer,
} from '@clean-rn/transaction/domain';

import {
  ITransactionsTypes,
  ITransactionsActions,
  IListTransactions,
  IFetchSendTransfer,
  IInitializeTransactionsList,
  ITransactionsListed,
  ITransferSent,
  ITransferFailed,
  IInitTransfer,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// commands
export const listTransactions = (payload: { account: IAccount }): IListTransactions => ({
  type: ITransactionsTypes.LIST_TRANSACTIONS,
  payload,
});

export const initializeTransactionsList = (): IInitializeTransactionsList => ({
  type: ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST,
});

export const fetchSendTransfer = (payload: ISendTransferCommand): IFetchSendTransfer => ({
  type: ITransactionsTypes.FETCH_SEND_TRANSFER,
  payload,
});

export const initTransfer = (): IInitTransfer => ({
  type: ITransactionsTypes.INIT_TRANSFER,
});

// domainEvents
export const transactionsListed = (payload: ITransaction[]): ITransactionsListed => ({
  type: ITransactionsTypes.TRANSACTIONS_LISTED,
  payload,
});

export const transferSent = (payload: ITransfer): ITransferSent => ({
  type: ITransactionsTypes.TRANSFER_SENT,
  payload,
});

export const transferFailed = (
  payload: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>,
): ITransferFailed => ({
  type: ITransactionsTypes.TRANSFER_FAILED,
  payload,
});

export { ITransactionsTypes, ITransactionsActions };
