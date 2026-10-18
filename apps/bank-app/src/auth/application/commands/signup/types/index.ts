import { Email, Prospect, User, ISuccess } from '@clean-rn/auth/domain';

export enum ISignupTypes {
  FETCH_CHECK_EMAIL = 'FETCH_CHECK_EMAIL',
  CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  CREATE_USER = 'CREATE_USER',
}

export type IFetchCheckEmail = {
  type: typeof ISignupTypes.FETCH_CHECK_EMAIL;
  payload: Email;
};

export type ICheckEmailSuccess = {
  type: typeof ISignupTypes.CHECK_EMAIL_SUCCESS;
  payload: ISuccess;
};

export type IRegisterIdentity = {
  type: typeof ISignupTypes.REGISTER_IDENTITY;
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
  | ICheckEmailSuccess
  | IRegisterIdentity
  | IRegisterPassword
  | IRegisterBirth
  | IRegisterAddress
  | ICreateUser;
