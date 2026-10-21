/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IDocumentErrorMessage {
  MISSING_RECTO = 'Missing recto',
  MISSING_VERSO = 'Missing verso',
  DOCUMENT_NOT_READY = 'Document is not ready',
  INVALID_DOCUMENT_TYPE = 'Invalid document type',
  DOCUMENT_TOO_LARGE = 'Document is too large',
}

export enum IDocumentErrorCodes {
  MISSING_RECTO = 'MISSING_RECTO',
  MISSING_VERSO = 'MISSING_VERSO',
  DOCUMENT_NOT_READY = 'DOCUMENT_NOT_READY',
  INVALID_DOCUMENT_TYPE = 'INVALID_DOCUMENT_TYPE',
  DOCUMENT_TOO_LARGE = 'DOCUMENT_TOO_LARGE',
}

export namespace DocumentError {
  export class MissingRecto
    extends Error
    implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
  {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.MISSING_RECTO;
      this.code = IDocumentErrorCodes.MISSING_RECTO;
      this.cause = cause;
    }
  }
  export class MissingVerso
    extends Error
    implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
  {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.MISSING_VERSO;
      this.code = IDocumentErrorCodes.MISSING_VERSO;
      this.cause = cause;
    }
  }
  export class DocumentNotReady
    extends Error
    implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
  {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.DOCUMENT_NOT_READY;
      this.code = IDocumentErrorCodes.DOCUMENT_NOT_READY;
      this.cause = cause;
    }
  }
  export class InvalidDocumentType
    extends Error
    implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
  {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.INVALID_DOCUMENT_TYPE;
      this.code = IDocumentErrorCodes.INVALID_DOCUMENT_TYPE;
      this.cause = cause;
    }
  }
  export class DocumentTooLarge
    extends Error
    implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
  {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.DOCUMENT_TOO_LARGE;
      this.code = IDocumentErrorCodes.DOCUMENT_TOO_LARGE;
      this.cause = cause;
    }
  }
}
