import { IDomainError } from '@clean-rn/ddd';
import { IAuth, Email, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

import { ILoginTypes, IFetchLogin, ILoginSucceded, ILoginFailed, ILoginActions } from './types';

export const fetchLogin = (payload: { email: Email; password: string }): IFetchLogin => ({
  type: ILoginTypes.FETCH_LOGIN,
  payload,
});

export const loginSuccess = (payload: { auth: IAuth }): ILoginSucceded => ({
  type: ILoginTypes.LOGIN_SUCCEDED,
  payload,
});

export const loginFailure = (payload: {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error;
}): ILoginFailed => ({
  type: ILoginTypes.LOGIN_FAILED,
  payload,
});

export { ILoginTypes, ILoginActions };
