/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IBeneficiaryErrorMessage {
  INVALID_IBAN = 'Invalid IBAN',
  INVALID_BIC = 'Invalid BIC',
  INVALID_NAME = 'Invalid name format',
}

export enum IBeneficiaryErrorCodes {
  INVALID_IBAN = 'INVALID_IBAN',
  INVALID_BIC = 'INVALID_BIC',
  INVALID_NAME = 'INVALID_NAME',
}

export namespace BeneficiaryError {
  export class InvalidIBAN
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.INVALID_IBAN;
      this.code = IBeneficiaryErrorCodes.INVALID_IBAN;
      this.cause = cause;
    }
  }
  export class InvalidBIC
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.INVALID_BIC;
      this.code = IBeneficiaryErrorCodes.INVALID_BIC;
      this.cause = cause;
    }
  }
  export class InvalidName
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.INVALID_NAME;
      this.code = IBeneficiaryErrorCodes.INVALID_NAME;
      this.cause = cause;
    }
  }
}
