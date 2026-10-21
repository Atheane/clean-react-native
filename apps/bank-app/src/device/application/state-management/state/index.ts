import { IDomainError } from '@clean-rn/ddd';
import { Device, IDeviceErrorCodes, IDeviceErrorMessage } from '@clean-rn/device/domain';

export interface IDeviceState {
  pending: boolean;
  device: Device | null;
  error: IDomainError<IDeviceErrorCodes, IDeviceErrorMessage> | null;
}
