import { ITransactionsTypes, ITransactionsActions } from '../../commands';
import { ITransactionsState } from '../state';

const initialState: ITransactionsState = {
  pending: false,
  transactions: null,
  transaction: null,
  error: null,
};

export const transactionsReducer = (state = initialState, action: ITransactionsActions) => {
  let newState: ITransactionsState;
  switch (action.type) {
    case ITransactionsTypes.LIST_TRANSACTIONS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_PAYOUT:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_TRANSFER:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_TRANSACTION_WAITING:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.TRANSACTIONS_LISTED:
      newState = {
        ...state,
        pending: false,
        transactions: action.payload,
      };
      return newState;
    case ITransactionsTypes.PAYOUT_SUCCEDED:
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSFER_SUCCEDED:
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSACTION_WAITING_SUCCEDED:
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSACTION_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST:
      newState = {
        ...state,
        pending: false,
        transactions: null,
      };
      return newState;
    case ITransactionsTypes.INIT_TRANSACTION:
      newState = {
        ...state,
        pending: false,
        transaction: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
