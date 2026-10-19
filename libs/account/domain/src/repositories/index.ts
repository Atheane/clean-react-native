import { IAccount } from '../entities';

export interface IAccountRepository {
  getAccounts(): Promise<IAccount[]>;
}
