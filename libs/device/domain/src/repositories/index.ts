import { IDeviceProperties, Device } from '../entities';

export interface IDeviceRepository {
  createDevice(device: IDeviceProperties & { deviceId: string }): Promise<Device>;
}
