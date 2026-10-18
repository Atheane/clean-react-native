import { Email } from '@clean-rn/auth/domain';

export interface IInitializationState {
  pending: boolean;
  email: Email | null;
  error: unknown | null;
}
