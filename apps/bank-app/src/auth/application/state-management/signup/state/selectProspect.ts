import { IRootState } from '../../../../../shared/application/state-management/reducers/root-reducer';

export const selectProspect = (state: IRootState) => state.auth.signup.email;
