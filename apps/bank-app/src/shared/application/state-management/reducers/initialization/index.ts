import { Logger } from '@clean-rn/logger';

import { IInitializationTypes, IInitializationActions } from '../../../commands/initialization/types';
import { IInitializationState } from '../../state/initialization';

const initialState: IInitializationState = {
  pending: null,
  email: null,
  initRouteName: undefined,
  isFirstConnection: false,
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
        isFirstConnection: action.payload ?? false,
      };
      return newState;
    case IInitializationTypes.APPLICATION_INITIALIZED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        email: action.payload.email ?? null,
        initRouteName: action.payload.initRouteName,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
