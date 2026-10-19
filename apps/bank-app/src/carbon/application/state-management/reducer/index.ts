import { Logger } from '@clean-rn/logger';

import { ICarbonActions, ICarbonTypes } from '../../commands';
import { ICarbonState } from '../state';

const initialState: ICarbonState = {
  pending: false,
  house: {
    data: null,
    footprint: null,
    average: null,
  },
  fly: {
    data: null,
    footprint: null,
    average: null,
  },
  transport: {
    data: null,
    footprint: null,
    average: null,
  },
  food: {
    data: null,
    footprint: null,
    average: null,
  },
};

export const carbonReducer = (state = initialState, action: ICarbonActions) => {
  const logger = Logger.getInstance();
  let newState: ICarbonState;
  switch (action.type) {
    case ICarbonTypes.COMPUTE_HOUSE_EMISSIONS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
        house: {
          ...state.house,
          data: action.payload,
        },
      };
      return newState;
    case ICarbonTypes.HOUSE_EMISSIONS_COMPUTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
          ...action.payload,
        },
      };
      return newState;
    case ICarbonTypes.INITIALIZE_HOUSE_EMISSIONS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        house: {
          data: null,
          footprint: null,
          average: null,
        },
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
