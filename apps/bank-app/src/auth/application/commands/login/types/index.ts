import { IDomainError } from '@clean-rn/ddd';

import { IAuth, IAuthErrorMessage, IAuthErrorCodes, ILoginCommand } from '@clean-rn/auth/domain';

export enum ILoginTypes {
  FETCH_LOGIN = 'FETCH_LOGIN',
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

export type IFetchLogin = {
  type: typeof ILoginTypes.FETCH_LOGIN;
  payload: ILoginCommand;
};

export type ILoginSucceded = {
  type: typeof ILoginTypes.LOGIN_SUCCEDED;
  payload: IAuth;
};

export type ILoginFailed = {
  type: typeof ILoginTypes.LOGIN_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

export type ILoginActions = IFetchLogin | ILoginSucceded | ILoginFailed;
