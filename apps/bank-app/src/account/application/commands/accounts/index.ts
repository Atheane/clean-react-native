import { IAccount } from '@clean-rn/account/domain';
import {
  IAccountsTypes,
  IListAccounts,
  IAccountsListed,
  IInitializeAccounts,
  IAccountsActions,
  IAccountSelected,
  IResetPending,
} from './types';

// commands
export const listAccounts = (): IListAccounts => ({
  type: IAccountsTypes.LIST_ACCOUNTS,
});

export const initializeAccounts = (): IInitializeAccounts => ({
  type: IAccountsTypes.INITIALIZE_ACCOUNTS,
});

export const resetPending = (): IResetPending => ({
  type: IAccountsTypes.RESET_PENDING,
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
