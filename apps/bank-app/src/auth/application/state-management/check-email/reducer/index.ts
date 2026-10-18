import { Logger } from '@clean-rn/logger';

import { ICheckEmailTypes, ICheckEmailActions } from '../../../commands/check-email/types';
import { ICheckEmailState } from '../state';

const initialState: ICheckEmailState = {
  pending: false,
  success: null,
};

export const checkEmailReducer = (state = initialState, action: ICheckEmailActions) => {
  const logger = Logger.getInstance();
  let newState: ICheckEmailState;
  switch (action.type) {
    case ICheckEmailTypes.FETCH_CHECK_EMAIL:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        success: null,
      };
      return newState;
    case ICheckEmailTypes.CHECK_EMAIL_SUCCESS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        success: action.payload.success,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
