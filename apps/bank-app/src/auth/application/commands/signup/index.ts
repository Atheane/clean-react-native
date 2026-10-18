import { User } from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  IRegisterIdentity,
  IRegisterPassword,
  IRegisterAddress,
  IRegisterBirth,
} from './types';

export const registerIdentity = (payload: User): IRegisterIdentity => ({
  type: ISignupTypes.REGISTER_IDENTITY,
  payload,
});

export const registerPassword = (payload: User): IRegisterPassword => ({
  type: ISignupTypes.REGISTER_PASSWORD,
  payload,
});

export const registerAddress = (payload: User): IRegisterAddress => ({
  type: ISignupTypes.REGISTER_ADDRESS,
  payload,
});

export const registerBirth = (payload: User): IRegisterBirth => ({
  type: ISignupTypes.REGISTER_BIRTH,
  payload,
});

export { ISignupTypes, ISignupActions };
