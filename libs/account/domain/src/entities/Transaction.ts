import { Amount, TransactionCategory } from '../value-objects';
import { ITransactionType } from '../types';

export interface ITransaction {
  id: number;
  amount: Amount;
  label: string;
  category: TransactionCategory;
  date: Date;
  type: ITransactionType;
}
