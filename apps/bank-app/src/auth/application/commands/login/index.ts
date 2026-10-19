import { IDomainError } from '@clean-rn/ddd';
import { IAuth, ILoginCommand, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

import {
  ILoginTypes,
  IFetchLogin,
  ILoginSucceded,
  ILoginFailed,
  ILoginActions,
  IInitializeLogin,
} from './types';

export const fetchLogin = (payload: ILoginCommand): IFetchLogin => ({
  type: ILoginTypes.FETCH_LOGIN,
  payload,
});

export const loginSuccess = (payload: IAuth): ILoginSucceded => ({
  type: ILoginTypes.LOGIN_SUCCEDED,
  payload,
});

export const loginFailure = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ILoginFailed => ({
  type: ILoginTypes.LOGIN_FAILED,
  payload,
});

export const initializeLogin = (): IInitializeLogin => ({
  type: ILoginTypes.INITIALIZE_LOGIN,
});

export { ILoginTypes, ILoginActions };
