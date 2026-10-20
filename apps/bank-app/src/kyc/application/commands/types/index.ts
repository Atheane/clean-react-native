import { Customer } from '@clean-rn/kyc/domain';
import { IRoutes } from '../../../../shared/presentation/types';

export enum IKycTypes {
  CHECK_CUSTOMER_STATUS = 'CHECK_CUSTOMER_STATUS',
  CUSTOMER_STATUS_CHECKED = 'CUSTOMER_STATUS_CHECKED',
  INITIALIZE_KYC = 'INITIALIZE_KYC',
  KYC_ROUTE_INITIALIZED = 'KYC_ROUTE_INITIALIZED',
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

export type IKycRouteInitialized = {
  type: typeof IKycTypes.KYC_ROUTE_INITIALIZED;
  payload: {
    initRoute: IRoutes | null;
  };
};

export type IKycActions =
  | ICheckCustomerStatus
  | ICustomerStatusChecked
  | IInitializeKyc
  | IKycRouteInitialized;
