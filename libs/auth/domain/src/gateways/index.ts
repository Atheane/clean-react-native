import { IAuth, ILoginParam } from '../types';

export interface IAuthGateway {
  login: (param: ILoginParam) => Promise<IAuth>;
  //   resetPassword: (body: IPutResetPasswordBody) => Promise<{ success: boolean }>;
  //   sendPhoneValidation: (
  //     params: IPostSendPhoneValidationParams,
  //   ) => Promise<AxiosResponse<{ success: boolean }>>;
  //   checkPhoneValidationCode: (params: IGetCheckPinParams) => Promise<{ success: boolean }>;
}
