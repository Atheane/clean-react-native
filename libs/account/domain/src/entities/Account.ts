import { Iban, Bic } from '../valueObjects';
import { IAccountType } from '../types';

export interface IAccount {
  accountId: number;
  accountType: IAccountType;
  authorizedBalance: number;
  iban: Iban;
  bic: Bic;
}
