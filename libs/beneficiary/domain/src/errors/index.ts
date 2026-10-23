/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IBeneficiaryErrorMessage {
  INVALID_IBAN = 'Invalid IBAN',
  INVALID_BIC = 'Invalid BIC',
  INVALID_NAME = 'Invalid name format',
  BENEFICIARY_ALREADY_EXISTS = 'Beneficiary already exists',
  BENEFICIARY_UNKNOWN = 'Beneficiary unknown',
  BENEFICIARY_MUST_DIFFER_FROM_ACCOUNT = 'Beneficiary must differ from account',
}

export enum IBeneficiaryErrorCodes {
  INVALID_IBAN = 'INVALID_IBAN',
  INVALID_BIC = 'INVALID_BIC',
  INVALID_NAME = 'INVALID_NAME',
  BENEFICIARY_ALREADY_EXISTS = 'BENEFICIARY_ALREADY_EXISTS',
  BENEFICIARY_UNKNOWN = 'BENEFICIARY_UNKNOWN',
  BENEFICIARY_MUST_DIFFER_FROM_ACCOUNT = 'BENEFICIARY_MUST_DIFFER_FROM_ACCOUNT',
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
  export class BeneficiaryAlreadyExists
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.BENEFICIARY_ALREADY_EXISTS;
      this.code = IBeneficiaryErrorCodes.BENEFICIARY_ALREADY_EXISTS;
      this.cause = cause;
    }
  }
  export class BeneficiaryUnknown
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.BENEFICIARY_UNKNOWN;
      this.code = IBeneficiaryErrorCodes.BENEFICIARY_UNKNOWN;
      this.cause = cause;
    }
  }
  export class BeneficiaryMustDifferFromAccount
    extends Error
    implements IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
  {
    code: IBeneficiaryErrorCodes;
    message: IBeneficiaryErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IBeneficiaryErrorMessage.BENEFICIARY_MUST_DIFFER_FROM_ACCOUNT;
      this.code = IBeneficiaryErrorCodes.BENEFICIARY_MUST_DIFFER_FROM_ACCOUNT;
      this.cause = cause;
    }
  }
}
