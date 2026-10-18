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
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'Login Failure, invalid credentials',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'Signup failure, email already exists',
  SIGNUP_FAILURE_PHONE_EXISTS = 'Signup failure, phone already exists',
  SIGNUP_FAILURE_INCORRECT_PHONE_CODE = 'Signup failure, incorrect phone code',
  USER_UNAUTHORIZED = 'User unauthorized',
  USER_UNAUTHENTICATED = 'USser unauthenticated',
}

export enum IAuthErrorCodes {
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_COUNTRY = 'INVALID_COUNTRY',
  UNAVAILABLE_COUNTRY = 'UNAVAILABLE_COUNTRY',
  INVALID_BIRTHDAY = 'INVALID_BIRTHDAY',
  INVALID_6_DIGITS = 'INVALID_6_DIGITS',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'LOGIN_FAILURE_INVALID_CREDENTIALS',
  SIGNUP_FAILURE_EMAIL_EXISTS = '40133439',
  SIGNUP_FAILURE_PHONE_EXISTS = '60067008',
  SIGNUP_FAILURE_INCORRECT_PHONE_CODE = 'SIGNUP_FAILURE_INCORRECT_PHONE_CODE',
  USER_UNAUTHORIZED = 'USER_UNAUTHORIZED',
  USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED',
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
  export class SignupFailureIncorrectPhoneCode
    extends Error
    implements IDomainError<IAuthErrorCodes, IAuthErrorMessage>
  {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.SIGNUP_FAILURE_INCORRECT_PHONE_CODE;
      this.code = IAuthErrorCodes.SIGNUP_FAILURE_INCORRECT_PHONE_CODE;
      this.cause = cause;
    }
  }
  export class UserUnauthorized extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IAuthErrorMessage.USER_UNAUTHORIZED;
      this.code = IAuthErrorCodes.USER_UNAUTHORIZED;
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
}
