import { IAccount, IStatementsPeriod, ITransaction } from '@clean-rn/account/domain';
import {
  ITransactionsTypes,
  ITransactionsActions,
  IListTransactions,
  ITransactionsListed,
  IInitializeTransactionsList,
  IDownloadStatements,
  IStatementsDownloaded,
} from './types';

// commands
export const listTransactions = (payload: { account: IAccount }): IListTransactions => ({
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

export const downloadStatements = (payload: {
  account: IAccount;
  period: IStatementsPeriod;
}): IDownloadStatements => ({
  type: ITransactionsTypes.DOWNLOAD_STATEMENTS,
  payload,
});

export const statementsDownloaded = (payload: {
  buffer: ArrayBuffer;
  period: IStatementsPeriod;
}): IStatementsDownloaded => ({
  type: ITransactionsTypes.STATEMENTS_DOWNLOADED,
  payload,
});

export { ITransactionsTypes, ITransactionsActions };
