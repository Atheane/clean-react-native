import { Phone } from '../valueObjects';
import { ILoginCommand, IResetPasswordCommand } from '../commands';
import { ICheckEmailQuery } from '../queries';
import { IAuth, ISuccess } from '../types';

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  resetPassword: (cmd: IResetPasswordCommand) => Promise<ISuccess>;
  searchEmail(query: ICheckEmailQuery): Promise<ISuccess>;
  // searchPhone(phone: Phone): Promise<ISuccess>;
  //   sendPhoneValidation: (
  //     params: IPostSendPhoneValidationParams,
  //   ) => Promise<AxiosResponse<{ success: boolean }>>;
  //   checkPhoneValidationCode: (params: IGetCheckPinParams) => Promise<{ success: boolean }>;
}
