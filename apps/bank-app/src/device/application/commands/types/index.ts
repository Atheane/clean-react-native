import { IDomainError } from '@clean-rn/ddd';
import {
  Device,
  IDeviceErrorCodes,
  IDeviceErrorMessage,
  IRegisterDeviceCommand,
} from '@clean-rn/device/domain';

export enum IDeviceTypes {
  // commands
  FETCH_REGISTER_DEVICE = 'FETCH_REGISTER_DEVICE',
  INITIALIZE_DEVICE = 'INITIALIZE_DEVICE',
  RESET_ERROR = 'RESET_ERROR',
  // domain events
  DEVICE_ALREADY_REGISTERED = 'DEVICE_ALREADY_REGISTERED',
  DEVICE_REGISTERED = 'DEVICE_REGISTERED',
}

// commands
export type IFetchRegisterDevice = {
  type: typeof IDeviceTypes.FETCH_REGISTER_DEVICE;
  payload: IRegisterDeviceCommand & { firebaseId?: string; deviceId: string; appVersion: string };
};

export type IInitializeDevice = {
  type: typeof IDeviceTypes.INITIALIZE_DEVICE;
};

export type IResetError = {
  type: typeof IDeviceTypes.RESET_ERROR;
};

// domainEvents
export type IDeviceRegistered = {
  type: typeof IDeviceTypes.DEVICE_REGISTERED;
  payload: Device;
};

export type IDeviceAlreadyRegistered = {
  type: typeof IDeviceTypes.DEVICE_ALREADY_REGISTERED;
  payload: {
    error: IDomainError<IDeviceErrorCodes, IDeviceErrorMessage>;
  };
};

export type IDeviceActions =
  | IInitializeDevice
  | IResetError
  | IFetchRegisterDevice
  | IDeviceRegistered
  | IDeviceAlreadyRegistered;
