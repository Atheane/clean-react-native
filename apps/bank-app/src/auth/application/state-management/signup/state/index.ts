import { Email, Phone, IAuthErrorCodes, IAuthErrorMessage, Prospect, User } from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  phone: Phone | null;
  prospect: Prospect | null;
  user: User | null;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}

export const selectEmail = (state: ISignupState) => state.email;
export const selectProspect = (state: ISignupState) => state.prospect;
