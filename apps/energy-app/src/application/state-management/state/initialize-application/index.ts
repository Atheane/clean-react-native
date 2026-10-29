import { Email } from '@clean-rn/auth/domain';

export interface IInitializationState {
  pending: boolean | null;
  email: Email | null;
}
