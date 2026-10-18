import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

export interface IResetPasswordState {
  pending: boolean;
  success: boolean;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
}
