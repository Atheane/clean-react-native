import { IDomainError } from '@clean-rn/ddd';

import {
  IAuth,
  IAuthErrorMessage,
  IAuthErrorCodes,
  ILoginCommand,
  IResetPasswordCommand,
  ISuccess,
} from '@clean-rn/auth/domain';
import { User } from '@clean-rn/user/domain';
import { IRoutes } from '../../../../shared/presentation/types';

export enum IAuthTypes {
  FETCH_LOGIN = 'FETCH_LOGIN',
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  RESET_ERROR = 'RESET_ERROR',
  FETCH_REFRESH = 'FETCH_REFRESH',
  REFRESH_SUCCEDED = 'REFRESH_SUCCEDED',
  FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD',
  PASSWORD_RESET = 'PASSWORD_RESET',
  INITIALIZE_AUTH = 'INITIALIZE_AUTH',
}

export type IFetchLogin = {
  type: typeof IAuthTypes.FETCH_LOGIN;
  payload: ILoginCommand;
};

export type IFetchRefresh = {
  type: typeof IAuthTypes.FETCH_REFRESH;
  payload?: { nextRoute: IRoutes; params?: any };
};

export type IResetError = {
  type: typeof IAuthTypes.RESET_ERROR;
};

export type IFetchResetPassword = {
  type: typeof IAuthTypes.FETCH_RESET_PASSWORD;
  payload: IResetPasswordCommand;
};

export type IInitializeAuth = {
  type: typeof IAuthTypes.INITIALIZE_AUTH;
};

export type ILoginSucceded = {
  type: typeof IAuthTypes.LOGIN_SUCCEDED;
  payload: {
    auth: IAuth;
    user: User;
  };
};

export type IRefreshSucceded = {
  type: typeof IAuthTypes.REFRESH_SUCCEDED;
  payload: {
    auth: IAuth;
  };
};

export type ILoginFailed = {
  type: typeof IAuthTypes.LOGIN_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

export type IPasswordReset = {
  type: typeof IAuthTypes.PASSWORD_RESET;
  payload: ISuccess;
};

export type IAuthActions =
  | IFetchLogin
  | IFetchRefresh
  | ILoginSucceded
  | ILoginFailed
  | IResetError
  | IRefreshSucceded
  | IFetchResetPassword
  | IPasswordReset
  | IInitializeAuth;
