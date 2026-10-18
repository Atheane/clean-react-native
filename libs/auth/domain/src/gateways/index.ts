import { IAuth, ILoginParams, IResetPasswordParams } from '../types';

export interface IAuthGateway {
  login: (params: ILoginParams) => Promise<IAuth>;
  resetPassword: (params: IResetPasswordParams) => Promise<{ success: boolean }>;
  //   sendPhoneValidation: (
  //     params: IPostSendPhoneValidationParams,
  //   ) => Promise<AxiosResponse<{ success: boolean }>>;
  //   checkPhoneValidationCode: (params: IGetCheckPinParams) => Promise<{ success: boolean }>;
}
