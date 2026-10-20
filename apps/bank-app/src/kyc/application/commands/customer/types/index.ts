import { Customer } from '@clean-rn/kyc/domain';

export enum IKycTypes {
  CHECK_CUSTOMER_STATUS = 'CHECK_CUSTOMER_STATUS',
  CUSTOMER_STATUS_CHECKED = 'CUSTOMER_STATUS_CHECKED',
  INITIALIZE_KYC = 'INITIALIZE_KYC',
}

export type ICheckCustomerStatus = {
  type: typeof IKycTypes.CHECK_CUSTOMER_STATUS;
};

export type ICustomerStatusChecked = {
  type: typeof IKycTypes.CUSTOMER_STATUS_CHECKED;
  payload: {
    customer: Customer;
  };
};

export type IInitializeKyc = {
  type: typeof IKycTypes.INITIALIZE_KYC;
};

export type IKycActions = ICheckCustomerStatus | ICustomerStatusChecked | IInitializeKyc;
