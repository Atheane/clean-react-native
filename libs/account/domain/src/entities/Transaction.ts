import { Amount, TransactionCategory } from '../valueObjects';
import { ITransactionType } from '../types';

export interface ITransaction {
  id: number;
  amount: Amount;
  label: string;
  category: TransactionCategory; //todo
  date: Date;
  type: ITransactionType;
}
