import { BIC, IBAN } from '../value-objects';

export type IAddBeneficiaryCommand = {
  bic: string;
  iban: string;
  name: string;
};

export type IDeleteBeneficiaryCommand = {
  beneficiaryId: number;
};
