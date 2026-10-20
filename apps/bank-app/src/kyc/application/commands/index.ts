import { Customer } from '@clean-rn/kyc/domain';
import {
  IKycTypes,
  ICheckCustomerStatus,
  IInitializeKyc,
  IKycActions,
  ICustomerStatusChecked,
  IKycRouteInitialized,
} from './types';
import { IRoutes } from '../../../shared/presentation/types';

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

export const kycRouteInitialized = (payload: { initRoute: IRoutes | null }): IKycRouteInitialized => ({
  type: IKycTypes.KYC_ROUTE_INITIALIZED,
  payload,
});

export { IKycTypes, IKycActions };
