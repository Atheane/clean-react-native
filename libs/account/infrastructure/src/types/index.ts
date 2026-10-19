import { IAccountType, ITransactionType } from '@clean-rn/account/domain';

export type IAccountServer = {
  accountId: number;
  accountType: IAccountType;
  authorizedBalance: number;
  iban: string;
  bic: string;
};

export type ITransactionServer = {
  transactionId: number;
  amount: number;
  label: string;
  mccCode?: number;
  updatedAt: string;
  transactionType: ITransactionType;
};
