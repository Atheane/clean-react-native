import { Email, IAuthErrorCodes, IAuthErrorMessage, Prospect, User } from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  success: boolean | null;
  prospect: Prospect | null;
  user: User | null;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}

export const selectEmail = (state: ISignupState) => state.email;
export const selectProspect = (state: ISignupState) => state.prospect;
