import { IDomainError } from '@clean-rn/ddd';
import { Email, IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';
import {
  IFetchResetPassword,
  IFetchResetPasswordSucceded,
  IFetchResetPasswordFailed,
  IResetPasswordActions,
  IResetPasswordTypes,
  IInitResetPassword,
} from './types';

export const fetchResetPassword = (payload: { email: Email }): IFetchResetPassword => ({
  type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
  payload,
});

export const resetPasswordSuccess = (payload: { success: boolean }): IFetchResetPasswordSucceded => ({
  type: IResetPasswordTypes.RESET_PASSWORD_SUCCEDED,
  payload,
});

export const resetPasswordFailure = (payload: {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error;
}): IFetchResetPasswordFailed => ({
  type: IResetPasswordTypes.RESET_PASSWORD_FAILED,
  payload,
});

export const initResetPassword = (): IInitResetPassword => ({
  type: IResetPasswordTypes.INIT_RESET_PASSWORD,
});

export { IResetPasswordTypes, IResetPasswordActions };
