import { ITransaction } from '../entities';

export interface ITransactionRepository {
  getTransactions(accountId: number): Promise<ITransaction[]>;
}
