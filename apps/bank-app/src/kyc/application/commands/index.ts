import { Customer } from '@clean-rn/kyc/domain';
import {
  IKycTypes,
  ICheckCustomerStatus,
  IInitializeKyc,
  IKycActions,
  ICustomerStatusChecked,
  IInitKycRoute,
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

export const initKycRoute = (payload: { customer: Customer }): IInitKycRoute => ({
  type: IKycTypes.INIT_KYC_ROUTE,
  payload,
});

// domainEvent
export const customerStatusChecked = (payload: { customer: Customer }): ICustomerStatusChecked => ({
  type: IKycTypes.CUSTOMER_STATUS_CHECKED,
  payload,
});

export const kycRouteInitialized = (payload: { initRoute: IRoutes }): IKycRouteInitialized => ({
  type: IKycTypes.KYC_ROUTE_INITIALIZED,
  payload,
});

export { IKycTypes, IKycActions };
