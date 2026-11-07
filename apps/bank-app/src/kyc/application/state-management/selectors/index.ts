import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectCustomer = (state: IRootState) => state.customer.customer;
