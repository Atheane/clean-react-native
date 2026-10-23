import { Logger } from '@clean-rn/logger';

import { ITransactionsTypes, ITransactionsActions } from '../../commands';
import { ITransactionsState } from '../state';

const initialState: ITransactionsState = {
  pending: false,
  transactions: null,
  transaction: null,
  error: null,
};

export const transactionsReducer = (state = initialState, action: ITransactionsActions) => {
  const logger = Logger.getInstance();
  let newState: ITransactionsState;
  switch (action.type) {
    case ITransactionsTypes.LIST_TRANSACTIONS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_PAYOUT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_TRANSFER:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.FETCH_TRANSACTION_WAITING:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.TRANSACTIONS_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transactions: action.payload,
      };
      return newState;
    case ITransactionsTypes.PAYOUT_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSFER_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSACTION_WAITING_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transaction: action.payload,
      };
      return newState;
    case ITransactionsTypes.TRANSACTION_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case ITransactionsTypes.INITIALIZE_TRANSACTIONS_LIST:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transactions: null,
      };
      return newState;
    case ITransactionsTypes.INIT_TRANSACTION:
      logger.debug(action.type);
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
