import { ITransaction } from '@clean-rn/account/domain';

export interface ITransactionsState {
  pending: boolean;
  transactions: ITransaction[] | null;
}
