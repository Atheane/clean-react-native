import { IBeneficiary } from '@clean-rn/beneficiary/domain';

export interface IBeneficiaryState {
  pending: boolean;
  beneficiaries: IBeneficiary[] | null;
}
