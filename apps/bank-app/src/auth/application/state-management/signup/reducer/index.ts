import { Logger } from '@clean-rn/logger';
import { ISignupState } from '../state';
import { ISignupActions, ISignupTypes } from '../../../commands/signup';

const initialState: ISignupState = {
  pending: false,
  email: null,
  success: null,
  prospect: null,
  user: null,
};

export const signupReducer = (state = initialState, action: ISignupActions) => {
  const logger = Logger.getInstance();
  let newState: ISignupState;
  switch (action.type) {
    case ISignupTypes.FETCH_CHECK_EMAIL:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        email: action.payload,
      };
      return newState;
    case ISignupTypes.CHECK_EMAIL_SUCCESS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        success: action.payload.success,
      };
      return newState;
    case ISignupTypes.REGISTER_IDENTITY:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_PASSWORD:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_BIRTH:
      logger.debug(action.type);
      newState = {
        ...state,
        prospect: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_ADDRESS:
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
