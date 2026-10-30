import { IFootprintActions, IFootprintTypes } from '../../commands';
import { IFootprintState } from '../state';

const initialState: IFootprintState = {
  pending: false,
  estimate: {
    house: {
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
    fly: {
      data: null,
      footprint: null,
      average: null,
    },
  },
  footprint: null,
  house: null,
  error: null,
};

export const footprintReducer = (state = initialState, action: IFootprintActions) => {
  let newState: IFootprintState;
  switch (action.type) {
    case IFootprintTypes.CREATE_FOOTPRINT:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IFootprintTypes.FOOTPRINT_CREATED:
      newState = {
        ...state,
        pending: false,
        footprint: action.payload,
        error: null,
      };
      return newState;
    case IFootprintTypes.FOOTPRINT_NOT_CREATED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IFootprintTypes.GET_HOUSE:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IFootprintTypes.ADD_HEATERS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IFootprintTypes.HOUSE_CREATED:
      newState = {
        ...state,
        pending: false,
        house: action.payload,
        error: null,
      };
      return newState;
    case IFootprintTypes.HEATERS_ADDED:
      newState = {
        ...state,
        pending: false,
        house: action.payload,
        error: null,
      };
      return newState;
    case IFootprintTypes.HEATERS_NOT_ADDED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IFootprintTypes.COMPUTE_HOUSE_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        estimate: {
          ...state.estimate,
          house: {
            ...state.estimate.house,
            data: action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.HOUSE_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          house: {
            ...state.estimate.house,
            ...action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.INITIALIZE_HOUSE_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          house: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        estimate: {
          ...state.estimate,
          transport: {
            ...state.estimate.transport,
            data: action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.TRANSPORT_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          transport: {
            ...state.estimate.transport,
            ...action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.INITIALIZE_TRANSPORT_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          transport: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.COMPUTE_FOOD_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        estimate: {
          ...state.estimate,
          food: {
            ...state.estimate.food,
            data: action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.FOOD_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          food: {
            ...state.estimate.food,
            ...action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.INITIALIZE_FOOD_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          food: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.COMPUTE_FLY_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        estimate: {
          ...state.estimate,
          fly: {
            ...state.estimate.fly,
            data: action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.FLY_EMISSIONS_COMPUTED:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          fly: {
            ...state.estimate.fly,
            ...action.payload,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.INITIALIZE_FLY_EMISSIONS:
      newState = {
        ...state,
        pending: false,
        estimate: {
          ...state.estimate,
          fly: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.INITIALIZE_FOOTPRINT:
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
