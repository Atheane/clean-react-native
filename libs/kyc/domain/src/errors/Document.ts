/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IDocumentErrorMessage {
  MISSING_RECTO = 'Missing recto',
  MISSING_VERSO = 'Missing verso',
  DOCUMENT_NOT_READY = 'Document is not ready',
  INVALID_DOCUMENT_TYPE = 'Invalid document type',
  DOCUMENT_TOO_LARGE = 'Document is too large',
  REFUSED = 'Document refused',
  OUT_OF_SCOPE = 'Document out of scope',
  EXPIRED = 'Document expired',
  ILLEGIBLE = 'Document illegible',
  TRUNCATED_DOC = 'Document truncated',
  TRUNCATED = 'Truncated',
  INCOHERENT = 'Document incoherent',
  OTHER = 'Other error',
}

export enum IDocumentErrorCodes {
  MISSING_RECTO = 'MISSING_RECTO',
  MISSING_VERSO = 'MISSING_VERSO',
  DOCUMENT_NOT_READY = 'DOCUMENT_NOT_READY',
  INVALID_DOCUMENT_TYPE = 'INVALID_DOCUMENT_TYPE',
  DOCUMENT_TOO_LARGE = 'DOCUMENT_TOO_LARGE',
  REFUSED = 'REFUSED',
  OUT_OF_SCOPE = 'OUT_OF_SCOPE',
  EXPIRED = 'EXPIRED',
  ILLEGIBLE = 'ILLEGIBLE',
  TRUNCATED_DOC = 'TRUNCATED_DOC',
  TRUNCATED = 'TRUNCATED',
  INCOHERENT = 'INCOHERENT',
  OTHER = 'OTHER',
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
  export class Refused extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.REFUSED;
      this.code = IDocumentErrorCodes.REFUSED;
      this.cause = cause;
    }
  }
  export class OutOfScope extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.OUT_OF_SCOPE;
      this.code = IDocumentErrorCodes.OUT_OF_SCOPE;
      this.cause = cause;
    }
  }
  export class Expired extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.EXPIRED;
      this.code = IDocumentErrorCodes.EXPIRED;
      this.cause = cause;
    }
  }
  export class Illegible extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.ILLEGIBLE;
      this.code = IDocumentErrorCodes.ILLEGIBLE;
      this.cause = cause;
    }
  }
  export class Truncated extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.TRUNCATED;
      this.code = IDocumentErrorCodes.TRUNCATED;
      this.cause = cause;
    }
  }
  export class Incoherent extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.INCOHERENT;
      this.code = IDocumentErrorCodes.INCOHERENT;
      this.cause = cause;
    }
  }
  export class Other extends Error implements IDomainError<IDocumentErrorCodes, IDocumentErrorMessage> {
    code: IDocumentErrorCodes;
    message: IDocumentErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = IDocumentErrorMessage.OTHER;
      this.code = IDocumentErrorCodes.OTHER;
      this.cause = cause;
    }
  }
}
