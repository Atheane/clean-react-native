import { IDomainError } from '@clean-rn/ddd';

import { IAuth, IAuthErrorMessage, IAuthErrorCodes, ILoginCommand, User } from '@clean-rn/auth/domain';

export enum ILoginTypes {
  FETCH_LOGIN = 'FETCH_LOGIN',
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  INITIALIZE_LOGIN = 'INITIALIZE_LOGIN',
  RESET_ERROR = 'RESET_ERROR',
}

export type IFetchLogin = {
  type: typeof ILoginTypes.FETCH_LOGIN;
  payload: ILoginCommand;
};

export type IInitializeLogin = {
  type: typeof ILoginTypes.INITIALIZE_LOGIN;
};

export type IResetError = {
  type: typeof ILoginTypes.RESET_ERROR;
};

export type ILoginSucceded = {
  type: typeof ILoginTypes.LOGIN_SUCCEDED;
  payload: {
    auth: IAuth;
    user: User;
  };
};

export type ILoginFailed = {
  type: typeof ILoginTypes.LOGIN_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

export type ILoginActions = IFetchLogin | ILoginSucceded | ILoginFailed | IInitializeLogin | IResetError;
