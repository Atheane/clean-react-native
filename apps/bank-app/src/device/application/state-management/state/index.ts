import { Device } from '@clean-rn/device/domain';

export interface IDeviceState {
  pending: boolean;
  device: Device | null;
}
