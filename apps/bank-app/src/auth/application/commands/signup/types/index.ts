import {
  Prospect,
  User,
  ISuccess,
  IAuthErrorCodes,
  IAuthErrorMessage,
  ICheckEmailQuery,
  ICheckPhoneQuery,
} from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum ISignupTypes {
  FETCH_CHECK_EMAIL = 'FETCH_CHECK_EMAIL',
  EMAIL_CHECKED = 'EMAIL_CHECKED',
  SIGNUP_FAILED = 'SIGNUP_FAILED',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  PASSWORD_REGISTERED = 'PASSWORD_REGISTERED',
  FETCH_CHECK_PHONE = 'FETCH_CHECK_PHONE',
  PHONE_CHECKED = 'PHONE_CHECKED',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  BIRTH_REGISTERED = 'BIRTH_REGISTERED',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  ADDRESS_REGISTERED = 'ADDRESS_REGISTERED',
  CREATE_USER = 'CREATE_USER',
}

export type IFetchCheckEmail = {
  type: typeof ISignupTypes.FETCH_CHECK_EMAIL;
  payload: ICheckEmailQuery;
};

export type IEmailChecked = {
  type: typeof ISignupTypes.EMAIL_CHECKED;
  payload: ISuccess;
};

export type ISignupFailed = {
  type: typeof ISignupTypes.SIGNUP_FAILED;
  payload: {
    error: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
    success: boolean;
  };
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
  payload: ISuccess;
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

export type ICreateUser = {
  type: typeof ISignupTypes.CREATE_USER;
  payload: User;
};

export type ISignupActions =
  | IFetchCheckEmail
  | IEmailChecked
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchCheckPhone
  | IPhoneChecked
  | IBirthRegistered
  | IAddressRegistered
  | ICreateUser;
