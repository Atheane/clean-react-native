import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUserFromLogin = (state: IRootState) => state.auth.login.user;
export const selectCustomer = (state: IRootState) => state.kyc.customer;
