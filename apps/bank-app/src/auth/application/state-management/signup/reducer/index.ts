import { Logger } from '@clean-rn/logger';
import { ISignupState } from '../state';
import { ISignupActions, ISignupTypes } from '../../../commands/signup';

const initialState: ISignupState = {
  pending: false,
  email: null,
  phone: null,
  prospect: null,
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
      };
      return newState;
    case ISignupTypes.EMAIL_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
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
    case ISignupTypes.FETCH_CHECK_PHONE_EXISTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        phone: action.payload.phone,
      };
      return newState;
    case ISignupTypes.PHONE_CHECKED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
      };
      return newState;
    case ISignupTypes.FETCH_VALIDATE_PHONE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ISignupTypes.PHONE_VALIDATED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
      };
      return newState;
    case ISignupTypes.IDENTITY_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.PASSWORD_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.BIRTH_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.ADDRESS_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;

    case ISignupTypes.CREATE_USER:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
        prospect: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
