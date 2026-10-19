import { Email } from '@clean-rn/auth/domain';
import { IAuthStackPages } from '../../../../presentation/types';

export interface IInitializationState {
  pending: boolean | null;
  email: Email | null;
  initRouteName: IAuthStackPages | undefined;
}
