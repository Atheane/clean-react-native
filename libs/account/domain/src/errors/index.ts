/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IAccountErrorMessage {
  INVALID_IBAN = 'Invalid IBAN',
  INVALID_BIC = 'Invalid BIC',
  UNKNOWN_TRANSACTION_TYPE = 'Unknown transaction type',
  INVALID_TRANSACTION_VALUE = 'Invalid transaction value',
}

export enum IAccountErrorCodes {
  INVALID_IBAN = 'INVALID_IBAN',
  INVALID_BIC = 'INVALID_BIC',
  UNKNOWN_TRANSACTION_TYPE = 'UNKNOWN_TRANSACTION_TYPE',
  INVALID_TRANSACTION_VALUE = 'INVALID_TRANSACTION_VALUE',
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
  export class UnknownTransactionType
    extends Error
    implements IDomainError<IAccountErrorCodes, IAccountErrorMessage>
  {
    code: IAccountErrorCodes;
    message: IAccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAccountErrorMessage.UNKNOWN_TRANSACTION_TYPE;
      this.code = IAccountErrorCodes.UNKNOWN_TRANSACTION_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidTransaction
    extends Error
    implements IDomainError<IAccountErrorCodes, IAccountErrorMessage>
  {
    code: IAccountErrorCodes;
    message: IAccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IAccountErrorMessage.INVALID_TRANSACTION_VALUE;
      this.code = IAccountErrorCodes.INVALID_TRANSACTION_VALUE;
      this.cause = cause;
    }
  }
}
