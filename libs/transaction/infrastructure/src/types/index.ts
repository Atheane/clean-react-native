import { ITransactionType } from '@clean-rn/transaction/domain';

export type ITransactionServer = {
  transactionId: number;
  amount: number;
  label: string;
  mccCode?: number;
  updatedAt: string;
  transactionType: ITransactionType;
};
