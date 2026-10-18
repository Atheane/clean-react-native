import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUser = (state: IRootState) => state.auth.signup.user;
export const selectEmail = (state: IRootState) => state.auth.signup.email;
export const selectPhoneOtp = (state: IRootState) => state.auth.signup.phoneOtp;
