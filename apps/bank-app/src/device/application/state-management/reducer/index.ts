import { Logger } from '@clean-rn/logger';

import { IDeviceActions, IDeviceTypes } from '../../commands';
import { IDeviceState } from '../state';

const initialState: IDeviceState = {
  pending: false,
  device: null,
  error: null,
};

export const deviceReducer = (state = initialState, action: IDeviceActions) => {
  const logger = Logger.getInstance();
  let newState: IDeviceState;
  switch (action.type) {
    case IDeviceTypes.FETCH_REGISTER_DEVICE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        device: null,
      };
      return newState;
    case IDeviceTypes.INITIALIZE_DEVICE:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        device: null,
      };
      return newState;
    case IDeviceTypes.DEVICE_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        device: action.payload,
      };
      return newState;
    case IDeviceTypes.DEVICE_ALREADY_REGISTERED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload.error,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
