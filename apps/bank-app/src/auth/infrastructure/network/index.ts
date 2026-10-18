import { IAuth, ILoginParam } from '@clean-rn/auth/domain';
import Constants from 'expo-constants';

const login = async (param: ILoginParam): Promise<IAuth> => {
  const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL_API}/auth/login`, {
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
};

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

export const authApi = { login };
