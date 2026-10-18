/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

import { IInfraError } from '@clean-rn/ddd';

enum IStorageErrorMessages {
  STORAGE_SET_ERROR = 'Async Storage SetItem Error',
  STORAGE_GET_ERROR = 'Async Storage GetItem Error',
}

export enum IStorageErrorCodes {
  STORAGE_SET_ERROR = 'SHARED_INFRA_STORAGE_0',
  STORAGE_GET_ERROR = 'SHARED_INFRA_STORAGE_1',
}

export namespace StorageError {
  export class SetError extends Error implements IInfraError {
    code: IStorageErrorCodes;
    message: IStorageErrorMessages;
    cause?: any;

    constructor(cause?: any) {
      super();
      this.message = IStorageErrorMessages.STORAGE_SET_ERROR;
      this.code = IStorageErrorCodes.STORAGE_SET_ERROR;
      this.cause = cause?.message || cause;
    }
  }
  export class GetError extends Error implements IInfraError {
    code: IStorageErrorCodes;
    message: IStorageErrorMessages;
    cause?: any;
    constructor(cause?: any) {
      super();
      this.message = IStorageErrorMessages.STORAGE_GET_ERROR;
      this.code = IStorageErrorCodes.STORAGE_GET_ERROR;
      this.cause = cause?.message || cause;
    }
  }
}
