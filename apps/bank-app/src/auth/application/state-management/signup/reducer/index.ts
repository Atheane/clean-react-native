import { Logger } from '@clean-rn/logger';
import { ISignupState } from '../state';
import { ISignupActions, ISignupTypes } from '../../../commands/signup';

const initialState: ISignupState = {
  pending: false,
  user: null,
};

export const signupReducer = (state = initialState, action: ISignupActions) => {
  const logger = Logger.getInstance();
  let newState: ISignupState;
  switch (action.type) {
    case ISignupTypes.REGISTER_IDENTITY:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_PASSWORD:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_BIRTH:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    case ISignupTypes.REGISTER_ADDRESS:
      logger.debug(action.type);
      newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
