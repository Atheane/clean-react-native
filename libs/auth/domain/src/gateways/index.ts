import { ILoginCommand, IResetPasswordCommand, ISendPhoneValidationCommand } from '../commands';
import { ISearchEmailQuery, ISearchPhoneQuery, IValidatePhoneQuery } from '../queries';
import { IAuth, ISuccess } from '../types';

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  refresh: (refreshToken: string) => Promise<void>;
  resetPassword: (cmd: IResetPasswordCommand) => Promise<ISuccess>;
  searchEmail(query: ISearchEmailQuery): Promise<ISuccess>;
  searchPhone(query: ISearchPhoneQuery): Promise<ISuccess>;
  sendPhoneValidation: (cmd: ISendPhoneValidationCommand) => Promise<ISuccess>;
  checkPhoneValidation: (query: IValidatePhoneQuery) => Promise<ISuccess>;
}
