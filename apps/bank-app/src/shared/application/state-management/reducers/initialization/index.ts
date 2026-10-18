import { Logger } from '@clean-rn/logger';

import { IInitializationTypes, IInitializationActions } from '../../../commands/initialization/types';
import { IInitializationState } from '../../state/initialization';

const initialState: IInitializationState = {
  pending: false,
  email: null,
  error: null,
};

export const initializationReducer = (state = initialState, action: IInitializationActions) => {
  const logger = Logger.getInstance();
  let newState: IInitializationState;
  switch (action.type) {
    case IInitializationTypes.INITIALIZE_APPLICATION:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IInitializationTypes.INITIALIZE_APPLICATION_SUCCEDED:
      logger.debug(action.type);
      newState = {
        ...state,
        email: action.payload.email,
        pending: false,
      };
      return newState;
    case IInitializationTypes.INITIALIZE_APPLICATION_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        error: action.payload.error,
        pending: false,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
