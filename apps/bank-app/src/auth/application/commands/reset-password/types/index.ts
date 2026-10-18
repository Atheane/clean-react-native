import { IResetPasswordCommand, ISuccess } from '@clean-rn/auth/domain';

export enum IResetPasswordTypes {
  FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD',
  PASSWORD_RESET = 'PASSWORD_RESET',
  INIT_RESET_PASSWORD = 'INIT_RESET_PASSWORD',
}

export type IFetchResetPassword = {
  type: typeof IResetPasswordTypes.FETCH_RESET_PASSWORD;
  payload: IResetPasswordCommand;
};

export type IPasswordReset = {
  type: typeof IResetPasswordTypes.PASSWORD_RESET;
  payload: ISuccess;
};

export type IInitResetPassword = {
  type: typeof IResetPasswordTypes.INIT_RESET_PASSWORD;
};

export type IResetPasswordActions = IFetchResetPassword | IPasswordReset | IInitResetPassword;
