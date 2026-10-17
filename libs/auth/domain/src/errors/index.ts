/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum AuthErrorMessage {
  INVALID_EMAIL = 'Invalid email',
  INVALID_PASSWORD = 'Invalid password',
  INVALID_PHONE = 'Invalid phone',
  INVALID_COUNTRY = 'Invalid country',
  UNAVAILABLE_COUNTRY = 'Unavailable country',
  INVALID_BIRTHDAY = 'Invalid birthday',
  INVALID_6_DIGITS = 'Invalid 6 digits',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'Login Failure, invalid credentials',
  LOGIN_FAILURE_ONE_EMAIL_BY_PHONE = 'Login Failure, only one email by phone',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'Signup failure, email already exists',
  SIGNUP_FAILURE_PHONE_EXISTS = 'Signup failure, phone already exists',
  SIGNUP_FAILURE_SEND_PHONE_VALIDATION = 'Signup failure, no phone validation code sent',
  SIGNUP_FAILURE_INVALID_PHONE_CODE = 'Signup failure, invalid phone code',
  SIGNUP_FAILURE_SECURITY_PIN_MISMATCH = 'Signup failure, security pin mismatch',
  USER_UNAUTHORIZED = 'User unauthorized',
}

export enum AuthErrorCodes {
  INVALID_EMAIL = 'AUTH_DOMAIN_0',
  INVALID_PASSWORD = 'AUTH_DOMAIN_1',
  INVALID_PHONE = 'AUTH_DOMAIN_2',
  INVALID_COUNTRY = 'AUTH_DOMAIN_3',
  UNAVAILABLE_COUNTRY = 'AUTH_DOMAIN_4',
  INVALID_BIRTHDAY = 'AUTH_DOMAIN_5',
  INVALID_6_DIGITS = 'AUTH_DOMAIN_6',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'AUTH_DOMAIN_7',
  LOGIN_FAILURE_ONE_EMAIL_BY_PHONE = 'AUTH_DOMAIN_8',
  SIGNUP_FAILURE_EMAIL_EXISTS = 'AUTH_DOMAIN_9',
  SIGNUP_FAILURE_PHONE_EXISTS = 'AUTH_DOMAIN_10',
  SIGNUP_FAILURE_SEND_PHONE_VALIDATION = 'AUTH_DOMAIN_11',
  SIGNUP_FAILURE_INVALID_PHONE_CODE = 'AUTH_DOMAIN_12',
  SIGNUP_FAILURE_SECURITY_PIN_MISMATCH = 'AUTH_DOMAIN_13',
  USER_UNAUTHORIZED = 'AUTH_DOMAIN_14',
}

export namespace AuthError {
  export class InvalidEmail extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_EMAIL;
      this.code = AuthErrorCodes.INVALID_EMAIL;
      this.cause = cause;
    }
  }
  export class InvalidPassword extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_PASSWORD;
      this.code = AuthErrorCodes.INVALID_PASSWORD;
      this.cause = cause;
    }
  }
  export class InvalidPhone extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_PHONE;
      this.code = AuthErrorCodes.INVALID_PHONE;
      this.cause = cause;
    }
  }
  export class InvalidCountry extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_COUNTRY;
      this.code = AuthErrorCodes.INVALID_COUNTRY;
      this.cause = cause;
    }
  }
  export class UnavailableCountry extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.UNAVAILABLE_COUNTRY;
      this.code = AuthErrorCodes.UNAVAILABLE_COUNTRY;
      this.cause = cause;
    }
  }
  export class InvalidBirthday extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_BIRTHDAY;
      this.code = AuthErrorCodes.INVALID_BIRTHDAY;
      this.cause = cause;
    }
  }
  export class Invalid6Digits extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.INVALID_6_DIGITS;
      this.code = AuthErrorCodes.INVALID_6_DIGITS;
      this.cause = cause;
    }
  }
  export class LoginFailureInvalidCredentials
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.LOGIN_FAILURE_INVALID_CREDENTIALS;
      this.code = AuthErrorCodes.LOGIN_FAILURE_INVALID_CREDENTIALS;
      this.cause = cause;
    }
  }
  export class LoginFailureOneEmailByPhone
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.LOGIN_FAILURE_ONE_EMAIL_BY_PHONE;
      this.code = AuthErrorCodes.LOGIN_FAILURE_ONE_EMAIL_BY_PHONE;
      this.cause = cause;
    }
  }
  export class SignupFailureEmailExists
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.code = AuthErrorCodes.SIGNUP_FAILURE_EMAIL_EXISTS;
      this.cause = cause;
    }
  }
  export class SignupFailurePhoneExists
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.SIGNUP_FAILURE_PHONE_EXISTS;
      this.code = AuthErrorCodes.SIGNUP_FAILURE_PHONE_EXISTS;
      this.cause = cause;
    }
  }
  export class SignupFailureSendPhoneValidation
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.SIGNUP_FAILURE_SEND_PHONE_VALIDATION;
      this.code = AuthErrorCodes.SIGNUP_FAILURE_SEND_PHONE_VALIDATION;
      this.cause = cause;
    }
  }
  export class SignupFailureInvalidPhoneCode
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.SIGNUP_FAILURE_SEND_PHONE_VALIDATION;
      this.code = AuthErrorCodes.SIGNUP_FAILURE_SEND_PHONE_VALIDATION;
      this.cause = cause;
    }
  }
  export class SignupFailureSecurityPinMismatch
    extends Error
    implements IDomainError<AuthErrorCodes, AuthErrorMessage>
  {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.SIGNUP_FAILURE_SECURITY_PIN_MISMATCH;
      this.code = AuthErrorCodes.SIGNUP_FAILURE_SECURITY_PIN_MISMATCH;
      this.cause = cause;
    }
  }
  export class UserUnauthorized extends Error implements IDomainError<AuthErrorCodes, AuthErrorMessage> {
    code: AuthErrorCodes;
    message: AuthErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = AuthErrorMessage.USER_UNAUTHORIZED;
      this.code = AuthErrorCodes.USER_UNAUTHORIZED;
      this.cause = cause;
    }
  }
}
