import { IDomainError } from '@clean-rn/ddd';
import {
  IBeneficiary,
  IBeneficiaryAddCommand,
  IBeneficiaryErrorMessage,
  IBeneficiaryErrorCodes,
} from '@clean-rn/beneficiary/domain';

export enum IBeneficiaryTypes {
  BENEFICIARY_ADD = 'BENEFICIARY_ADD',
  BENEFICIARY_ADD_FAILED = 'BENEFICIARY_ADD_FAILED',
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
  | IBeneficiaryList
  | IBeneficiaryListDone
  | IBeneficiaryListInit;
