import { IGlobalErrorActions, IGlobalErrorTypes } from '../../../commands/manage-global-errors/types';
import { IGlobalErrorState } from '../../state/manage-global-errors';

const initialState: IGlobalErrorState = {
  error: null,
};

export const globalErrorReducer = (state = initialState, action: IGlobalErrorActions) => {
  let newState: IGlobalErrorState;
  switch (action.type) {
    case IGlobalErrorTypes.SHOW_UNKNOWN_ERROR:
      newState = {
        ...state,
        error: action.payload,
      };
      return newState;
    case IGlobalErrorTypes.INIT_GLOBAL_ERROR:
      newState = {
        ...state,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
