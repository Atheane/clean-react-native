import { Email, Prospect, User, ISuccess } from '@clean-rn/auth/domain';

export enum ISignupTypes {
  FETCH_CHECK_EMAIL = 'FETCH_CHECK_EMAIL',
  EMAIL_CHECKED = 'EMAIL_CHECKED',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  CREATE_USER = 'CREATE_USER',
}

export type IFetchCheckEmail = {
  type: typeof ISignupTypes.FETCH_CHECK_EMAIL;
  payload: Email;
};

export type IEmailChecked = {
  type: typeof ISignupTypes.EMAIL_CHECKED;
  payload: ISuccess;
};

export type IRegisterIdentity = {
  type: typeof ISignupTypes.REGISTER_IDENTITY;
};

export type IIdentityRegistered = {
  type: typeof ISignupTypes.IDENTITY_REGISTERED;
  payload: Prospect;
};

export type IRegisterPassword = {
  type: typeof ISignupTypes.REGISTER_PASSWORD;
  payload: Prospect;
};

export type IRegisterBirth = {
  type: typeof ISignupTypes.REGISTER_BIRTH;
  payload: Prospect;
};

export type IRegisterAddress = {
  type: typeof ISignupTypes.REGISTER_ADDRESS;
  payload: Prospect;
};

export type ICreateUser = {
  type: typeof ISignupTypes.CREATE_USER;
  payload: User;
};

export type ISignupActions =
  | IFetchCheckEmail
  | IEmailChecked
  | IRegisterIdentity
  | IIdentityRegistered
  | IRegisterPassword
  | IRegisterBirth
  | IRegisterAddress
  | ICreateUser;
