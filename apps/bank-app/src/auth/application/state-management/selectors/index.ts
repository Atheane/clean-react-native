import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectAuthFromLogin = (state: IRootState) => state.auth;
