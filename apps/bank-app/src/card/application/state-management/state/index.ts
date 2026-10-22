import { IDomainError } from '@clean-rn/ddd';

import { IAuth, IAuthErrorMessage, IAuthErrorCodes, Email, Password } from '@clean-rn/auth/domain';

export interface IAuthState {
  pending: boolean;
  email: Email | null;
  password: Password | null;
  auth:
    | IAuth
    | {
        accessToken: null;
        refreshToken: null;
      };
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
  success: boolean | null;
}
