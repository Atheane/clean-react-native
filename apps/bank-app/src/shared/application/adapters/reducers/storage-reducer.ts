import { IStorageTypes, IStorageActions } from '../../commands';
import { IStorageState } from '../../types';

import { Logger } from '@clean-rn/ui-mobile';

const initialState: IStorageState = {
  email: null,
  token: null,
  signupStep: null,
  houseEmissions: null,
  averageHouseEmissions: null,
  foodEmissions: null,
  averageFoodEmissions: null,
  transportEmissions: null,
  averageTransportEmissions: null,
  flyEmissions: null,
  averageFlyEmissions: null,
  loaded: null,
};

export const storageReducer = (state = initialState, action: IStorageActions) => {
  const logger = Logger.getInstance();
  let newState: IStorageState;
  switch (action.type) {
    case IStorageTypes.ASK_LOAD_STORAGE:
      logger.debug(action.type);
      newState = {
        ...state,
        loaded: false,
      };
      return newState;
    case IStorageTypes.LOAD_STORAGE_SUCCESS: //todo should be a DomainEvent STORAGE_LOADED
      logger.debug(action.type);
      newState = {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        signupStep: action.payload.signupStep ? parseInt(action.payload.signupStep) : null,
        houseEmissions: action.payload.houseEmissions,
        averageHouseEmissions: action.payload.averageHouseEmissions,
        foodEmissions: action.payload.foodEmissions,
        averageFoodEmissions: action.payload.averageFoodEmissions,
        transportEmissions: action.payload.transportEmissions,
        averageTransportEmissions: action.payload.averageTransportEmissions,
        flyEmissions: action.payload.flyEmissions,
        averageFlyEmissions: action.payload.averageFlyEmissions,
        loaded: true,
      };
      return newState;
    case IStorageTypes.STORE_EMAIL:
      logger.debug(action.type);
      newState = {
        ...state,
        email: action.payload,
      };
      return newState;
    case IStorageTypes.STORE_TOKEN:
      logger.debug(action.type);
      newState = {
        ...state,
        token: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
