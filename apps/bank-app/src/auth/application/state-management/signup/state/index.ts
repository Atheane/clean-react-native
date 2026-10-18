import { Email, Prospect, User } from '@clean-rn/auth/domain';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  success: boolean | null;
  prospect: Prospect | null;
  user: User | null;
}

export const selectEmail = (state: ISignupState) => state.email;
export const selectProspect = (state: ISignupState) => state.prospect;
