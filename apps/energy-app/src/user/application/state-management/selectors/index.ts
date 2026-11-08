import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectUser = (state: IRootState) => state.user.user;
export const selectEmail = (state: IRootState) => state.user.email;
export const selectPhoneOtp = (state: IRootState) => state.user.phoneOtp;
