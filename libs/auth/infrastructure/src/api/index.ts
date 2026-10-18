import { IAuth, IAuthGateway, ILoginParam } from '@clean-rn/auth/domain';

export class AuthApi implements IAuthGateway {
  private readonly baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async login(param: ILoginParam): Promise<IAuth> {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: param.email.value,
        password: param.password,
      }),
    });
    return response.json();
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
