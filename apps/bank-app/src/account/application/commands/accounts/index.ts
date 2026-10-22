import { IAccount } from '@clean-rn/account/domain';
import {
  IAccountsTypes,
  IListAccounts,
  IAccountsListed,
  IInitializeAccountsList,
  IAccountsActions,
  IAccountSelected,
} from './types';

// commands
export const listAccounts = (): IListAccounts => ({
  type: IAccountsTypes.LIST_ACCOUNTS,
});

export const initializeAccountsList = (): IInitializeAccountsList => ({
  type: IAccountsTypes.INITIALIZE_ACCOUNTS_LIST,
});

// domainEvents
export const accountsListed = (payload: IAccount[]): IAccountsListed => ({
  type: IAccountsTypes.ACCOUNTS_LISTED,
  payload,
});

export const accountSelected = (payload: IAccount): IAccountSelected => ({
  type: IAccountsTypes.ACCOUNT_SELECTED,
  payload,
});

export { IAccountsTypes, IAccountsActions };
