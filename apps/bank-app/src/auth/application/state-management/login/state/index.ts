import { IDomainError } from '@clean-rn/ddd';

import { IAuth, User, IAuthErrorMessage, IAuthErrorCodes, Email, Password } from '@clean-rn/auth/domain';

export interface ILoginState {
  pending: boolean;
  email: Email | null;
  password: Password | null;
  user: User | null;
  auth:
    | IAuth
    | {
        accessToken: null;
        refreshToken: null;
      };
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}
