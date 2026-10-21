import { Customer } from '@clean-rn/kyc/domain';

export interface ICustomerState {
  pending: boolean;
  customer: Customer | null;
}
