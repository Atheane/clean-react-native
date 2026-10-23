import { inplaceSortByName } from '@clean-rn/utils';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { IBeneficiaryTypes, IBeneficiaryActions } from '../../../commands/beneficiary';
import { IBeneficiaryState } from '../state';

const initialState: IBeneficiaryState = {
  pending: false,
  beneficiaries: null,
  tab: 0,
  error: null,
};

export const beneficiaryReducer = (state = initialState, action: IBeneficiaryActions) => {
  let newState: IBeneficiaryState;
  let beneficiaries: IBeneficiary[];
  switch (action.type) {
    case IBeneficiaryTypes.ADD_BENEFICIARY:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.DELETE_BENEFICIARY:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.LIST_BENEFICIARIES:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.CHANGE_TAB:
      newState = {
        ...state,
        tab: action.payload.idx,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_ADDED:
      if (state.beneficiaries && state.beneficiaries.length > 0) {
        beneficiaries = [...state.beneficiaries, action.payload];
        inplaceSortByName(beneficiaries);
      } else {
        beneficiaries = [action.payload];
      }
      newState = {
        ...state,
        pending: false,
        beneficiaries: beneficiaries,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_ADD_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_DELETED:
      newState = {
        ...state,
        pending: false,
        beneficiaries:
          state.beneficiaries && state.beneficiaries.length > 0
            ? state.beneficiaries.filter(
                (beneficiary) => beneficiary.beneficiaryId !== action.payload.beneficiaryId,
              )
            : null,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_DELETE_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARIES_LISTED:
      newState = {
        ...state,
        pending: false,
        beneficiaries: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.INIT_BENEFICIARY:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
