import { IRootState } from '../../../../../shared/application/state-management/reducers/root-reducer';

export const selectEmailFromCheckEmail = (state: IRootState) => state.auth.checkEmail.email;
