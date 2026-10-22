import { Logger } from '@clean-rn/logger';

import { IBeneficiaryTypes, IBeneficiaryActions } from '../../../commands/beneficiary';
import { IBeneficiaryState } from '../state';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';

const initialState: IBeneficiaryState = {
  pending: false,
  beneficiaries: null,
  error: null,
};

const inplaceSortByName = (contacts: any[]) => {
  contacts.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase(); // ignore upper and lowercase
    const nameB = b.name.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const beneficiaryReducer = (state = initialState, action: IBeneficiaryActions) => {
  const logger = Logger.getInstance();
  let newState: IBeneficiaryState;
  let beneficiaries: IBeneficiary[];

  switch (action.type) {
    case IBeneficiaryTypes.ADD_BENEFICIARY:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.DELETE_BENEFICIARY:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.LIST_BENEFICIARIES:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.INIT_BENEFICIARY:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        beneficiaries: null,
        error: null,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_ADDED:
      logger.debug(action.type);
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
