import { IResetPasswordCommand, ISuccess } from '@clean-rn/auth/domain';
import {
  IFetchResetPassword,
  IPasswordReset,
  IResetPasswordActions,
  IResetPasswordTypes,
  IInitResetPassword,
} from './types';

export const fetchResetPassword = (payload: IResetPasswordCommand): IFetchResetPassword => ({
  type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
  payload,
});

export const passwordReset = (payload: ISuccess): IPasswordReset => ({
  type: IResetPasswordTypes.PASSWORD_RESET,
  payload,
});
export const initializeResetPassword = (): IInitResetPassword => ({
  type: IResetPasswordTypes.INIT_RESET_PASSWORD,
});

export { IResetPasswordTypes, IResetPasswordActions };
