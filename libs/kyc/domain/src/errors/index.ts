/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICustomerErrorMessage {
  MAX_PAGES_REACHED = 'Maximum number of pages reached',
  MISSING_RECTO = 'Missing recto for this document type',
  MISSING_VERSO = 'Missing verso for this document type',
  INVALID_DOCUMENT_PROPERTIES = 'Invalid document properties',
  INVALID_DOCUMENT_TYPE = 'Invalid document type',
}

export enum ICustomerErrorCodes {
  MAX_PAGES_REACHED = 'MAX_PAGES_REACHED',
  MISSING_RECTO = 'MISSING_RECTO',
  MISSING_VERSO = 'MISSING_VERSO',
  INVALID_DOCUMENT_PROPERTIES = 'INVALID_DOCUMENT_PROPERTIES',
  INVALID_DOCUMENT_TYPE = 'INVALID_DOCUMENT_TYPE',
}

export namespace CustomerError {
  export class MaxPagesReached
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.MAX_PAGES_REACHED;
      this.code = ICustomerErrorCodes.MAX_PAGES_REACHED;
      this.cause = cause;
    }
  }
  export class MissingRecto
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.MISSING_RECTO;
      this.code = ICustomerErrorCodes.MISSING_RECTO;
      this.cause = cause;
    }
  }
  export class MissingVerso
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.MISSING_VERSO;
      this.code = ICustomerErrorCodes.MISSING_VERSO;
      this.cause = cause;
    }
  }
  export class InvalidDocumentType
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.INVALID_DOCUMENT_TYPE;
      this.code = ICustomerErrorCodes.INVALID_DOCUMENT_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidDocumentProperties
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.INVALID_DOCUMENT_PROPERTIES;
      this.code = ICustomerErrorCodes.INVALID_DOCUMENT_PROPERTIES;
      this.cause = cause;
    }
  }
}
