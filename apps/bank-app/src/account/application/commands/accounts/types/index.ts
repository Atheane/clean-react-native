import { IAccount } from '@clean-rn/account/domain';

export enum IAccountsTypes {
  LIST_ACCOUNTS = 'LIST_ACCOUNTS',
  ACCOUNTS_LISTED = 'ACCOUNTS_LISTED',
  INITIALIZE_ACCOUNTS_LIST = 'INITIALIZE_ACCOUNTS_LIST',
  ACCOUNT_SELECTED = 'ACCOUNT_SELECTED',
}

export type IListAccounts = {
  type: typeof IAccountsTypes.LIST_ACCOUNTS;
};

export type IAccountsListed = {
  type: typeof IAccountsTypes.ACCOUNTS_LISTED;
  payload: IAccount[];
};

export type IInitializeAccountsList = {
  type: typeof IAccountsTypes.INITIALIZE_ACCOUNTS_LIST;
};

export type IAccountSelected = {
  type: typeof IAccountsTypes.ACCOUNT_SELECTED;
  payload: IAccount;
};

export type IAccountsActions = IListAccounts | IAccountsListed | IInitializeAccountsList | IAccountSelected;
