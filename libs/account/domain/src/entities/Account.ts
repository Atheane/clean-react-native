import { Iban, Bic } from '../value-objects';
import { IAccountType } from '../types';

export interface IAccount {
  accountId: number;
  accountType: IAccountType;
  authorizedBalance: number;
  iban: Iban;
  bic: Bic;
}
