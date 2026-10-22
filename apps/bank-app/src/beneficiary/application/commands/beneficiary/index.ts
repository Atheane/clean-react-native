import { IDomainError } from '@clean-rn/ddd';
import {
  IBeneficiary,
  IAddBeneficiaryCommand,
  IDeleteBeneficiaryCommand,
  IBeneficiaryErrorMessage,
  IBeneficiaryErrorCodes,
} from '@clean-rn/beneficiary/domain';
//
import {
  IBeneficiaryTypes,
  IAddBeneficiary,
  IDeleteBeneficiary,
  IListBeneficiary,
  IInitBeneficiary,
  IBeneficiaryAddFailed,
  IBeneficiaryDeleteFailed,
  IBeneficiaryListed,
  IBeneficiaryActions,
  IBeneficiaryAdded,
  IBeneficiaryDeleted,
  ISelectBeneficiary,
  IBeneficiarySelected,
} from './types';

// commands
export const addBeneficiary = (payload: IAddBeneficiaryCommand): IAddBeneficiary => ({
  type: IBeneficiaryTypes.ADD_BENEFICIARY,
  payload,
});

export const deleteBeneficiary = (payload: IDeleteBeneficiaryCommand): IDeleteBeneficiary => ({
  type: IBeneficiaryTypes.DELETE_BENEFICIARY,
  payload,
});

export const listBeneficiaries = (): IListBeneficiary => ({
  type: IBeneficiaryTypes.LIST_BENEFICIARIES,
});

export const initBeneficiary = (): IInitBeneficiary => ({
  type: IBeneficiaryTypes.INIT_BENEFICIARY,
});

export const selectBeneficiary = (payload: { beneficiaryId: number }): ISelectBeneficiary => ({
  type: IBeneficiaryTypes.SELECT_BENEFICIARY,
  payload,
});

// domainEvents

export const beneficiaryAdded = (payload: IBeneficiary): IBeneficiaryAdded => ({
  type: IBeneficiaryTypes.BENEFICIARY_ADDED,
  payload,
});

export const beneficiaryAddFailed = (
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>,
): IBeneficiaryAddFailed => ({
  type: IBeneficiaryTypes.BENEFICIARY_ADD_FAILED,
  payload,
});

export const beneficiaryDeleted = (payload: IBeneficiary): IBeneficiaryDeleted => ({
  type: IBeneficiaryTypes.BENEFICIARY_DELETED,
  payload,
});

export const beneficiaryDeleteFailed = (
  payload: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>,
): IBeneficiaryDeleteFailed => ({
  type: IBeneficiaryTypes.BENEFICIARY_DELETE_FAILED,
  payload,
});

export const beneficiariesListed = (payload: IBeneficiary[]): IBeneficiaryListed => ({
  type: IBeneficiaryTypes.BENEFICIARIES_LISTED,
  payload,
});

export const beneficiarySelected = (payload: IBeneficiary): IBeneficiarySelected => ({
  type: IBeneficiaryTypes.BENEFICIARY_SELECTED,
  payload,
});

export { IBeneficiaryTypes, IBeneficiaryActions };
