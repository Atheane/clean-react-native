import { Logger } from '@clean-rn/logger';

import { ILoginTypes, ILoginActions } from '../../../commands/login/types';
import { ILoginState } from '../state';

const initialState: ILoginState = {
  pending: false,
  auth: {
    accessToken: null,
    refreshToken: null,
  },
  error: null,
};

export const loginReducer = (state = initialState, action: ILoginActions) => {
  const logger = Logger.getInstance();
  let newState: ILoginState;
  switch (action.type) {
    case ILoginTypes.FETCH_LOGIN:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ILoginTypes.LOGIN_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        auth: action.payload,
      };
      return newState;
    case ILoginTypes.LOGIN_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
