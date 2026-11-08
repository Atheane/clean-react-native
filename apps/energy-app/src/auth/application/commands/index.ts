import { IDomainError } from '@clean-rn/ddd';
import {
  IAuth,
  ILoginCommand,
  IAuthErrorMessage,
  IAuthErrorCodes,
  IResetPasswordCommand,
  ISuccess,
} from '@clean-rn/auth/domain';

import {
  IAuthTypes,
  IFetchLogin,
  ILoginSucceded,
  ILoginFailed,
  IAuthActions,
  IResetError,
  IFetchRefresh,
  IRefreshSucceded,
  IFetchResetPassword,
  IPasswordReset,
  IInitializeAuth,
  IFetchLogout,
  ILoggedOut,
} from './types';
import { IRoutes } from '../../../shared/presentation/types';

export const fetchLogin = (payload: ILoginCommand & { locale: string }): IFetchLogin => ({
  type: IAuthTypes.FETCH_LOGIN,
  payload,
});

export const fetchRefresh = (payload?: { nextRoute: IRoutes; params?: any }): IFetchRefresh => ({
  type: IAuthTypes.FETCH_REFRESH,
  payload,
});

export const fetchResetPassword = (payload: IResetPasswordCommand): IFetchResetPassword => ({
  type: IAuthTypes.FETCH_RESET_PASSWORD,
  payload,
});

export const fetchLogout = (): IFetchLogout => ({
  type: IAuthTypes.FETCH_LOGOUT,
});

// Domain Events

export const loginSuccess = (payload: { auth: IAuth }): ILoginSucceded => ({
  type: IAuthTypes.LOGIN_SUCCEDED,
  payload,
});

export const refreshSuccess = (payload: { auth: IAuth }): IRefreshSucceded => ({
  type: IAuthTypes.REFRESH_SUCCEDED,
  payload,
});

export const loginFailure = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ILoginFailed => ({
  type: IAuthTypes.LOGIN_FAILED,
  payload,
});

export const passwordReset = (payload: ISuccess): IPasswordReset => ({
  type: IAuthTypes.PASSWORD_RESET,
  payload,
});

export const loggedOut = (): ILoggedOut => ({
  type: IAuthTypes.LOGGED_OUT,
});

export const initializeAuth = (): IInitializeAuth => ({
  type: IAuthTypes.INITIALIZE_AUTH,
});

export const resetError = (): IResetError => ({
  type: IAuthTypes.RESET_ERROR,
});

export { IAuthTypes, IAuthActions };
