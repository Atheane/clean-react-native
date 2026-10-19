import { Logger } from '@clean-rn/logger';

import { ITransactionsTypes, ITransactionsActions } from '../../../commands/transactions';
import { ITransactionsState } from '../state';
import { IStatementsPeriod } from '@clean-rn/account/domain';

const initialState: ITransactionsState = {
  pending: false,
  transactions: null,
  statements: {
    [IStatementsPeriod.LAST_MONTH]: null,
    [IStatementsPeriod.LAST_TRIMESTER]: null,
    [IStatementsPeriod.ALL]: null,
  },
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
    case ITransactionsTypes.DOWNLOAD_STATEMENTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ITransactionsTypes.STATEMENTS_DOWNLOADED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        statements: {
          ...state.statements,
          [action.payload.period]: action.payload.buffer,
        },
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
