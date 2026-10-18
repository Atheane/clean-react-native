import { Email } from '@clean-rn/auth/domain';

export interface ICheckEmailState {
  pending: boolean;
  success: boolean | null;
  email: Email | null;
}
