import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUserFromSignup = (state: IRootState) => state.user.user;
export const selectEmailFromSignup = (state: IRootState) => state.user.email;
export const selectPhoneOtpFromSignup = (state: IRootState) => state.user.phoneOtp;
