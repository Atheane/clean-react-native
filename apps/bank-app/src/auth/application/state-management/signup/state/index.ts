import { Email, Phone, IAuthErrorCodes, IAuthErrorMessage, User, PhoneOtp } from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

import { IRootState } from '../../../../../shared/application/state-management/reducers/root-reducer';

export interface ISignupState {
  pending: boolean;
  email: Email | null;
  phone: Phone | null;
  phoneOtp: PhoneOtp | null;
  user: User | null;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}

export const selectEmail = (state: IRootState) => state.initialization.email;
export const selectUser = (state: IRootState) => state.auth.signup.user;
export const selectPhoneOtp = (state: IRootState) => state.auth.signup.phoneOtp;
