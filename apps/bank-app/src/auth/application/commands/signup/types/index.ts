import {
  Prospect,
  User,
  IAuthErrorCodes,
  IAuthErrorMessage,
  ICheckEmailQuery,
  ICheckPhoneQuery,
  IValidatePhoneQuery,
} from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum ISignupTypes {
  FETCH_CHECK_EMAIL_EXISTS = 'FETCH_CHECK_EMAIL_EXISTS',
  EMAIL_CHECKED = 'EMAIL_CHECKED',
  SIGNUP_FAILED = 'SIGNUP_FAILED',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  PASSWORD_REGISTERED = 'PASSWORD_REGISTERED',
  FETCH_CHECK_PHONE = 'FETCH_CHECK_PHONE',
  PHONE_CHECKED = 'PHONE_CHECKED',
  FETCH_VALIDATE_PHONE = 'FETCH_VALIDATE_PHONE',
  PHONE_VALIDATED = 'PHONE_VALIDATED',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  BIRTH_REGISTERED = 'BIRTH_REGISTERED',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  ADDRESS_REGISTERED = 'ADDRESS_REGISTERED',
  FETCH_SIGNUP_USER = 'FETCH_SIGNUP_USER',
  USER_SIGNED_UP = 'USER_SIGNED_UP',
}

export type IFetchCheckEmailExists = {
  type: typeof ISignupTypes.FETCH_CHECK_EMAIL_EXISTS;
  payload: ICheckEmailQuery;
};

export type IEmailChecked = {
  type: typeof ISignupTypes.EMAIL_CHECKED;
};

export type ISignupFailed = {
  type: typeof ISignupTypes.SIGNUP_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

export type IIdentityRegistered = {
  type: typeof ISignupTypes.IDENTITY_REGISTERED;
  payload: Prospect;
};

export type IPasswordRegistered = {
  type: typeof ISignupTypes.PASSWORD_REGISTERED;
  payload: Prospect;
};

export type IFetchCheckPhone = {
  type: typeof ISignupTypes.FETCH_CHECK_PHONE;
  payload: ICheckPhoneQuery;
};

export type IPhoneChecked = {
  type: typeof ISignupTypes.PHONE_CHECKED;
};

export type IFetchValidatePhone = {
  type: typeof ISignupTypes.FETCH_VALIDATE_PHONE;
  payload: IValidatePhoneQuery;
};

export type IPhoneValidated = {
  type: typeof ISignupTypes.PHONE_VALIDATED;
  payload: Prospect;
};

export type IBirthRegistered = {
  type: typeof ISignupTypes.BIRTH_REGISTERED;
  payload: Prospect;
};

export type IRegisterAddress = {
  type: typeof ISignupTypes.REGISTER_ADDRESS;
  payload: Prospect;
};

export type IAddressRegistered = {
  type: typeof ISignupTypes.ADDRESS_REGISTERED;
  payload: Prospect;
};

export type IFetchSignupUser = {
  type: typeof ISignupTypes.FETCH_SIGNUP_USER;
};

export type IUserSignedUp = {
  type: typeof ISignupTypes.USER_SIGNED_UP;
  payload: User;
};

export type ISignupActions =
  | IFetchCheckEmailExists
  | IEmailChecked
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchCheckPhone
  | IPhoneChecked
  | IFetchValidatePhone
  | IPhoneValidated
  | IBirthRegistered
  | IAddressRegistered
  | IFetchSignupUser
  | IUserSignedUp;
