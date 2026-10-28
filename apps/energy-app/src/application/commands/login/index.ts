import { IDomainError } from '@clean-rn/ddd';
import { IAuth, ILoginCommand, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

import {
  IAuthTypes,
  IFetchLogin,
  ILoginSucceded,
  ILoginFailed,
  IAuthActions,
  IResetError,
  IInitializeAuth,
  // IFetchLogout,
  // ILoggedOut,
} from './types';

export const fetchLogin = (payload: ILoginCommand & { rememberMe: boolean }): IFetchLogin => ({
  type: IAuthTypes.FETCH_LOGIN,
  payload,
});

// export const fetchLogout = (): IFetchLogout => ({
//   type: IAuthTypes.FETCH_LOGOUT,
// });

// Domain Events

export const loginSuccess = (payload: { auth: IAuth }): ILoginSucceded => ({
  type: IAuthTypes.LOGIN_SUCCEDED,
  payload,
});

export const loginFailure = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ILoginFailed => ({
  type: IAuthTypes.LOGIN_FAILED,
  payload,
});

// export const loggedOut = (): ILoggedOut => ({
//   type: IAuthTypes.LOGGED_OUT,
// });

export const initializeAuth = (): IInitializeAuth => ({
  type: IAuthTypes.INITIALIZE_AUTH,
});

export const resetError = (): IResetError => ({
  type: IAuthTypes.RESET_ERROR,
});

export { IAuthTypes, IAuthActions };
