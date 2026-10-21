import { Email } from '@clean-rn/auth/domain';
import { Phone, IUserErrorCodes, IUserErrorMessage, User, PhoneOtp } from '@clean-rn/user/domain';

import { IDomainError } from '@clean-rn/ddd';

export interface IUserState {
  pending: boolean;
  email: Email | null;
  phone: Phone | null;
  phoneOtp: PhoneOtp | null;
  user: User | null;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
}
