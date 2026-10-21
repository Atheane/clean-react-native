import { BIC, IBAN } from '../value-objects';
import { IBeneficiary } from '../entities';

export type IBeneficiaryAddCommand = {
  bic: BIC;
  iban: IBAN;
  name: string;
};
