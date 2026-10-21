import { Logger } from '@clean-rn/logger';

import { IBeneficiaryTypes, IBeneficiaryActions } from '../../../commands/beneficiary';
import { IBeneficiaryState } from '../state';

const initialState: IBeneficiaryState = {
  pending: false,
  beneficiaries: null,
};

export const beneficiaryReducer = (state = initialState, action: IBeneficiaryActions) => {
  const logger = Logger.getInstance();
  let newState: IBeneficiaryState;
  switch (action.type) {
    case IBeneficiaryTypes.LIST_BENEFICIARY:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IBeneficiaryTypes.BENEFICIARY_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        beneficiaries: action.payload,
      };
      return newState;
    case IBeneficiaryTypes.INITIALIZE_BENEFICIARY_LIST:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        beneficiaries: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
