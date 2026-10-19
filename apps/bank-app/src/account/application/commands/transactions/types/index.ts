import { IAccount, IStatementsPeriod, ITransaction } from '@clean-rn/account/domain';

export enum ITransactionsTypes {
  LIST_TRANSACTIONS = 'LIST_TRANSACTIONS',
  TRANSACTIONS_LISTED = 'TRANSACTIONS_LISTED',
  INITIALIZE_TRANSACTIONS_LIST = 'INITIALIZE_TRANSACTIONS_LIST',
  DOWNLOAD_STATEMENTS = 'DOWNLOAD_STATEMENTS',
  STATEMENTS_DOWNLOADED = 'STATEMENTS_DOWNLOADED',
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

export type IDownloadStatements = {
  type: typeof ITransactionsTypes.DOWNLOAD_STATEMENTS;
  payload: {
    account: IAccount;
  };
};

export type IStatementsDownloaded = {
  type: typeof ITransactionsTypes.STATEMENTS_DOWNLOADED;
  payload: {
    buffer: ArrayBuffer;
    period: IStatementsPeriod;
  };
};

export type ITransactionsActions =
  | IListTransactions
  | ITransactionsListed
  | IInitializeTransactionsList
  | IDownloadStatements
  | IStatementsDownloaded;
