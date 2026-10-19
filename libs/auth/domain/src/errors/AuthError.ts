/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IAuthErrorMessage {
  INVALID_EMAIL = 'Invalid email',
  INVALID_PASSWORD = 'Invalid password',
  INVALID_PHONE = 'Invalid phone',
  INVALID_COUNTRY = 'Invalid country',
  UNAVAILABLE_COUNTRY = 'Unavailable country',
  INVALID_BIRTHDAY = 'Invalid birthday',
  INVALID_6_DIGITS = 'Invalid 6 digits',
  LOGIN_FAILURE_USER_NOT_FOUND = 'Login failure, user account does not exist',
  LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED = 'Login failure, user phone is not validated yet',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'Login failure, invalid email or password',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'Signup failure, email already exists',
  SIGNUP_FAILURE_PHONE_EXISTS = 'Signup failure, phone already exists',
  VALIDATE_PHONE_INCORRECT_PHONE_CODE = 'Validate phone failure, incorrect phone code',
  VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND = 'Validate phone failure, phone not found',
  USER_UNAUTHENTICATED = 'User unauthenticated', //login expired
}

export enum IAuthErrorCodes {
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_COUNTRY = 'INVALID_COUNTRY',
  UNAVAILABLE_COUNTRY = 'UNAVAILABLE_COUNTRY',
  INVALID_BIRTHDAY = 'INVALID_BIRTHDAY',
  INVALID_6_DIGITS = 'INVALID_6_DIGITS',
  LOGIN_FAILURE_USER_NOT_FOUND = 'LOGIN_FAILURE_USER_NOT_FOUND',
  LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED = 'LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'LOGIN_FAILURE_INVALID_CREDENTIALS',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'SIGNUP_FAILURE_EMAIL_EXISTS',
  SIGNUP_FAILURE_PHONE_EXISTS = 'SIGNUP_FAILURE_PHONE_EXISTS',
  VALIDATE_PHONE_INCORRECT_PHONE_CODE = 'VALIDATE_PHONE_INCORRECT_PHONE_CODE',
  VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND = 'VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND',
  USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED', //login expired
}

export namespace AuthError {
  export class InvalidEmail extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_EMAIL;
      this.code = IAuthErrorCodes.INVALID_EMAIL;
      this.cause = cause;
    }
  }
  export class InvalidPassword extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_PASSWORD;
      this.code = IAuthErrorCodes.INVALID_PASSWORD;
      this.cause = cause;
    }
  }
  export class InvalidPhone extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_PHONE;
      this.code = IAuthErrorCodes.INVALID_PHONE;
      this.cause = cause;
    }
  }
  export class InvalidCountry extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_COUNTRY;
      this.code = IAuthErrorCodes.INVALID_COUNTRY;
      this.cause = cause;
    }
  }
  export class UnavailableCountry extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.UNAVAILABLE_COUNTRY;
      this.code = IAuthErrorCodes.UNAVAILABLE_COUNTRY;
      this.cause = cause;
    }
  }
  export class InvalidBirthday extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_BIRTHDAY;
      this.code = IAuthErrorCodes.INVALID_BIRTHDAY;
      this.cause = cause;
    }
  }
  export class Invalid6Digits extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.INVALID_6_DIGITS;
      this.code = IAuthErrorCodes.INVALID_6_DIGITS;
      this.cause = cause;
    }
  }
  export class LoginFailureUserNotFound
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.LOGIN_FAILURE_USER_NOT_FOUND;
      this.code = IAuthErrorCodes.LOGIN_FAILURE_USER_NOT_FOUND;
      this.cause = cause;
    }
  }
  export class LoginFailureInvalidCredentials
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.LOGIN_FAILURE_INVALID_CREDENTIALS;
      this.code = IAuthErrorCodes.LOGIN_FAILURE_INVALID_CREDENTIALS;
      this.cause = cause;
    }
  }
  export class LoginFailurePhoneNotValidated
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED;
      this.code = IAuthErrorCodes.LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED;
      this.cause = cause;
    }
  }
  export class SignupFailureEmailExists
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.code = IAuthErrorCodes.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.cause = cause;
    }
  }
  export class SignupFailurePhoneExists
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.SIGNUP_FAILURE_PHONE_EXISTS;
      this.code = IAuthErrorCodes.SIGNUP_FAILURE_PHONE_EXISTS;
      this.cause = cause;
    }
  }
  export class ValidatePhoneIncorrectPhoneCode
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.VALIDATE_PHONE_INCORRECT_PHONE_CODE;
      this.code = IAuthErrorCodes.VALIDATE_PHONE_INCORRECT_PHONE_CODE;
      this.cause = cause;
    }
  }
  export class UserUnauthenticated extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.USER_UNAUTHENTICATED;
      this.code = IAuthErrorCodes.USER_UNAUTHENTICATED;
      this.cause = cause;
    }
  }
  export class ValidatePhoneFailurePhoneNotFound
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND;
      this.code = IAuthErrorCodes.VALIDATE_PHONE_FAILURE_PHONE_NOT_FOUND;
      this.cause = cause;
    }
  }
}
