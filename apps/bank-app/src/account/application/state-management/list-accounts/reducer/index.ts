import { IGetAccountsTypes, IGetAccountsActions } from '../../../commands/list-accounts';
import { IGetAccountsState } from '../state';
import { Logger } from '@clean-rn/logger';

const initialState: IGetAccountsState = {
  pending: false,
  accounts: null,
};

export const listAccountsReducer = (state = initialState, action: IGetAccountsActions) => {
  const logger = Logger.getInstance();
  let newState: IGetAccountsState;
  switch (action.type) {
    case IGetAccountsTypes.LIST_ACCOUNTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IGetAccountsTypes.ACCOUNTS_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        accounts: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
