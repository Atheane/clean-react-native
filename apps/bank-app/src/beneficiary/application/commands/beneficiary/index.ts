import { IDomainError } from '@clean-rn/ddd';
import {
  IBeneficiary,
  IBeneficiaryAddCommand,
  IBeneficiaryDeleteCommand,
  IBeneficiaryErrorMessage,
  IBeneficiaryErrorCodes,
} from '@clean-rn/beneficiary/domain';
//
import {
  IBeneficiaryTypes,
  IBeneficiaryAdd,
  IBeneficiaryAddFailed,
  IBeneficiaryDelete,
  IBeneficiaryDeleteFailed,
  IBeneficiaryList,
  IBeneficiaryListDone,
  IBeneficiaryListInit,
  IBeneficiaryActions,
} from './types';

// commands
export const beneficiaryAdd = (payload: IBeneficiaryAddCommand): IBeneficiaryAdd => ({
  type: IBeneficiaryTypes.BENEFICIARY_ADD,
  payload,
});

export const beneficiaryAddFailure = (
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>,
): IBeneficiaryAddFailed => ({
  type: IBeneficiaryTypes.BENEFICIARY_ADD_FAILED,
  payload,
});

export const beneficiaryDelete = (payload: IBeneficiaryDeleteCommand): IBeneficiaryDelete => ({
  type: IBeneficiaryTypes.BENEFICIARY_DELETE,
  payload,
});

export const beneficiaryDeleteFailure = (
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>,
): IBeneficiaryDeleteFailed => ({
  type: IBeneficiaryTypes.BENEFICIARY_DELETE_FAILED,
  payload,
});

export const beneficiaryList = (): IBeneficiaryList => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST,
});

export const beneficiaryListInit = (): IBeneficiaryListInit => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST_INIT,
});

// domainEvents
export const beneficiaryListed = (payload: IBeneficiary[]): IBeneficiaryListDone => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST_DONE,
  payload,
});

export { IBeneficiaryTypes, IBeneficiaryActions };
