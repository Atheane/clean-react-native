import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectAuth = (state: IRootState) => state.auth.auth;
export const selectEmail = (state: IRootState) => state.auth.email;
export const selectPassword = (state: IRootState) => state.auth.password;
