import { ITransaction } from '@clean-rn/transaction/domain';

export interface ITransactionsState {
  pending: boolean;
  transactions: ITransaction[] | null;
}
