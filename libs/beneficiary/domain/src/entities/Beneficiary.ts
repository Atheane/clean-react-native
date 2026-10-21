import { Iban, Bic } from '../value-objects';

export interface IBeneficiary {
  beneficiaryId: number;
  name: string;
  iban: Iban;
  bic: Bic;
}
