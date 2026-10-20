import { Customer } from '@clean-rn/kyc/domain';

export interface IKycState {
  pending: boolean;
  customer: Customer | null;
}
