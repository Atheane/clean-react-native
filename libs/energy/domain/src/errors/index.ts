/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IEnergyErrorCodes {
  INVALID_MEASUREMENT = 'INVALID_MEASUREMENT',
  INVALID_UNIT_CODE = 'INVALID_UNIT_CODE',
  INVALID_SENSOR_TYPE = 'INVALID_SENSOR_TYPE',
}

export enum IEnergyErrorMessage {
  INVALID_MEASUREMENT = 'Invalid measurement properties types',
  INVALID_UNIT_CODE = 'Invalid unit code',
  INVALID_SENSOR_TYPE = 'Invalid sensor type',
}

export namespace EnergyError {
  export const isEnergyError = (error: unknown): boolean => {
    if (!(error instanceof Error)) return false;
    return Object.values(EnergyError)
      .filter((value) => typeof value === 'function') // Pour ne garder que les classes d'erreur
      .some((ErrorClass) => error instanceof ErrorClass);
  };
  export class InvalidMeasurement
    extends Error
    implements IDomainError<IEnergyErrorCodes, IEnergyErrorMessage>
  {
    code: IEnergyErrorCodes;
    message: IEnergyErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IEnergyErrorCodes.INVALID_MEASUREMENT;
      this.message = IEnergyErrorMessage.INVALID_MEASUREMENT;
      this.cause = cause;
    }
  }
  export class InvalidUnitCode extends Error implements IDomainError<IEnergyErrorCodes, IEnergyErrorMessage> {
    code: IEnergyErrorCodes;
    message: IEnergyErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IEnergyErrorCodes.INVALID_UNIT_CODE;
      this.message = IEnergyErrorMessage.INVALID_UNIT_CODE;
      this.cause = cause;
    }
  }
  export class InvalidSensorType
    extends Error
    implements IDomainError<IEnergyErrorCodes, IEnergyErrorMessage>
  {
    code: IEnergyErrorCodes;
    message: IEnergyErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IEnergyErrorCodes.INVALID_SENSOR_TYPE;
      this.message = IEnergyErrorMessage.INVALID_SENSOR_TYPE;
      this.cause = cause;
    }
  }
}
