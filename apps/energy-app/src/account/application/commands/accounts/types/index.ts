import { IAccount } from '@clean-rn/account/domain';

export enum IAccountsTypes {
  LIST_ACCOUNTS = 'LIST_ACCOUNTS',
  ACCOUNTS_LISTED = 'ACCOUNTS_LISTED',
  RESET_PENDING = 'RESET_PENDING',
  INITIALIZE_ACCOUNTS = 'INITIALIZE_ACCOUNTS',
  ACCOUNT_SELECTED = 'ACCOUNT_SELECTED',
}

// commands
export type IListAccounts = {
  type: typeof IAccountsTypes.LIST_ACCOUNTS;
};

export type IResetPending = {
  type: typeof IAccountsTypes.RESET_PENDING;
};

export type IInitializeAccounts = {
  type: typeof IAccountsTypes.INITIALIZE_ACCOUNTS;
};

// domainEvents
export type IAccountsListed = {
  type: typeof IAccountsTypes.ACCOUNTS_LISTED;
  payload: IAccount[];
};

export type IAccountSelected = {
  type: typeof IAccountsTypes.ACCOUNT_SELECTED;
  payload: IAccount;
};

export type IAccountsActions =
  | IListAccounts
  | IResetPending
  | IAccountSelected
  | IAccountsListed
  | IInitializeAccounts;
