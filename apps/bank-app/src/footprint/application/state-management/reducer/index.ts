import { IFootprintActions, IFootprintTypes } from '../../commands';
import { IFootprintState } from '../state';

const initialState: IFootprintState = {
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

export const footprintReducer = (state = initialState, action: IFootprintActions) => {
  let newState: IFootprintState;
  switch (action.type) {
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
        house: {
          ...state.house,
          house: action.payload,
        },
        error: null,
      };
      return newState;
    case IFootprintTypes.HEATERS_ADDED:
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
    case IFootprintTypes.HEATERS_NOT_ADDED:
      newState = {
        ...state,
        pending: false,
        house: {
          ...state.house,
        },
        error: action.payload,
      };
      return newState;
    case IFootprintTypes.COMPUTE_HOUSE_EMISSIONS:
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
    case IFootprintTypes.HOUSE_EMISSIONS_COMPUTED:
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
    case IFootprintTypes.INITIALIZE_HOUSE_EMISSIONS:
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
    case IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS:
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
    case IFootprintTypes.TRANSPORT_EMISSIONS_COMPUTED:
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
    case IFootprintTypes.INITIALIZE_TRANSPORT_EMISSIONS:
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
    case IFootprintTypes.COMPUTE_FOOD_EMISSIONS:
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
    case IFootprintTypes.FOOD_EMISSIONS_COMPUTED:
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
    case IFootprintTypes.INITIALIZE_FOOD_EMISSIONS:
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
    case IFootprintTypes.COMPUTE_FLY_EMISSIONS:
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
    case IFootprintTypes.FLY_EMISSIONS_COMPUTED:
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
    case IFootprintTypes.INITIALIZE_FLY_EMISSIONS:
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
