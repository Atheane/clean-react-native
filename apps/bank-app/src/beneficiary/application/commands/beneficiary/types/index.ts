import { IDomainError } from '@clean-rn/ddd';
import {
  IBeneficiary,
  IAddBeneficiaryCommand,
  IDeleteBeneficiaryCommand,
  IBeneficiaryErrorMessage,
  IBeneficiaryErrorCodes,
} from '@clean-rn/beneficiary/domain';

export enum IBeneficiaryTypes {
  // commands
  ADD_BENEFICIARY = 'ADD_BENEFICIARY',
  DELETE_BENEFICIARY = 'DELETE_BENEFICIARY',
  LIST_BENEFICIARIES = 'LIST_BENEFICIARIES',
  INIT_BENEFICIARY = 'INIT_BENEFICIARY',
  CHANGE_TAB = 'CHANGE_TAB',
  // domainEvents
  BENEFICIARY_ADDED = 'BENEFICIARY_ADDED',
  BENEFICIARY_ADD_FAILED = 'BENEFICIARY_ADD_FAILED',
  BENEFICIARY_DELETED = 'BENEFICIARY_DELETED',
  BENEFICIARY_DELETE_FAILED = 'BENEFICIARY_DELETE_FAILED',
  BENEFICIARIES_LISTED = 'BENEFICIARIES_LISTED',
}

// commands
export type IAddBeneficiary = {
  type: typeof IBeneficiaryTypes.ADD_BENEFICIARY;
  payload: IAddBeneficiaryCommand;
};
export type IDeleteBeneficiary = {
  type: typeof IBeneficiaryTypes.DELETE_BENEFICIARY;
  payload: IDeleteBeneficiaryCommand;
};
export type IListBeneficiary = {
  type: typeof IBeneficiaryTypes.LIST_BENEFICIARIES;
};
export type IInitBeneficiary = {
  type: typeof IBeneficiaryTypes.INIT_BENEFICIARY;
};

export type IChangeTab = {
  type: typeof IBeneficiaryTypes.CHANGE_TAB;
  payload: {
    idx: number;
  };
};

// domain Events
export type IBeneficiaryAdded = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_ADDED;
  payload: IBeneficiary;
};

export type IBeneficiaryAddFailed = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_ADD_FAILED;
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>;
};

export type IBeneficiaryDeleted = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_DELETED;
  payload: IBeneficiary;
};

export type IBeneficiaryDeleteFailed = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_DELETE_FAILED;
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>;
};

export type IBeneficiaryListed = {
  type: typeof IBeneficiaryTypes.BENEFICIARIES_LISTED;
  payload: IBeneficiary[];
};

export type IBeneficiaryActions =
  | IAddBeneficiary
  | IDeleteBeneficiary
  | IListBeneficiary
  | IInitBeneficiary
  | IChangeTab
  | IBeneficiaryAdded
  | IBeneficiaryAddFailed
  | IBeneficiaryDeleted
  | IBeneficiaryDeleteFailed
  | IBeneficiaryListed;
