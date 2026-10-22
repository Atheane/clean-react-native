import { IDomainError } from '@clean-rn/ddd';
import {
  ITransaction,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
  ITransfer,
} from '@clean-rn/transaction/domain';

export interface ITransactionsState {
  pending: boolean;
  transactions: ITransaction[] | null;
  transfer: ITransfer | null;
  error: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage> | null;
}
