/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IUserErrorMessage {
  INVALID_NAME = 'Invalid name',
  INVALID_COUNTRY = 'Invalid country',
  UNAVAILABLE_COUNTRY = 'Unavailable country',
  INVALID_BIRTHDAY = 'Invalid birthday',
  INVALID_6_DIGITS = 'Invalid 6 digits',
  INVALID_ADDRESS = 'Invalid address',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'Signup failure, email already exists',
  SIGNUP_FAILURE_PHONE_EXISTS = 'Signup failure, phone already exists',
  VALIDATE_PHONE_INCORRECT_PHONE_CODE = 'Validate phone failure, incorrect phone code',
  VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND = 'Validate phone failure, phone not found',
  SIGNUP_FAILURE = 'Signup failure',
}

export enum IUserErrorCodes {
  INVALID_NAME = 'INVALID_NAME',
  INVALID_COUNTRY = 'INVALID_COUNTRY',
  UNAVAILABLE_COUNTRY = 'UNAVAILABLE_COUNTRY',
  INVALID_BIRTHDAY = 'INVALID_BIRTHDAY',
  INVALID_6_DIGITS = 'INVALID_6_DIGITS',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'SIGNUP_FAILURE_EMAIL_EXISTS',
  SIGNUP_FAILURE_PHONE_EXISTS = 'SIGNUP_FAILURE_PHONE_EXISTS',
  VALIDATE_PHONE_INCORRECT_PHONE_CODE = 'VALIDATE_PHONE_INCORRECT_PHONE_CODE',
  VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND = 'VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',
}

export namespace UserError {
  export const isUserError = (error: unknown): boolean => {
    if (!(error instanceof Error)) return false;
    return Object.values(UserError)
      .filter((value) => typeof value === 'function') // Pour ne garder que les classes d'erreur
      .some((ErrorClass) => error instanceof ErrorClass);
  };
  export class InvalidName extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.INVALID_NAME;
      this.message = IUserErrorMessage.INVALID_NAME;
      this.cause = cause;
    }
  }
  export class InvalidCountry extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.INVALID_COUNTRY;
      this.message = IUserErrorMessage.INVALID_COUNTRY;
      this.cause = cause;
    }
  }
  export class UnavailableCountry extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.UNAVAILABLE_COUNTRY;
      this.message = IUserErrorMessage.UNAVAILABLE_COUNTRY;
      this.cause = cause;
    }
  }
  export class InvalidBirthday extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.INVALID_BIRTHDAY;
      this.message = IUserErrorMessage.INVALID_BIRTHDAY;
      this.cause = cause;
    }
  }
  export class Invalid6Digits extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.INVALID_6_DIGITS;
      this.message = IUserErrorMessage.INVALID_6_DIGITS;
      this.cause = cause;
    }
  }
  export class SignupFailureEmailExists
    extends Error
    implements IDomainError<IUserErrorCodes, IUserErrorMessage>
  {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IUserErrorMessage.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.code = IUserErrorCodes.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.cause = cause;
    }
  }
  export class SignupFailurePhoneExists
    extends Error
    implements IDomainError<IUserErrorCodes, IUserErrorMessage>
  {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IUserErrorMessage.SIGNUP_FAILURE_PHONE_EXISTS;
      this.code = IUserErrorCodes.SIGNUP_FAILURE_PHONE_EXISTS;
      this.cause = cause;
    }
  }
  export class ValidatePhoneIncorrectPhoneCode
    extends Error
    implements IDomainError<IUserErrorCodes, IUserErrorMessage>
  {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IUserErrorMessage.VALIDATE_PHONE_INCORRECT_PHONE_CODE;
      this.code = IUserErrorCodes.VALIDATE_PHONE_INCORRECT_PHONE_CODE;
      this.cause = cause;
    }
  }
  export class ValidatePhoneFailurePhoneNotFound
    extends Error
    implements IDomainError<IUserErrorCodes, IUserErrorMessage>
  {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IUserErrorMessage.VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND;
      this.code = IUserErrorCodes.VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND;
      this.cause = cause;
    }
  }
  export class InvalidAddress extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.code = IUserErrorCodes.INVALID_ADDRESS;
      this.message = IUserErrorMessage.INVALID_ADDRESS;
      this.cause = cause;
    }
  }
  export class SignupFailure extends Error implements IDomainError<IUserErrorCodes, IUserErrorMessage> {
    code: IUserErrorCodes;
    message: IUserErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IUserErrorMessage.SIGNUP_FAILURE;
      this.code = IUserErrorCodes.SIGNUP_FAILURE;
      this.cause = cause;
    }
  }
}
