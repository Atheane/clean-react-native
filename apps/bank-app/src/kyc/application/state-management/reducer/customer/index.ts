import { ICustomerState } from '../../state/customer';
import { ICustomerTypes, ICustomerActions } from '../../../commands/customer';
import { IKycStackPages } from '../../../../../shared/presentation/types';

const initialState: ICustomerState = {
  pending: false,
  customer: null,
  initRoute: IKycStackPages.INIT,
};

export const customerReducer = (state = initialState, action: ICustomerActions) => {
  let newState: ICustomerState;
  switch (action.type) {
    case ICustomerTypes.CHECK_CUSTOMER_STATUS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICustomerTypes.CUSTOMER_STATUS_CHECKED:
      newState = {
        ...state,
        pending: false,
        customer: action.payload.customer,
        initRoute: action.payload.initRoute,
      };
      return newState;
    case ICustomerTypes.CUSTOMER_DOCUMENTS_UPDATED:
      newState = {
        ...state,
        pending: false,
        customer: action.payload.customer,
      };
      return newState;
    case ICustomerTypes.INITIALIZE_KYC:
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
