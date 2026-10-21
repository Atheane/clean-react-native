import { IDomainError } from '@clean-rn/ddd';
import { User } from '@clean-rn/user/domain';
import { IAuth, ILoginCommand, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

import {
  IAuthTypes,
  IFetchLogin,
  ILoginSucceded,
  ILoginFailed,
  IAuthActions,
  IInitializeLogin,
  IResetError,
  IFetchRefresh,
  IRefreshSucceded,
} from './types';
import { IRoutes } from '../../../shared/presentation/types';

export const fetchLogin = (payload: ILoginCommand): IFetchLogin => ({
  type: IAuthTypes.FETCH_LOGIN,
  payload,
});

export const fetchRefresh = (payload?: { nextRoute: IRoutes; params?: any }): IFetchRefresh => ({
  type: IAuthTypes.FETCH_REFRESH,
  payload,
});

export const loginSuccess = (payload: { auth: IAuth; user: User }): ILoginSucceded => ({
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

export const initializeLogin = (): IInitializeLogin => ({
  type: IAuthTypes.INITIALIZE_LOGIN,
});

export const resetError = (): IResetError => ({
  type: IAuthTypes.RESET_ERROR,
});

export { IAuthTypes, IAuthActions };
