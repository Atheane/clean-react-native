import { Device, IRegisterDeviceCommand } from '@clean-rn/device/domain';
import {
  IInitializeDevice,
  IFetchRegisterDevice,
  IDeviceRegistered,
  IDeviceTypes,
  IDeviceActions,
} from './types';

// redux actions that are commands
export const initializeDevice = (): IInitializeDevice => ({
  type: IDeviceTypes.INITIALIZE_DEVICE,
});

export const fetchRegisterDevice = (
  payload: IRegisterDeviceCommand & { firebaseId?: string; deviceId: string },
): IFetchRegisterDevice => ({
  type: IDeviceTypes.FETCH_REGISTER_DEVICE,
  payload,
});

// redux actions that are domain Events
export const deviceRegistered = (device: Device): IDeviceRegistered => ({
  type: IDeviceTypes.DEVICE_REGISTERED,
  payload: device,
});

export { IDeviceTypes, IDeviceActions };
