import { ICheckEmailQuery, ISuccess } from '@clean-rn/auth/domain';
import { ICheckEmailTypes, IFetchCheckEmail, ICheckEmailSuccess, ICheckEmailActions } from './types';

export const fetchCheckEmail = (payload: ICheckEmailQuery): IFetchCheckEmail => ({
  type: ICheckEmailTypes.FETCH_CHECK_EMAIL,
  payload,
});

export const checkEmailSuccess = (payload: ISuccess): ICheckEmailSuccess => ({
  type: ICheckEmailTypes.CHECK_EMAIL_SUCCESS,
  payload,
});

export { ICheckEmailTypes, ICheckEmailActions };
