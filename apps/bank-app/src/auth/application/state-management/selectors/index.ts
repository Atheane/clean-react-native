import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUserFromSignup = (state: IRootState) => state.auth.signup.user;
export const selectEmailFromSignup = (state: IRootState) => state.auth.signup.email;
export const selectPhoneOtpFromSignup = (state: IRootState) => state.auth.signup.phoneOtp;
