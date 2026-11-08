import { IDeviceActions, IDeviceTypes } from '../../commands';
import { IDeviceState } from '../state';

const initialState: IDeviceState = {
  pending: false,
  device: null,
  error: null,
};

export const deviceReducer = (state = initialState, action: IDeviceActions) => {
  let newState: IDeviceState;
  switch (action.type) {
    case IDeviceTypes.FETCH_REGISTER_DEVICE:
      newState = {
        ...state,
        pending: true,
        device: null,
        error: null,
      };
      return newState;
    case IDeviceTypes.DEVICE_REGISTERED:
      newState = {
        ...state,
        pending: false,
        device: action.payload,
        error: null,
      };
      return newState;
    case IDeviceTypes.DEVICE_ALREADY_REGISTERED:
      newState = {
        ...state,
        pending: false,
        error: action.payload.error,
      };
      return newState;
    case IDeviceTypes.RESET_ERROR:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case IDeviceTypes.INITIALIZE_DEVICE:
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
