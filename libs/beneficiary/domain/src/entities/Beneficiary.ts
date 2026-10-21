import { IBAN, BIC } from '../value-objects';

export interface IBeneficiary {
  beneficiaryId: number;
  name: string;
  iban: IBAN;
  bic: BIC;
}
