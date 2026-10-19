import { Logger } from '@clean-rn/logger';

import { IGlobalErrorActions, IGlobalErrorTypes } from '../../../commands/global-error-management/types';
import { IGlobalErrorState } from '../../state/manage-global-errors';

const initialState: IGlobalErrorState = {
  error: null,
};

export const errorReducer = (state = initialState, action: IGlobalErrorActions) => {
  const logger = Logger.getInstance();
  let newState: IGlobalErrorState;
  switch (action.type) {
    case IGlobalErrorTypes.SHOW_UNKNOWN_ERROR:
      logger.debug(action.type);
      newState = {
        ...state,
        error: action.payload,
      };
      return newState;
    case IGlobalErrorTypes.INIT_GLOBAL_ERROR:
      logger.debug(action.type);
      newState = {
        ...state,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
