import { Logger } from '@clean-rn/logger';

import { IAuthTypes, IAuthActions } from '../../commands/types';
import { IAuthState } from '../state';

const initialState: IAuthState = {
  pending: false,
  email: null,
  password: null,
  auth: {
    accessToken: null,
    refreshToken: null,
  },
  error: null,
  success: null,
};

export const authReducer = (state = initialState, action: IAuthActions) => {
  const logger = Logger.getInstance();
  let newState: IAuthState;
  switch (action.type) {
    case IAuthTypes.FETCH_LOGIN:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        email: action.payload.email,
        password: action.payload.password,
      };
      return newState;
    case IAuthTypes.LOGIN_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        auth: action.payload.auth,
      };
      return newState;
    case IAuthTypes.REFRESH_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        auth: action.payload.auth,
      };
      return newState;
    case IAuthTypes.LOGIN_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IAuthTypes.FETCH_RESET_PASSWORD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        success: null,
      };
      return newState;
    case IAuthTypes.PASSWORD_RESET:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        success: action.payload.success,
      };
      return newState;
    case IAuthTypes.INITIALIZE_AUTH:
      logger.debug(action.type);
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    case IAuthTypes.RESET_ERROR:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
