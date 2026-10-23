import { ICardTypes, ICardActions } from '../../commands';
import { ICardState } from '../state';

const initialState: ICardState = {
  pending: false,
  card: null,
  error: null,
};

export const cardReducer = (state = initialState, action: ICardActions) => {
  let newState: ICardState;

  switch (action.type) {
    case ICardTypes.FETCH_CHANGE_CARD_LIMITS:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ICardTypes.FETCH_TOGGLE_LOCK:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ICardTypes.FETCH_CHANGE_CARD_PIN:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case ICardTypes.CARD_GET_SUCCESS:
      newState = {
        ...state,
        pending: false,
        card: action.payload,
        error: null,
      };
      return newState;
    case ICardTypes.CARD_NOT_FOUND:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
        card: null,
      };
      return newState;
    case ICardTypes.CARD_LIMITS_CHANGED:
      newState = {
        ...state,
        pending: false,
        error: null,
        card: action.payload,
      };
      return newState;
    case ICardTypes.CARD_FORBIDDEN:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
        card: null,
      };
      return newState;
    case ICardTypes.CARD_LOCK_TOGGLED:
      newState = {
        ...state,
        pending: false,
        card: action.payload,
        error: null,
      };
      return newState;
    case ICardTypes.CARD_PIN_CHANGED:
      newState = {
        ...state,
        pending: false,
        card: action.payload,
        error: null,
      };
      return newState;
    case ICardTypes.CARD_PIN_CHANGED_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case ICardTypes.RESET_ERROR:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case ICardTypes.INIT_CARD:
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
