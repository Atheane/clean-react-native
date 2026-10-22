/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ITransactionErrorCodes {
  UNKNOWN_TRANSACTION_TYPE = 'UNKNOWN_TRANSACTION_TYPE',
  INVALID_TRANSACTION_VALUE = 'INVALID_TRANSACTION_VALUE',
}

export enum ITransactionErrorMessage {
  UNKNOWN_TRANSACTION_TYPE = 'Unknown transaction type',
  INVALID_TRANSACTION_VALUE = 'Invalid transaction value',
}

export namespace TransactionError {
  export class UnknownTransactionType
    extends Error
    implements IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>
  {
    code: ITransactionErrorCodes;
    message: ITransactionErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = ITransactionErrorMessage.UNKNOWN_TRANSACTION_TYPE;
      this.code = ITransactionErrorCodes.UNKNOWN_TRANSACTION_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidTransactionAmount
    extends Error
    implements IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>
  {
    code: ITransactionErrorCodes;
    message: ITransactionErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = ITransactionErrorMessage.INVALID_TRANSACTION_VALUE;
      this.code = ITransactionErrorCodes.INVALID_TRANSACTION_VALUE;
      this.cause = cause;
    }
  }
}
