import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const selectTransactions = (state: IRootState) => state.transaction;
