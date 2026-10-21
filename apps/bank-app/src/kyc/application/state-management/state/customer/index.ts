import { Customer } from '@clean-rn/kyc/domain';
import { IRoutes } from '../../../../../shared/presentation/types';

export interface ICustomerState {
  pending: boolean;
  customer: Customer | null;
  initRoute: IRoutes | null;
}
