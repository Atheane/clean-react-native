import { IAuth, IAuthGateway, ILoginParam } from '@clean-rn/auth/domain';

import { AxiosSingleton } from '@clean-rn/shared/infrastructure';

export class AuthApi implements IAuthGateway {
  private readonly baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async login(param: ILoginParam): Promise<IAuth> {
    const response = await AxiosSingleton.getInstance(this.baseURL).post<IAuth>('/auth/login', {
      email: param.email.value,
      password: param.password,
    });
    return response.data;
  }

  // putResetPassword(body: IPutResetPasswordBody): Promise<AxiosResponse<{ success: boolean }>> {
  //   return this._instance.put<{ success: boolean }>('/app/user/resetPassword', body);
  // }

  // getSearchEmail(params: IGetSearchEmailParams): Promise<AxiosResponse<{ success: boolean }>> {
  //   return this._instance.get<{ success: boolean }>('/app/user/search', { params });
  // }

  // getSearchPhone(params: IGetSearchPhoneParams): Promise<AxiosResponse<{ success: boolean }>> {
  //   return this._instance.get<{ success: boolean }>('/app/user/search', { params });
  // }

  // postSendPhoneValidation(
  //   params: IPostSendPhoneValidationParams,
  // ): Promise<AxiosResponse<{ success: boolean }>> {
  //   return this._instance.post<{ success: boolean }>('/app/user/sendPhoneValidationCode', params);
  // }

  // getCheckPhoneValidationCode(params: IGetCheckPinParams) {
  //   return this._instance.get<{ success: boolean }>('/app/user/checkPhoneValidationCode', { params });
  // }

  // postCreateUser(params: IPostCreateUserParams): Promise<AxiosResponse<IAuth>> {
  //   return this._instance.post<IAuth>('/app/user', params);
  // }
}
