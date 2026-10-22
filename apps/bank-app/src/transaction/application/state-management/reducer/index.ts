import { Logger } from '@clean-rn/logger';

import { ITransactionsTypes, ITransactionsActions } from '../../commands';
import { ITransactionsState } from '../state';

const initialState: ITransactionsState = {
  pending: false,
  transactions: null,
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
    case ITransactionsTypes.TRANSACTIONS_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        transactions: action.payload,
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
    default:
      return {
        ...state,
      };
  }
};
