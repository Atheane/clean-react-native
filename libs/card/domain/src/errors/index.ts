/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICardErrorMessage {
  INVALID_PIN_FORMAT = 'Invalid PIN format',
}

export enum ICardErrorCodes {
  INVALID_PIN_FORMAT = 'INVALID_PIN_FORMAT',
}

export namespace CardError {
  export class InvalidPinFormat extends Error implements IDomainError<ICardErrorCodes, ICardErrorMessage> {
    code: ICardErrorCodes;
    message: ICardErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICardErrorCodes.INVALID_PIN_FORMAT;
      this.message = ICardErrorMessage.INVALID_PIN_FORMAT;
      this.cause = cause;
    }
  }
}
