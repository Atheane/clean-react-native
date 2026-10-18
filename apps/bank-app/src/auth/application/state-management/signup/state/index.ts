import { Email, Phone, IAuthErrorCodes, IAuthErrorMessage, User, PhoneOtp } from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  phone: Phone | null;
  phoneOtp: PhoneOtp | null;
  user: User | null;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}

export const selectEmail = (state: ISignupState) => state.email;
export const selectUser = (state: ISignupState) => state.user;
export const selectPhoneOtp = (state: ISignupState) => state.phoneOtp;
