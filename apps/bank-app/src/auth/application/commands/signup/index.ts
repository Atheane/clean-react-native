import {
  Prospect,
  IAuthErrorCodes,
  IAuthErrorMessage,
  ICheckEmailQuery,
  ICheckPhoneQuery,
  IValidatePhoneQuery,
} from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  ISignupFailed,
  IIdentityRegistered,
  IBirthRegistered,
  IAddressRegistered,
  IEmailChecked,
  IPasswordRegistered,
  IFetchCheckEmailExists,
  IFetchCheckPhone,
  IFetchValidatePhone,
  IPhoneChecked,
  IPhoneValidated,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

export const fetchCheckEmailExists = (payload: ICheckEmailQuery): IFetchCheckEmailExists => ({
  type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
  payload,
});

export const emailChecked = (): IEmailChecked => ({
  type: ISignupTypes.EMAIL_CHECKED,
});

export const signupFailed = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ISignupFailed => ({
  type: ISignupTypes.SIGNUP_FAILED,
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

export const fetchCheckPhone = (payload: ICheckPhoneQuery): IFetchCheckPhone => ({
  type: ISignupTypes.FETCH_CHECK_PHONE,
  payload,
});

export const phoneChecked = (): IPhoneChecked => ({
  type: ISignupTypes.PHONE_CHECKED,
});

export const fetchValidatePhone = (payload: IValidatePhoneQuery): IFetchValidatePhone => ({
  type: ISignupTypes.FETCH_VALIDATE_PHONE,
  payload,
});

export const phoneValidated = (prospect: Prospect): IPhoneValidated => ({
  type: ISignupTypes.PHONE_VALIDATED,
  payload: prospect,
});

export { ISignupTypes, ISignupActions };
