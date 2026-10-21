import { Iban, Bic } from '../value-objects';
import { IBeneficiaryType } from '../types';

export interface IBeneficiary {
  accountId: number;
  accountType: IBeneficiaryType;
  authorizedBalance: number;
  iban: Iban;
  bic: Bic;
}
