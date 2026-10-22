import { User } from '@clean-rn/user/domain';
import { Customer } from '@clean-rn/kyc/domain';
import { IRoutes } from '../../../../../shared/presentation/types';

export enum ICustomerTypes {
  CHECK_CUSTOMER_STATUS = 'CHECK_CUSTOMER_STATUS',
  CUSTOMER_STATUS_CHECKED = 'CUSTOMER_STATUS_CHECKED',
  INITIALIZE_KYC = 'INITIALIZE_KYC',
  CUSTOMER_DOCUMENTS_UPDATED = 'CUSTOMER_DOCUMENTS_UPDATED',
}

export type ICheckCustomerStatus = {
  type: typeof ICustomerTypes.CHECK_CUSTOMER_STATUS;
  payload: {
    user: User;
  };
};

export type ICustomerStatusChecked = {
  type: typeof ICustomerTypes.CUSTOMER_STATUS_CHECKED;
  payload: {
    customer: Customer;
    initRoute: IRoutes;
  };
};

export type IInitializeKyc = {
  type: typeof ICustomerTypes.INITIALIZE_KYC;
};

export type ICustomerDocumentsUpdated = {
  type: typeof ICustomerTypes.CUSTOMER_DOCUMENTS_UPDATED;
  payload: {
    customer: Customer;
  };
};

export type ICustomerActions =
  | ICheckCustomerStatus
  | ICustomerStatusChecked
  | IInitializeKyc
  | ICustomerDocumentsUpdated;
