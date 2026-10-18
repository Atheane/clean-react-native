import { Logger } from '@clean-rn/logger';

import { IInitializationTypes, IInitializationActions } from '../../../commands/initialization/types';
import { IInitializationState } from '../../state/initialization';

const initialState: IInitializationState = {
  pending: null,
  email: null,
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
    case IInitializationTypes.APPLICATION_INITIALIZED:
      logger.debug(action.type);
      newState = {
        ...state,
        email: action.payload,
        pending: false,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
