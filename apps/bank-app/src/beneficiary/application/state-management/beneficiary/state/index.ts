import { IBeneficiary } from '@clean-rn/beneficiary/domain';

export interface IBeneficiarysState {
  pending: boolean;
  beneficiaries: IBeneficiary[] | null;
}
