import { IDomainError } from '@clean-rn/ddd';

import { ICustomerErrorCodes, ICustomerErrorMessage, Customer } from '@clean-rn/kyc/domain';

export interface ICustomerState {
  pending: boolean;
  customer: Customer | null;
  error: IDomainError<ICustomerErrorCodes, ICustomerErrorMessage> | null;
}
