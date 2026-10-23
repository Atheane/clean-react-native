import { ICarbonActions, ICarbonTypes } from '../../commands';
import { ICarbonState } from '../state';

const initialState: ICarbonState = {
  pending: false,
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
};

export const carbonReducer = (state = initialState, action: ICarbonActions) => {
  let newState: ICarbonState;
  switch (action.type) {
    case ICarbonTypes.COMPUTE_HOUSE_EMISSIONS:
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
    case ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS:
      newState = {
        ...state,
        pending: true,
        transport: {
          ...state.transport,
          data: action.payload,
        },
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
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
