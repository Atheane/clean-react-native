import { Logger } from '@clean-rn/logger';

import { ICustomerState } from '../../state/customer';
import { ICustomerTypes, ICustomerActions } from '../../../commands/customer';

const initialState: ICustomerState = {
  pending: false,
  customer: null,
};

export const customerReducer = (state = initialState, action: ICustomerActions) => {
  const logger = Logger.getInstance();
  let newState: ICustomerState;
  switch (action.type) {
    case ICustomerTypes.CHECK_CUSTOMER_STATUS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.CUSTOMER_STATUS_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        customer: action.payload.customer,
      };
      return newState;
    case ICustomerTypes.INITIALIZE_KYC:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        customer: null,
      };
      return newState;
    case ICustomerTypes.CUSTOMER_DOCUMENTS_UPDATED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        customer: action.payload.customer,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
