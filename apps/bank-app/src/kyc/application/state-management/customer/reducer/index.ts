import { Logger } from '@clean-rn/logger';

import { IKycTypes, IKycActions } from '../../../commands/customer';
import { IKycState } from '../state';

const initialState: IKycState = {
  pending: false,
  documents: [],
  status: 'PENDING',
};

export const kycReducer = (state = initialState, action: IKycActions) => {
  const logger = Logger.getInstance();
  let newState: IKycState;
  switch (action.type) {
    case IKycTypes.CHECK_CUSTOMER_STATUS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IKycTypes.CUSTOMER_STATUS_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        status: action.payload.customer.properties.status ?? 'PENDING',
      };
      return newState;
    case IKycTypes.INITIALIZE_KYC:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        documents: [],
        status: 'PENDING',
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
