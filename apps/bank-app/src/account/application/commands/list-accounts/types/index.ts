import { IAccount } from '@clean-rn/account/domain';

export enum IAccountsTypes {
  LIST_ACCOUNTS = 'LIST_ACCOUNTS',
  ACCOUNTS_LISTED = 'ACCOUNTS_LISTED',
  INITIALIZE_LIST_ACCOUNTS = 'INITIALIZE_LIST_ACCOUNTS',
}

export type IListAccounts = {
  type: typeof IAccountsTypes.LIST_ACCOUNTS;
};

export type IAccountsListed = {
  type: typeof IAccountsTypes.ACCOUNTS_LISTED;
  payload: IAccount[];
};

export type IInitializeListAccounts = {
  type: typeof IAccountsTypes.INITIALIZE_LIST_ACCOUNTS;
};

export type IAccountsActions = IListAccounts | IAccountsListed | IInitializeListAccounts;
