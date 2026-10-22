import { Logger } from '@clean-rn/logger';
import { inplaceSortByName } from '@clean-rn/utils';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { IBeneficiaryTypes, IBeneficiaryActions } from '../../../commands/beneficiary';
import { IBeneficiaryState } from '../state';

const initialState: IBeneficiaryState = {
  pending: false,
  beneficiaries: null,
  selectedBeneficiary: null,
  error: null,
};

export const beneficiaryReducer = (state = initialState, action: IBeneficiaryActions) => {
  const logger = Logger.getInstance();
  let newState: IBeneficiaryState;
  let beneficiaries: IBeneficiary[];
  logger.debug(action.type);

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
    case IBeneficiaryTypes.INIT_BENEFICIARY:
      newState = {
        ...state,
        pending: false,
        beneficiaries: null,
        error: null,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_SELECTED:
      logger.debug(action.type);
      newState = {
        ...state,
        selectedBeneficiary: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_ADDED:
      logger.debug(action.type);
      console.log('-----------', state.beneficiaries);
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
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_DELETED:
      logger.debug(action.type);
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
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARIES_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        beneficiaries: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
