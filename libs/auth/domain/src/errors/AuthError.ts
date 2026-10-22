/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IAuthErrorCodes {
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  LOGIN_FAILURE_USER_NOT_FOUND = 'LOGIN_FAILURE_USER_NOT_FOUND',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'LOGIN_FAILURE_INVALID_CREDENTIALS',
  LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED = 'LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED',
  USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED', //login expired
}

export enum IAuthErrorMessage {
  INVALID_EMAIL = 'Invalid email',
  INVALID_PASSWORD = 'Invalid password',
  LOGIN_FAILURE_USER_NOT_FOUND = 'Login failure, user account does not exist',
  LOGIN_FAILURE_USER_PHONE_NOT_VALIDATED = 'Login failure, user phone is not validated yet',
  LOGIN_FAILURE_INVALID_CREDENTIALS = 'Login failure, invalid email or password',
  USER_UNAUTHENTICATED = 'User unauthenticated', //login expired
}

export namespace AuthError {
  export class InvalidEmail extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IAuthErrorCodes.INVALID_EMAIL;
      this.message = IAuthErrorMessage.INVALID_EMAIL;
      this.cause = cause;
    }
  }
  export class InvalidPassword extends Error implements IDomainError<IAuthErrorCodes, IAuthErrorMessage> {
    code: IAuthErrorCodes;
    message: IAuthErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IAuthErrorCodes.INVALID_PASSWORD;
      this.message = IAuthErrorMessage.INVALID_PASSWORD;
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
