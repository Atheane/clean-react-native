import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectAccounts = (state: IRootState) => state.account.accounts;

export const selectTransactions = (state: IRootState) => state.account.transactions;
