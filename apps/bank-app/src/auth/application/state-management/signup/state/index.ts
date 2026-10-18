import { Email, Prospect, User } from '@clean-rn/auth/domain';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  success: boolean | null;
  prospect: Prospect | null;
  user: User | null;
}

export * from './selectEmailFromCheckEmail';
export * from './selectProspect';
