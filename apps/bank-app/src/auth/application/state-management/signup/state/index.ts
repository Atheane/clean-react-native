import { User } from '@clean-rn/auth/domain';

export interface ISignupState {
  pending: boolean;
  user: User | null;
}
