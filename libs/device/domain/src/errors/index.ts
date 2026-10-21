/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IDeviceErrorMessage {
  DEVICE_ALREADY_REGISTERED = 'Device already registered',
}

export enum IDeviceErrorCodes {
  DEVICE_ALREADY_REGISTERED = 'DEVICE_ALREADY_REGISTERED',
}

export namespace DeviceError {
  export class AlreadyRegistered
    extends Error
    implements IDomainError<IDeviceErrorCodes, IDeviceErrorMessage>
  {
    code: IDeviceErrorCodes;
    message: IDeviceErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IDeviceErrorMessage.DEVICE_ALREADY_REGISTERED;
      this.code = IDeviceErrorCodes.DEVICE_ALREADY_REGISTERED;
      this.cause = cause;
    }
  }
}
