import { ISuccess } from '@clean-rn/ddd';
import { Email } from '../valueObjects';

export type IAuth = {
  accessToken: string;
  refreshToken: string;
};

export type ILoginCommand = {
  email: Email;
  password: string;
};

export type IResetPasswordCommand = {
  email: Email;
};

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  resetPassword: (cmd: IResetPasswordCommand) => Promise<ISuccess>;
  //   sendPhoneValidation: (
  //     params: IPostSendPhoneValidationParams,
  //   ) => Promise<AxiosResponse<{ success: boolean }>>;
  //   checkPhoneValidationCode: (params: IGetCheckPinParams) => Promise<{ success: boolean }>;
}
