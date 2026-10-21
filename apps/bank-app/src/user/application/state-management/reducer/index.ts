import { Logger } from '@clean-rn/logger';

import { IUserActions, IUserTypes } from '../../commands';
import { IUserState } from '../state';

const initialState: IUserState = {
  pending: false,
  email: null,
  phone: null,
  phoneOtp: null,
  user: null,
  error: null,
  success: null,
};

export const userReducer = (state = initialState, action: IUserActions) => {
  const logger = Logger.getInstance();
  let newState: IUserState;
  switch (action.type) {
    case IUserTypes.FETCH_SEARCH_EMAIL:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        email: action.payload.email,
        error: null,
      };
      return newState;
    case IUserTypes.EMAIL_NOT_FOUND:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case IUserTypes.SIGNUP_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IUserTypes.FETCH_SEARCH_PHONE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        phone: action.payload.phone,
        error: null,
      };
      return newState;
    case IUserTypes.PHONE_NOT_FOUND:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IUserTypes.PHONE_CODE_SENT:
      logger.debug(action.type);
      return {
        ...state,
        pending: false,
        error: null,
      };
    case IUserTypes.FETCH_VALIDATE_PHONE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        phoneOtp: action.payload.phoneOtp,
        error: null,
      };
      return newState;
    case IUserTypes.PHONE_VALIDATED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.IDENTITY_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.PASSWORD_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.BIRTH_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.ADDRESS_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;

    case IUserTypes.FETCH_SIGNUP_USER:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IUserTypes.USER_SIGNED_UP:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.INITIALIZE_SIGNUP_STEP:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_RESET_PASSWORD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        success: null,
      };
      return newState;
    case IUserTypes.PASSWORD_RESET:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        success: action.payload.success,
      };
      return newState;
    case IUserTypes.INIT_RESET_PASSWORD:
      logger.debug(action.type);
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
