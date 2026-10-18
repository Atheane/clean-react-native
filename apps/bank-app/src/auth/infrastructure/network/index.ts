import { IAuth, ILoginParams, IResetPasswordParams } from '@clean-rn/auth/domain';

import Constants from 'expo-constants';

//todo define an AuthApi singleton class that implements IAuthGateway, IUserRepository
// return an instance with auth token in bearer
const login = async (params: ILoginParams): Promise<IAuth> => {
  const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email.value,
      password: params.password,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || err.statusText);
  }
  return response.json();
};

const resetPassword = async (params: IResetPasswordParams): Promise<{ success: boolean }> => {
  const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL_API}/app/user/resetPassword`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email.value,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || err.statusText);
  }
  return response.json();
};

// const resetPassword = async (params: IResetPasswordParams, auth: IAuth): Promise<{ success: boolean }> => {
//   const response = await fetch(`${Constants.expoConfig?.extra?.BASE_URL_API}/app/user/resetPassword`, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + auth.accessToken,
//     },
//     body: JSON.stringify({
//       email: params.email.value,
//     }),
//   });
//   if (!response.ok) {
//     const err = await response.json();
//     throw new Error(err.message || err.statusText);
//   }
//   return response.json();
// };

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

export const authApi = { login, resetPassword };
