import { Logger } from '@clean-rn/logger';
import { IResetPasswordTypes, IResetPasswordActions } from '../../../commands/reset-password';
import { IResetPasswordState } from '../state';

const initialState: IResetPasswordState = {
  pending: false,
  success: null,
};

export const resetPasswordReducer = (state = initialState, action: IResetPasswordActions) => {
  const logger = Logger.getInstance();
  let newState: IResetPasswordState;
  switch (action.type) {
    case IResetPasswordTypes.FETCH_RESET_PASSWORD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        success: null,
      };
      return newState;
    case IResetPasswordTypes.PASSWORD_RESET:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        success: action.payload.success,
      };
      return newState;
    case IResetPasswordTypes.INIT_RESET_PASSWORD:
      logger.debug(action.type);
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
