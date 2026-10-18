import { User } from '@clean-rn/auth/domain';

export enum ISignupTypes {
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
}

export type IRegisterIdentity = {
  type: typeof ISignupTypes.REGISTER_IDENTITY;
  payload: User;
};

export type IRegisterPassword = {
  type: typeof ISignupTypes.REGISTER_PASSWORD;
  payload: User;
};

export type IRegisterBirth = {
  type: typeof ISignupTypes.REGISTER_BIRTH;
  payload: User;
};

export type IRegisterAddress = {
  type: typeof ISignupTypes.REGISTER_ADDRESS;
  payload: User;
};

export type ISignupActions = IRegisterIdentity | IRegisterPassword | IRegisterBirth | IRegisterAddress;
