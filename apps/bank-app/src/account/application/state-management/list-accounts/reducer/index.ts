import { IAccountsTypes, IAccountsActions } from '../../../commands/list-accounts';
import { IAccountsState } from '../state';
import { Logger } from '@clean-rn/logger';

const initialState: IAccountsState = {
  pending: false,
  accounts: null,
};

export const accountsReducer = (state = initialState, action: IAccountsActions) => {
  const logger = Logger.getInstance();
  let newState: IAccountsState;
  switch (action.type) {
    case IAccountsTypes.LIST_ACCOUNTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IAccountsTypes.ACCOUNTS_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        accounts: action.payload,
      };
      return newState;
    case IAccountsTypes.INITIALIZE_LIST_ACCOUNTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        accounts: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
