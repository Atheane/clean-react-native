import { IAccount } from '@clean-rn/account/domain';
import {
  ITransferCommand,
  ITransactionWaitingCommand,
  IPayoutCommand,
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
} from '@clean-rn/transaction/domain';

import {
  ITransactionsTypes,
  ITransactionsActions,
  IListTransactions,
  IFetchTransfer,
  IFetchPayout,
  IFetchTransactionWaiting,
  ITransferSucceded,
  IPayoutSucceded,
  ITransactionWaitingSucceded,
  ITransactionFailed,
  IInitializeTransactionsList,
  ITransactionsListed,
  IInitTransaction,
} from './types';
import { IDomainError } from '@clean-rn/ddd';
import { IBeneficiaryErrorCodes, IBeneficiaryErrorMessage } from '@clean-rn/beneficiary/domain';

// commands
export const listTransactions = (payload: { account: IAccount }): IListTransactions => ({
  type: ITransactionsTypes.LIST_TRANSACTIONS,
  payload,
});

export const fetchTransfer = (payload: ITransferCommand): IFetchTransfer => ({
  type: ITransactionsTypes.FETCH_TRANSFER,
  payload,
});

export const fetchPayout = (payload: IPayoutCommand): IFetchPayout => ({
  type: ITransactionsTypes.FETCH_PAYOUT,
  payload,
});

export const fetchTransactionWaiting = (payload: ITransactionWaitingCommand): IFetchTransactionWaiting => ({
  type: ITransactionsTypes.FETCH_TRANSACTION_WAITING,
  payload,
});

// domainEvents
export const transactionsListed = (payload: ITransaction[]): ITransactionsListed => ({
  type: ITransactionsTypes.TRANSACTIONS_LISTED,
  payload,
});

export const transferSucceded = (payload: ITransaction): ITransferSucceded => ({
  type: ITransactionsTypes.TRANSFER_SUCCEDED,
  payload,
});

export const payoutSucceded = (payload: ITransaction): IPayoutSucceded => ({
  type: ITransactionsTypes.PAYOUT_SUCCEDED,
  payload,
});

export const transactionWaitingSucceded = (payload: ITransaction): ITransactionWaitingSucceded => ({
  type: ITransactionsTypes.TRANSACTION_WAITING_SUCCEDED,
  payload,
});

export const transactionFailed = (
  payload:
    | IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>
    | IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>,
): ITransactionFailed => ({
  type: ITransactionsTypes.TRANSACTION_FAILED,
  payload,
});

export const initTransaction = (): IInitTransaction => ({
  type: ITransactionsTypes.INIT_TRANSACTION,
});

export const initializeTransactionsList = (): IInitializeTransactionsList => ({
  type: ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST,
});

export { ITransactionsTypes, ITransactionsActions };
