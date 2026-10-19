import { IAccount } from '@clean-rn/account/domain';
import {
  IGetAccountsTypes,
  IListAccounts,
  IAccountsListed,
  IInitializeListAccounts,
  IGetAccountsActions,
} from './types';

// commands
export const listAccounts = (): IListAccounts => ({
  type: IGetAccountsTypes.LIST_ACCOUNTS,
});

export const accountsListed = (payload: IAccount[]): IAccountsListed => ({
  type: IGetAccountsTypes.ACCOUNTS_LISTED,
  payload,
});

export const initializeListAccounts = (): IInitializeListAccounts => ({
  type: IGetAccountsTypes.INITIALIZE_LIST_ACCOUNTS,
});

export { IGetAccountsTypes, IGetAccountsActions };
