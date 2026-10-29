import { DomainEventManager } from '@clean-rn/ddd';
import { ICarbonActions, ICarbonTypes } from '../../commands';
import { ICarbonState } from '../state';
import { CARBON_EVENTS } from '@clean-rn/carbon/domain';

const initialState: ICarbonState = {
  pending: false,
  house: {
    data: null,
    footprint: null,
    average: null,
    house: null,
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
  fly: {
    data: null,
    footprint: null,
    average: null,
  },
  error: null,
};

export const carbonReducer = (state = initialState, action: ICarbonActions) => {
  let newState: ICarbonState;
  switch (action.type) {
    case ICarbonTypes.GET_HOUSE:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ICarbonTypes.ADD_HEATERS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ICarbonTypes.HOUSE_CREATED:
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
          house: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.HEATERS_ADDED:
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
          house: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.HEATERS_NOT_ADDED:
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
        },
        error: action.payload,
      };
      return newState;
    case ICarbonTypes.COMPUTE_HOUSE_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        house: {
          ...state.house,
          data: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.HOUSE_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
          ...action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.INITIALIZE_HOUSE_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        house: {
          data: null,
          footprint: null,
          average: null,
          house: null,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        transport: {
          ...state.transport,
          data: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.TRANSPORT_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        transport: {
          ...state.transport,
          ...action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.INITIALIZE_TRANSPORT_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.COMPUTE_FOOD_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        food: {
          ...state.food,
          data: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.FOOD_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        food: {
          ...state.food,
          ...action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.INITIALIZE_FOOD_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.COMPUTE_FLY_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        fly: {
          ...state.fly,
          data: action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.FLY_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        fly: {
          ...state.fly,
          ...action.payload,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.INITIALIZE_FLY_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
        error: null,
      };
      return newState;
    case ICarbonTypes.INITIALIZE_CARBON:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
