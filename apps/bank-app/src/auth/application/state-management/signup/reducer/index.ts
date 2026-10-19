import { Logger } from '@clean-rn/logger';

import { ISignupActions, ISignupTypes } from '../../../commands/signup';
import { ISignupState } from '../state';

const initialState: ISignupState = {
  pending: false,
  email: null,
  phone: null,
  phoneOtp: null,
  user: null,
  error: null,
};

export const signupReducer = (state = initialState, action: ISignupActions) => {
  const logger = Logger.getInstance();
  let newState: ISignupState;
  switch (action.type) {
    case ISignupTypes.FETCH_CHECK_EMAIL_EXISTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        email: action.payload.email,
        error: null,
      };
      return newState;
    case ISignupTypes.EMAIL_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case ISignupTypes.SIGNUP_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case ISignupTypes.FETCH_CHECK_PHONE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        phone: action.payload.phone,
        error: null,
      };
      return newState;
    case ISignupTypes.PHONE_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case ISignupTypes.FETCH_VALIDATE_PHONE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        phoneOtp: action.payload.phoneOtp,
        error: null,
      };
      return newState;
    case ISignupTypes.PHONE_VALIDATED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case ISignupTypes.IDENTITY_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case ISignupTypes.PASSWORD_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case ISignupTypes.BIRTH_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case ISignupTypes.ADDRESS_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;

    case ISignupTypes.FETCH_SIGNUP_USER:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ISignupTypes.USER_SIGNED_UP:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case ISignupTypes.INITIALIZE_SIGNUP_STEP:
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
