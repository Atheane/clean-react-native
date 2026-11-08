import { ITransactionsTypes, ITransactionsActions } from '../../commands';
import { ITransactionsState } from '../state';

const initialState: ITransactionsState = {
  pending: false,
  transactions: null,
  error: null,
};

export const transactionsReducer = (state = initialState, action: ITransactionsActions) => {
  let newState: ITransactionsState;
  switch (action.type) {
    case ITransactionsTypes.LIST_TRANSACTIONS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ITransactionsTypes.TRANSACTIONS_LISTED:
      newState = {
        ...state,
        pending: false,
        transactions: action.payload,
        error: null,
      };
      return newState;
    case ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST:
      newState = {
        ...state,
        pending: false,
        transactions: null,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
