import { Email, Prospect, User, ISuccess } from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  IFetchCheckEmail,
  IIdentityRegistered,
  IBirthRegistered,
  IAddressRegistered,
  ICreateUser,
  IEmailChecked,
  IPasswordRegistered,
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

export const passwordRegistered = (payload: Prospect): IPasswordRegistered => ({
  type: ISignupTypes.PASSWORD_REGISTERED,
  payload,
});

export const birthRegistered = (payload: Prospect): IBirthRegistered => ({
  type: ISignupTypes.BIRTH_REGISTERED,
  payload,
});

export const addressRegistered = (payload: Prospect): IAddressRegistered => ({
  type: ISignupTypes.ADDRESS_REGISTERED,
  payload,
});

export const createUser = (payload: User): ICreateUser => ({
  type: ISignupTypes.CREATE_USER,
  payload,
});

export { ISignupTypes, ISignupActions };
