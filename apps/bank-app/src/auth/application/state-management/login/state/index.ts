import { IDomainError } from '@clean-rn/ddd';

import { IAuth, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

export interface ILoginState {
  pending: boolean;
  auth:
    | IAuth
    | {
        accessToken: null;
        refreshToken: null;
      };
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error | null;
  bearerToken: string | null;
}
