import { IAccount } from '@clean-rn/account/domain';
import {
  IAccountsTypes,
  IListAccounts,
  IAccountsListed,
  IInitializeListAccounts,
  IAccountsActions,
} from './types';

// commands
export const listAccounts = (): IListAccounts => ({
  type: IAccountsTypes.LIST_ACCOUNTS,
});

export const accountsListed = (payload: IAccount[]): IAccountsListed => ({
  type: IAccountsTypes.ACCOUNTS_LISTED,
  payload,
});

export const initializeListAccounts = (): IInitializeListAccounts => ({
  type: IAccountsTypes.INITIALIZE_LIST_ACCOUNTS,
});

export { IAccountsTypes, IAccountsActions };
