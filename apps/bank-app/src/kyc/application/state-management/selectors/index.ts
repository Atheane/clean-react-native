import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectCustomer = (state: IRootState) => state.kyc.customer;
export const selectDocument = (state: IRootState) => state.kyc.document;
