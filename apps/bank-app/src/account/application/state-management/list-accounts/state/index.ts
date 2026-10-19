import { IAccount } from '@clean-rn/account/domain';

export interface IGetAccountsState {
  pending: boolean;
  accounts: IAccount[] | null;
}
