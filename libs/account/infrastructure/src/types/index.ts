import { IAccountType } from '@clean-rn/account/domain';

export type IAccountServer = {
  accountId: number;
  accountType: IAccountType;
  authorizedBalance: number;
  iban: string;
  bic: string;
};
