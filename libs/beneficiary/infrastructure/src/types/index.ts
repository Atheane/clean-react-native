import { IBeneficiaryType } from '@clean-rn/beneficiary/domain';

export type IBeneficiaryServer = {
  beneficiaryId: number;
  beneficiaryType: IBeneficiaryType;
  iban: string;
  bic: string;
};
