import { IInitializationTypes, IInitializationActions } from '../../../commands/initialize-application/types';
import { IInitializationState } from '../../state/initialize-application';

const initialState: IInitializationState = {
  pending: null,
  email: null,
};

export const initializationReducer = (state = initialState, action: IInitializationActions) => {
  let newState: IInitializationState;
  console.log(action.type);
  switch (action.type) {
    case IInitializationTypes.INITIALIZE_APPLICATION:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IInitializationTypes.APPLICATION_INITIALIZED:
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
