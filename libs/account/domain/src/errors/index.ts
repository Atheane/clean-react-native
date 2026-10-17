/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum AccountErrorMessage {
  INVALID_IBAN = 'Invalid IBAN',
  INVALID_BIC = 'Invalid BIC',
  UNKNOWN_TRANSACTION_TYPE = 'Unknown transaction type',
  INVALID_TRANSACTION_VALUE = 'Invalid transaction value',
}

export enum AccountErrorCodes {
  INVALID_IBAN = 'ACCOUNT_DOMAIN_0',
  INVALID_BIC = 'ACCOUNT_DOMAIN_1',
  UNKNOWN_TRANSACTION_TYPE = 'ACCOUNT_DOMAIN_2',
  INVALID_TRANSACTION_VALUE = 'ACCOUNT_DOMAIN_3',
}

export namespace AccountError {
  export class InvalidIban extends Error implements IDomainError<AccountErrorCodes, AccountErrorMessage> {
    code: AccountErrorCodes;
    message: AccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AccountErrorMessage.INVALID_IBAN;
      this.code = AccountErrorCodes.INVALID_IBAN;
      this.cause = cause;
    }
  }
  export class InvalidBic extends Error implements IDomainError<AccountErrorCodes, AccountErrorMessage> {
    code: AccountErrorCodes;
    message: AccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AccountErrorMessage.INVALID_BIC;
      this.code = AccountErrorCodes.INVALID_BIC;
      this.cause = cause;
    }
  }
  export class UnknownTransactionType
    extends Error
    implements IDomainError<AccountErrorCodes, AccountErrorMessage>
  {
    code: AccountErrorCodes;
    message: AccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AccountErrorMessage.UNKNOWN_TRANSACTION_TYPE;
      this.code = AccountErrorCodes.UNKNOWN_TRANSACTION_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidTransaction
    extends Error
    implements IDomainError<AccountErrorCodes, AccountErrorMessage>
  {
    code: AccountErrorCodes;
    message: AccountErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = AccountErrorMessage.INVALID_TRANSACTION_VALUE;
      this.code = AccountErrorCodes.INVALID_TRANSACTION_VALUE;
      this.cause = cause;
    }
  }
}
