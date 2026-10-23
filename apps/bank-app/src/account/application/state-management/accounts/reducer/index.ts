import { IAccountsTypes, IAccountsActions } from '../../../commands/accounts';
import { IAccountsState } from '../state';

const initialState: IAccountsState = {
  pending: false,
  accounts: null,
  selectedAccount: null,
};

export const accountsReducer = (state = initialState, action: IAccountsActions) => {
  let newState: IAccountsState;
  switch (action.type) {
    case IAccountsTypes.LIST_ACCOUNTS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IAccountsTypes.ACCOUNTS_LISTED:
      newState = {
        ...state,
        pending: false,
        accounts: action.payload,
      };
      return newState;
    case IAccountsTypes.ACCOUNT_SELECTED:
      newState = {
        ...state,
        selectedAccount: action.payload,
      };
      return newState;
    case IAccountsTypes.INITIALIZE_ACCOUNTS_LIST:
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
