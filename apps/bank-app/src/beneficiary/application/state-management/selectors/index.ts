import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectBeneficiary = () => (state: IRootState) => state.beneficiary.beneficiaries;
