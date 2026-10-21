import { Customer } from '@clean-rn/kyc/domain';
import {
  ICustomerTypes,
  ICheckCustomerStatus,
  IInitializeKyc,
  ICustomerActions,
  ICustomerStatusChecked,
  ICustomerDocumentsUpdated,
} from './types';
import { IRoutes } from '../../../../shared/presentation/types';

// commands
export const checkCustomerStatus = (): ICheckCustomerStatus => ({
  type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
});

export const initializeKyc = (): IInitializeKyc => ({
  type: ICustomerTypes.INITIALIZE_KYC,
});

// domainEvent
export const customerStatusChecked = (payload: {
  customer: Customer;
  initRoute: IRoutes;
}): ICustomerStatusChecked => ({
  type: ICustomerTypes.CUSTOMER_STATUS_CHECKED,
  payload,
});

export const customerDocumentsUpdated = (payload: { customer: Customer }): ICustomerDocumentsUpdated => ({
  type: ICustomerTypes.CUSTOMER_DOCUMENTS_UPDATED,
  payload,
});

export { ICustomerTypes, ICustomerActions };
