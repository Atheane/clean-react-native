import { ISuccess } from '@clean-rn/ddd';
import { Email, ICheckEmailQuery } from '@clean-rn/auth/domain';

export interface ICheckEmailState {
  pending: boolean;
  email: Email | null;
  success: boolean | null;
}

export enum ICheckEmailTypes {
  FETCH_CHECK_EMAIL = 'FETCH_CHECK_EMAIL',
  CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS',
}

export type IFetchCheckEmail = {
  type: typeof ICheckEmailTypes.FETCH_CHECK_EMAIL;
  payload: ICheckEmailQuery;
};

export type ICheckEmailSuccess = {
  type: typeof ICheckEmailTypes.CHECK_EMAIL_SUCCESS;
  payload: ISuccess;
};

export type ICheckEmailActions = IFetchCheckEmail | ICheckEmailSuccess;
