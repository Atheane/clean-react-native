/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IAccountErrorMessage {
  INVALID_IBAN = 'Invalid IBAN',
  INVALID_BIC = 'Invalid BIC',
}

export enum IAccountErrorCodes {
  INVALID_IBAN = 'INVALID_IBAN',
  INVALID_BIC = 'INVALID_BIC',
}

export namespace AccountError {
  export class InvalidIban extends Error implements IDomainError<IAccountErrorCodes, IAccountErrorMessage> {
    code: IAccountErrorCodes;
    message: IAccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAccountErrorMessage.INVALID_IBAN;
      this.code = IAccountErrorCodes.INVALID_IBAN;
      this.cause = cause;
    }
  }
  export class InvalidBic extends Error implements IDomainError<IAccountErrorCodes, IAccountErrorMessage> {
    code: IAccountErrorCodes;
    message: IAccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAccountErrorMessage.INVALID_BIC;
      this.code = IAccountErrorCodes.INVALID_BIC;
      this.cause = cause;
    }
  }
}
