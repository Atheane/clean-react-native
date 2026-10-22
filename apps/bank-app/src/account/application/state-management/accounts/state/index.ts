import { IAccount } from '@clean-rn/account/domain';

export interface IAccountsState {
  pending: boolean;
  accounts: IAccount[] | null;
  selectedAccount: IAccount | null;
}
