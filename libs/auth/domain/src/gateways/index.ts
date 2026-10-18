import { ILoginCommand, IResetPasswordCommand, ISendPhoneValidationCommand } from '../commands';
import { ICheckEmailQuery, ICheckPhoneQuery, IValidatePhoneQuery } from '../queries';
import { IAuth, ISuccess } from '../types';

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  resetPassword: (cmd: IResetPasswordCommand) => Promise<ISuccess>;
  searchEmail(query: ICheckEmailQuery): Promise<ISuccess>;
  searchPhone(query: ICheckPhoneQuery): Promise<ISuccess>;
  sendPhoneValidation: (cmd: ISendPhoneValidationCommand) => Promise<ISuccess>;
  checkPhoneValidation: (query: IValidatePhoneQuery) => Promise<ISuccess>;
  //   checkPhoneValidationCode: (params: IGetCheckPinParams) => Promise<{ success: boolean }>;
}
