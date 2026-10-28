import { IDomainError } from '@clean-rn/ddd';

import { IAuth, IAuthErrorMessage, IAuthErrorCodes, ILoginCommand } from '@clean-rn/auth/domain';

export enum IAuthTypes {
  // commands
  FETCH_LOGIN = 'FETCH_LOGIN',
  // FETCH_LOGOUT = 'FETCH_LOGOUT',
  // domain events
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  // LOGGED_OUT = 'LOGGED_OUT',
  RESET_ERROR = 'RESET_ERROR',
  INITIALIZE_AUTH = 'INITIALIZE_AUTH',
}

// commands
export type IFetchLogin = {
  type: typeof IAuthTypes.FETCH_LOGIN;
  payload: ILoginCommand & { rememberMe: boolean };
};

// domain events
export type ILoginSucceded = {
  type: typeof IAuthTypes.LOGIN_SUCCEDED;
  payload: {
    auth: IAuth;
  };
};
export type ILoginFailed = {
  type: typeof IAuthTypes.LOGIN_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

// export type ILoggedOut = {
//   type: typeof IAuthTypes.LOGGED_OUT;
// };

export type IInitializeAuth = {
  type: typeof IAuthTypes.INITIALIZE_AUTH;
};

export type IResetError = {
  type: typeof IAuthTypes.RESET_ERROR;
};

export type IAuthActions =
  | IFetchLogin
  // | IFetchLogout
  | ILoginSucceded
  | ILoginFailed
  | IResetError
  | IInitializeAuth;
// | ILoggedOut;
