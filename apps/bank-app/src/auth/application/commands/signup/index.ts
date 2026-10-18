import { Email, Prospect, User, ISuccess } from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  IFetchCheckEmail,
  IIdentityRegistered,
  IRegisterPassword,
  IRegisterAddress,
  IRegisterBirth,
  ICreateUser,
  IEmailChecked,
} from './types';

export const fetchCheckEmail = (payload: Email): IFetchCheckEmail => ({
  type: ISignupTypes.FETCH_CHECK_EMAIL,
  payload,
});

export const emailChecked = (payload: ISuccess): IEmailChecked => ({
  type: ISignupTypes.EMAIL_CHECKED,
  payload,
});

export const identityRegistered = (payload: Prospect): IIdentityRegistered => ({
  type: ISignupTypes.IDENTITY_REGISTERED,
  payload,
});

export const registerPassword = (payload: Prospect): IRegisterPassword => ({
  type: ISignupTypes.REGISTER_PASSWORD,
  payload,
});

export const registerAddress = (payload: Prospect): IRegisterAddress => ({
  type: ISignupTypes.REGISTER_ADDRESS,
  payload,
});

export const registerBirth = (payload: Prospect): IRegisterBirth => ({
  type: ISignupTypes.REGISTER_BIRTH,
  payload,
});

export const createUser = (payload: User): ICreateUser => ({
  type: ISignupTypes.CREATE_USER,
  payload,
});

export { ISignupTypes, ISignupActions };
