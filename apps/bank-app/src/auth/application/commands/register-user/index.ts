import {
  IRegisterNameCommand,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
} from '@clean-rn/auth/domain';

export enum IRegisterUserTypes {
  REGISTER_NAME = 'REGISTER_NAME',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
}

export type IRegisterName = {
  type: typeof IRegisterUserTypes.REGISTER_NAME;
  payload: IRegisterNameCommand;
};

export type IRegisterPassword = {
  type: typeof IRegisterUserTypes.REGISTER_PASSWORD;
  payload: IRegisterPasswordCommand;
};

export type IRegisterBirth = {
  type: typeof IRegisterUserTypes.REGISTER_BIRTH;
  payload: IRegisterBirthCommand;
};

export type IRegisterAddress = {
  type: typeof IRegisterUserTypes.REGISTER_ADDRESS;
  payload: IRegisterAddressCommand;
};

export type IRegisterUserActions = IRegisterName | IRegisterPassword | IRegisterBirth | IRegisterAddress;
