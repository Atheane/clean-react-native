import { Email } from '@clean-rn/auth/domain';
import {
  IUserErrorCodes,
  IUserErrorMessage,
  User,
  PhoneOtp,
  IUpdateUserConfigCommand,
} from '@clean-rn/user/domain';
import { Phone } from '@clean-rn/contact/domain';

import { IDomainError } from '@clean-rn/ddd';
import { IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';

export interface IUserState {
  pending: boolean;
  email: Email | null;
  phone: Phone | null;
  phoneOtp: PhoneOtp | null;
  config: IUpdateUserConfigCommand | null;
  user: User | null;
  error: IDomainError<IUserErrorCodes | IContactErrorCodes, IUserErrorMessage | IContactErrorMessage> | null;
}
