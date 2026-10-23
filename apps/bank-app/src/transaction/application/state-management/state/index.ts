import { IDomainError } from '@clean-rn/ddd';
import {
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
} from '@clean-rn/transaction/domain';

export interface ITransactionsState {
  pending: boolean;
  transactions: ITransaction[] | null;
  transaction: ITransaction | null;
  error: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage> | null;
}
