/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICardErrorMessage {
  INVALID_PIN_FORMAT = 'Invalid PIN format',
  CARD_NOT_FOUND = 'Card not found',
  CARD_FORBIDDEN = 'Card forbidden',
}

export enum ICardErrorCodes {
  INVALID_PIN_FORMAT = 'INVALID_PIN_FORMAT',
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  CARD_FORBIDDEN = 'CARD_FORBIDDEN',
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
  export class NotFound extends Error implements IDomainError<ICardErrorCodes, ICardErrorMessage> {
    code: ICardErrorCodes;
    message: ICardErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = ICardErrorCodes.CARD_NOT_FOUND;
      this.message = ICardErrorMessage.CARD_NOT_FOUND;
      this.cause = cause;
    }
  }
  export class Forbidden extends Error implements IDomainError<ICardErrorCodes, ICardErrorMessage> {
    code: ICardErrorCodes;
    message: ICardErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = ICardErrorCodes.CARD_FORBIDDEN;
      this.message = ICardErrorMessage.CARD_FORBIDDEN;
      this.cause = cause;
    }
  }
}
