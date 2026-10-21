/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICustomerErrorMessage {
  MISSING_KYC_DOCUMENTS = 'Missing Kyc documents',
  KYC_REFUSED = 'Kyc refused',
}

export enum ICustomerErrorCodes {
  MISSING_KYC_DOCUMENTS = 'MISSING_KYC_DOCUMENTS',
  KYC_REFUSED = 'KYC_REFUSED',
}

export namespace CustomerError {
  export class MissingKycDocuments
    extends Error
    implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
  {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.MISSING_KYC_DOCUMENTS;
      this.code = ICustomerErrorCodes.MISSING_KYC_DOCUMENTS;
      this.cause = cause;
    }
  }
  export class KycRefused extends Error implements IDomainError<ICustomerErrorCodes, ICustomerErrorMessage> {
    code: ICustomerErrorCodes;
    message: ICustomerErrorMessage;
    cause?: unknown;
    constructor(cause?: unknown) {
      super();
      this.message = ICustomerErrorMessage.KYC_REFUSED;
      this.code = ICustomerErrorCodes.KYC_REFUSED;
      this.cause = cause;
    }
  }
}
