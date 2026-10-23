import { IDomainError } from '@clean-rn/ddd';

import {
  IAuth,
  IAuthErrorMessage,
  IAuthErrorCodes,
  ILoginCommand,
  IResetPasswordCommand,
  ISuccess,
  ILogPhoneCommand,
} from '@clean-rn/auth/domain';
import { IRoutes } from '../../../../shared/presentation/types';

export enum IAuthTypes {
  // commands
  FETCH_LOGIN = 'FETCH_LOGIN',
  FETCH_REFRESH = 'FETCH_REFRESH',
  FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD',
  FETCH_LOGOUT = 'FETCH_LOGOUT',
  // domain events
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  REFRESH_SUCCEDED = 'REFRESH_SUCCEDED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  LOGGED_OUT = 'LOGGED_OUT',
  RESET_ERROR = 'RESET_ERROR',
  INITIALIZE_AUTH = 'INITIALIZE_AUTH',
}

// commands
export type IFetchLogin = {
  type: typeof IAuthTypes.FETCH_LOGIN;
  payload: ILoginCommand & { locale: string };
};

export type IFetchRefresh = {
  type: typeof IAuthTypes.FETCH_REFRESH;
  payload?: { nextRoute: IRoutes; params?: any };
};

export type IFetchResetPassword = {
  type: typeof IAuthTypes.FETCH_RESET_PASSWORD;
  payload: IResetPasswordCommand;
};

export type IFetchLogout = {
  type: typeof IAuthTypes.FETCH_LOGOUT;
};

// domain events
export type ILoginSucceded = {
  type: typeof IAuthTypes.LOGIN_SUCCEDED;
  payload: {
    auth: IAuth;
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

export type ILoggedOut = {
  type: typeof IAuthTypes.LOGGED_OUT;
};

export type IInitializeAuth = {
  type: typeof IAuthTypes.INITIALIZE_AUTH;
};

export type IResetError = {
  type: typeof IAuthTypes.RESET_ERROR;
};

export type IAuthActions =
  | IFetchLogin
  | IFetchRefresh
  | IFetchLogout
  | ILoginSucceded
  | ILoginFailed
  | IResetError
  | IRefreshSucceded
  | IFetchResetPassword
  | IPasswordReset
  | IInitializeAuth
  | ILoggedOut;
