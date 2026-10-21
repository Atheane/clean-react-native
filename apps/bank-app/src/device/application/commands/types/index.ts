import { Device, IRegisterDeviceCommand } from '@clean-rn/device/domain';

export enum IDeviceTypes {
  // commands
  FETCH_REGISTER_DEVICE = 'FETCH_REGISTER_DEVICE',
  INITIALIZE_DEVICE = 'INITIALIZE_DEVICE',
  // domain events
  DEVICE_REGISTERED = 'DEVICE_REGISTERED',
}

// commands

export type IInitializeDevice = {
  type: typeof IDeviceTypes.INITIALIZE_DEVICE;
};

export type IFetchRegisterDevice = {
  type: typeof IDeviceTypes.FETCH_REGISTER_DEVICE;
  payload: IRegisterDeviceCommand & { firebaseId?: string } & { deviceId: string };
};

// domainEvents
export type IDeviceRegistered = {
  type: typeof IDeviceTypes.DEVICE_REGISTERED;
  payload: Device;
};

export type IDeviceActions = IInitializeDevice | IFetchRegisterDevice | IDeviceRegistered;
