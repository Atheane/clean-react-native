import { IDomainError } from '@clean-rn/ddd';
import { Email, IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

export enum IResetPasswordTypes {
  FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD',
  RESET_PASSWORD_SUCCEDED = 'RESET_PASSWORD_SUCCEDED',
  RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
  INIT_RESET_PASSWORD = 'INIT_RESET_PASSWORD',
}

export type IFetchResetPassword = {
  type: typeof IResetPasswordTypes.FETCH_RESET_PASSWORD;
  payload: {
    email: Email;
  };
};

export type IFetchResetPasswordSucceded = {
  type: typeof IResetPasswordTypes.RESET_PASSWORD_SUCCEDED;
  payload: {
    success: boolean;
  };
};

export type IFetchResetPasswordFailed = {
  type: typeof IResetPasswordTypes.RESET_PASSWORD_FAILED;
  payload: {
    error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error;
  };
};

export type IInitResetPassword = {
  type: typeof IResetPasswordTypes.INIT_RESET_PASSWORD;
};

export type IResetPasswordActions =
  | IFetchResetPassword
  | IFetchResetPasswordSucceded
  | IFetchResetPasswordFailed
  | IInitResetPassword;
