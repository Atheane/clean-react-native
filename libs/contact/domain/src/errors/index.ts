/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IContactErrorMessage {
  INVALID_NAME = 'Invalid name format',
  INVALID_PHONE = 'Invalid phone format',
  CONTACT_ALREADY_EXISTS = 'Contact already exists',
}

export enum IContactErrorCodes {
  INVALID_NAME = 'INVALID_NAME',
  INVALID_PHONE = 'INVALID_PHONE',
  CONTACT_ALREADY_EXISTS = 'CONTACT_ALREADY_EXISTS',
}

export namespace ContactError {
  export class InvalidPhone extends Error implements IDomainError<IContactErrorCodes, IContactErrorMessage> {
    code: IContactErrorCodes;
    message: IContactErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IContactErrorMessage.INVALID_PHONE;
      this.code = IContactErrorCodes.INVALID_PHONE;
      this.cause = cause;
    }
  }
  export class InvalidName extends Error implements IDomainError<IContactErrorCodes, IContactErrorMessage> {
    code: IContactErrorCodes;
    message: IContactErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IContactErrorMessage.INVALID_NAME;
      this.code = IContactErrorCodes.INVALID_NAME;
      this.cause = cause;
    }
  }
  export class ContactAlreadyExists
    extends Error
    implements IDomainError<IContactErrorCodes, IContactErrorMessage>
  {
    code: IContactErrorCodes;
    message: IContactErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IContactErrorMessage.CONTACT_ALREADY_EXISTS;
      this.code = IContactErrorCodes.CONTACT_ALREADY_EXISTS;
      this.cause = cause;
    }
  }
}
