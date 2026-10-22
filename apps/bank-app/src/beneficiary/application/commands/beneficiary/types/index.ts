import { IDomainError } from '@clean-rn/ddd';
import {
  IBeneficiary,
  IBeneficiaryAddCommand,
  IBeneficiaryDeleteCommand,
  IBeneficiaryErrorMessage,
  IBeneficiaryErrorCodes,
} from '@clean-rn/beneficiary/domain';

export enum IBeneficiaryTypes {
  BENEFICIARY_ADD = 'BENEFICIARY_ADD',
  BENEFICIARY_ADD_FAILED = 'BENEFICIARY_ADD_FAILED',
  BENEFICIARY_DELETE = 'BENEFICIARY_DELETE',
  BENEFICIARY_DELETE_FAILED = 'BENEFICIARY_DELETE_FAILED',
  BENEFICIARY_LIST = 'BENEFICIARY_LIST',
  BENEFICIARY_LIST_DONE = 'BENEFICIARY_LIST_DONE',
  BENEFICIARY_LIST_INIT = 'INITIALIZE_BENEFICIARY_LIST',
}

export type IBeneficiaryAdd = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_ADD;
  payload: IBeneficiaryAddCommand;
};

export type IBeneficiaryAddFailed = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_ADD_FAILED;
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>;
};

export type IBeneficiaryDelete = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_DELETE;
  payload: IBeneficiaryDeleteCommand;
};

export type IBeneficiaryDeleteFailed = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_DELETE_FAILED;
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>;
};

export type IBeneficiaryList = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_LIST;
};

export type IBeneficiaryListDone = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_LIST_DONE;
  payload: IBeneficiary[];
};

export type IBeneficiaryListInit = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_LIST_INIT;
};

export type IBeneficiaryActions =
  | IBeneficiaryAdd
  | IBeneficiaryAddFailed
  | IBeneficiaryDelete
  | IBeneficiaryDeleteFailed
  | IBeneficiaryList
  | IBeneficiaryListDone
  | IBeneficiaryListInit;
