import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectAuth = (state: IRootState) => state.auth.auth;
export const selectUser = (state: IRootState) => state.auth.user;
