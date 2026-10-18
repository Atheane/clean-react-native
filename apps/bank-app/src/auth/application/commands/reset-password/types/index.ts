import { ISuccess } from '@clean-rn/ddd';
import { IResetPasswordCommand } from '@clean-rn/auth/domain';

export enum IResetPasswordTypes {
  FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD',
  RESET_PASSWORD_SUCCEDED = 'RESET_PASSWORD_SUCCEDED',
  INIT_RESET_PASSWORD = 'INIT_RESET_PASSWORD',
}

export type IFetchResetPassword = {
  type: typeof IResetPasswordTypes.FETCH_RESET_PASSWORD;
  payload: IResetPasswordCommand;
};

export type IFetchResetPasswordSucceded = {
  type: typeof IResetPasswordTypes.RESET_PASSWORD_SUCCEDED;
  payload: ISuccess;
};

export type IInitResetPassword = {
  type: typeof IResetPasswordTypes.INIT_RESET_PASSWORD;
};

export type IResetPasswordActions = IFetchResetPassword | IFetchResetPasswordSucceded | IInitResetPassword;
