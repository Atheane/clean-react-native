import { Customer } from '@clean-rn/kyc/domain';
import { IRoutes } from '../../../../shared/presentation/types';

export interface IKycState {
  pending: boolean;
  initRoute: IRoutes | null;
  customer: Customer | null;
}
