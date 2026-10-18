import {
  ILoginTypes,
  ILoginFailure,
  ILoginFailurePayload,
  IFetchLoginRequest,
  IFetchLoginRequestPayload,
  IFetchLoginSuccess,
  IFetchLoginSuccessPayload,
} from './types';

export const fetchLoginRequest = (payload: IFetchLoginRequestPayload): IFetchLoginRequest => ({
  type: ILoginTypes.FETCH_LOGIN_REQUEST,
  payload,
});

export const fetchLoginSuccess = (payload: IFetchLoginSuccessPayload): IFetchLoginSuccess => ({
  type: ILoginTypes.FETCH_LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: ILoginFailurePayload): ILoginFailure => ({
  type: ILoginTypes.LOGIN_FAILURE,
  payload,
});

export {
  ILoginTypes,
  ILoginFailure,
  ILoginFailurePayload,
  IFetchLoginRequest,
  IFetchLoginRequestPayload,
  IFetchLoginSuccess,
  IFetchLoginSuccessPayload,
};
