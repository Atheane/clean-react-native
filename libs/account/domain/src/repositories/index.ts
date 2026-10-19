import { IAccount, ITransaction } from '../entities';

export interface IAccountRepository {
  getAccounts(): Promise<IAccount[]>;
}

export interface ITransactionRepository {
  getTransactions(accountId: number): Promise<ITransaction[]>;
}
