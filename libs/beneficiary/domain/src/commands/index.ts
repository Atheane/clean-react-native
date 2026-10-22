import { BIC, IBAN } from '../value-objects';

export type IBeneficiaryAddCommand = {
  bic: BIC;
  iban: IBAN;
  name: string;
};

export type IBeneficiaryDeleteCommand = {
  beneficiaryId: number;
};
