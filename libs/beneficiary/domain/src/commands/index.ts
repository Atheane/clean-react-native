import { BIC, IBAN } from '../value-objects';

export type IBeneficiaryAddCommand = {
  bic: string;
  iban: string;
  name: string;
};

export type IBeneficiaryDeleteCommand = {
  beneficiaryId: number;
};
