import { IDomainError } from '@clean-rn/ddd';
import { IAuth, User, ILoginCommand, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

import {
  ILoginTypes,
  IFetchLogin,
  ILoginSucceded,
  ILoginFailed,
  ILoginActions,
  IInitializeLogin,
  IResetError,
  IFetchRefresh,
  IRefreshSucceded,
} from './types';
import { IRoutes } from '../../../../shared/presentation/types';

export const fetchLogin = (payload: ILoginCommand): IFetchLogin => ({
  type: ILoginTypes.FETCH_LOGIN,
  payload,
});

export const fetchRefresh = (payload?: { nextRoute: IRoutes; params?: any }): IFetchRefresh => ({
  type: ILoginTypes.FETCH_REFRESH,
  payload,
});

export const loginSuccess = (payload: { auth: IAuth; user: User }): ILoginSucceded => ({
  type: ILoginTypes.LOGIN_SUCCEDED,
  payload,
});

export const refreshSuccess = (payload: { auth: IAuth }): IRefreshSucceded => ({
  type: ILoginTypes.REFRESH_SUCCEDED,
  payload,
});

export const loginFailure = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ILoginFailed => ({
  type: ILoginTypes.LOGIN_FAILED,
  payload,
});

export const initializeLogin = (): IInitializeLogin => ({
  type: ILoginTypes.INITIALIZE_LOGIN,
});

export const resetError = (): IResetError => ({
  type: ILoginTypes.RESET_ERROR,
});

export { ILoginTypes, ILoginActions };
