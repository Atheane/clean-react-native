import { IEnergyActions, IEnergyTypes } from '../../commands';
import { IEnergyState } from '../state';

const initialState: IEnergyState = {
  pending: false,
  energy: null,
  error: null,
};

export const energyReducer = (state = initialState, action: IEnergyActions): IEnergyState => {
  let newState: IEnergyState;
  switch (action.type) {
    case IEnergyTypes.GET_ENERGY:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IEnergyTypes.GET_QUIZ:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IEnergyTypes.CHECK_ANSWER:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IEnergyTypes.COMPUTE_REWARDS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IEnergyTypes.GET_CONSUMPTIONS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IEnergyTypes.ENERGY_DOMAIN_EVENT:
      return {
        ...state,
        pending: false,
        energy: action.payload.energy,
        error: null,
      };
    case IEnergyTypes.INITIALIZE_ENERGY:
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
