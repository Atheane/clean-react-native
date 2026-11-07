import { ICustomerState } from '../state';
import { ICustomerTypes, ICustomerActions } from '../../commands';

const initialState: ICustomerState = {
  pending: false,
  customer: null,
  error: null,
};

export const customerReducer = (state = initialState, action: ICustomerActions): ICustomerState => {
  let newState: ICustomerState;
  switch (action.type) {
    case ICustomerTypes.CHECK_CUSTOMER_STATUS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.CREATE_DOCUMENT:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.ADD_PAGE:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.SEND_DOCUMENT:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.KYC_DOMAIN_EVENT:
      newState = {
        ...state,
        pending: false,
        customer: action.payload.customer,
        error: null,
      };
      return newState;
    case ICustomerTypes.INITIALIZE_CUSTOMER:
      newState = {
        ...initialState,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
