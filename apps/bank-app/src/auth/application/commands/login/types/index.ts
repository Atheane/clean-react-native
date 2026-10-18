import { IDomainError } from '@clean-rn/ddd';

import { IAuth, Email, IAuthErrorMessage, IAuthErrorCodes } from '@clean-rn/auth/domain';

export enum ILoginTypes {
  FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

export type IFetchLoginRequestPayload = {
  email: Email;
  password: string;
};

export type IFetchLoginSuccessPayload = {
  auth: IAuth;
};

export type ILoginFailurePayload = {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error;
};

export type IFetchLoginRequest = {
  type: typeof ILoginTypes.FETCH_LOGIN_REQUEST;
  payload: IFetchLoginRequestPayload;
};

export type IFetchLoginSuccess = {
  type: typeof ILoginTypes.FETCH_LOGIN_SUCCESS;
  payload: IFetchLoginSuccessPayload;
};

export type ILoginFailure = {
  type: typeof ILoginTypes.LOGIN_FAILURE;
  payload: ILoginFailurePayload;
};

export type ILoginActions = IFetchLoginRequest | IFetchLoginSuccess | ILoginFailure;
