import { IResetPasswordCommand, ISuccess } from '@clean-rn/auth/domain';
import {
  IFetchResetPassword,
  IFetchResetPasswordSucceded,
  IResetPasswordActions,
  IResetPasswordTypes,
  IInitResetPassword,
} from './types';

export const fetchResetPassword = (payload: IResetPasswordCommand): IFetchResetPassword => ({
  type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
  payload,
});

export const resetPasswordSuccess = (payload: ISuccess): IFetchResetPasswordSucceded => ({
  type: IResetPasswordTypes.RESET_PASSWORD_SUCCEDED,
  payload,
});
export const initResetPassword = (): IInitResetPassword => ({
  type: IResetPasswordTypes.INIT_RESET_PASSWORD,
});

export { IResetPasswordTypes, IResetPasswordActions };
