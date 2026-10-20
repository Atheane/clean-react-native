/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICustomerErrorMessage {
  MISSING_KYC_DOCUMENTS = 'Missing Kyc documents',
}

export enum ICustomerErrorCodes {
  MISSING_KYC_DOCUMENTS = 'MISSING_KYC_DOCUMENTS',
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
}
