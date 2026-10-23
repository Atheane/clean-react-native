/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IContactErrorMessage {
  INVALID_NAME = 'Invalid name format',
  INVALID_PHONE = 'Invalid phone format',
  INVALID_COUNTRY_CODE = 'Invalid country calling code',
  CONTACT_ALREADY_EXISTS = 'Contact already exists',
}

export enum IContactErrorCodes {
  INVALID_NAME = 'INVALID_NAME',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_COUNTRY_CODE = 'INVALID_COUNTRY_CODE',
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
  export class InvalidCountryCode
    extends Error
    implements IDomainError<IContactErrorCodes, IContactErrorMessage>
  {
    code: IContactErrorCodes;
    message: IContactErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IContactErrorMessage.INVALID_COUNTRY_CODE;
      this.code = IContactErrorCodes.INVALID_COUNTRY_CODE;
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
