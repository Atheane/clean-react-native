import { IAccount } from '@clean-rn/account/domain';

export enum IGetAccountsTypes {
  LIST_ACCOUNTS = 'LIST_ACCOUNTS',
  ACCOUNTS_LISTED = 'ACCOUNTS_LISTED',
  INITIALIZE_LIST_ACCOUNTS = 'INITIALIZE_LIST_ACCOUNTS',
}

export interface IGetAccountsState {
  pending: boolean;
  accounts: IAccount[] | null;
}

export type IListAccounts = {
  type: typeof IGetAccountsTypes.LIST_ACCOUNTS;
};

export type IAccountsListed = {
  type: typeof IGetAccountsTypes.ACCOUNTS_LISTED;
  payload: IAccount[];
};

export type IInitializeListAccounts = {
  type: typeof IGetAccountsTypes.INITIALIZE_LIST_ACCOUNTS;
};

export type IGetAccountsActions = IListAccounts | IAccountsListed | IInitializeListAccounts;
