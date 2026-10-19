import { Logger } from '@clean-rn/logger';

import { IInitializationTypes, IInitializationActions } from '../../../commands/initialize-application/types';
import { IInitializationState } from '../../state/initialize-application';

const initialState: IInitializationState = {
  pending: null,
  email: null,
  initRouteName: undefined,
  houseEmissions: undefined,
  averageHouseEmissions: undefined,
  transportEmissions: undefined,
  averageTransportEmissions: undefined,
  foodEmissions: undefined,
  averageFoodEmissions: undefined,
  flyEmissions: undefined,
  averageFlyEmissions: undefined,
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
        pending: false,
        email: action.payload.email,
        initRouteName: action.payload.initRouteName,
      };
      return newState;
    case IInitializationTypes.LOAD_STORAGE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IInitializationTypes.STORAGE_LOADED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        email: action.payload.email,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
