import { Customer } from '@clean-rn/kyc/domain';
import {
  IKycTypes,
  ICheckCustomerStatus,
  IInitializeKyc,
  IKycActions,
  ICustomerStatusChecked,
} from './types';

// commands
export const checkCustomerStatus = (): ICheckCustomerStatus => ({
  type: IKycTypes.CHECK_CUSTOMER_STATUS,
});

export const initializeKyc = (): IInitializeKyc => ({
  type: IKycTypes.INITIALIZE_KYC,
});

// domainEvent
export const customerStatusChecked = (payload: { customer: Customer }): ICustomerStatusChecked => ({
  type: IKycTypes.CUSTOMER_STATUS_CHECKED,
  payload,
});

export { IKycTypes, IKycActions };
