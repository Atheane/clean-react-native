import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUserFromLogin = (state: IRootState) => state.auth.login.user;
