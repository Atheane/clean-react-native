import { Logger } from '@clean-rn/logger';

import { IKycTypes, IKycActions } from '../../commands';
import { IKycState } from '../state';

const initialState: IKycState = {
  pending: false,
  customer: null,
  initRoute: null,
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
        customer: action.payload.customer,
      };
      return newState;
    case IKycTypes.KYC_ROUTE_INITIALIZED:
      logger.debug(action.type);
      newState = {
        ...state,
        initRoute: action.payload.initRoute,
      };
      return newState;
    case IKycTypes.INITIALIZE_KYC:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        customer: null,
        initRoute: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
