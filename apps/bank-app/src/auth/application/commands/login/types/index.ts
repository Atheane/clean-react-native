import { IDomainError } from '@clean-rn/ddd';

import { IAuth, Email, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

export enum ILoginTypes {
  FETCH_LOGIN = 'FETCH_LOGIN',
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

export type IFetchLogin = {
  type: typeof ILoginTypes.FETCH_LOGIN;
  payload: {
    email: Email;
    password: string;
  };
};

export type ILoginSucceded = {
  type: typeof ILoginTypes.LOGIN_SUCCEDED;
  payload: {
    auth: IAuth;
  };
};

export type ILoginFailed = {
  type: typeof ILoginTypes.LOGIN_FAILED;
  payload: {
    error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error;
  };
};

export type ILoginActions = IFetchLogin | ILoginSucceded | ILoginFailed;
