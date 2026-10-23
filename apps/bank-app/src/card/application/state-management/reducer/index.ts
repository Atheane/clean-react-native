import { Logger } from '@clean-rn/logger';

import { ICardTypes, ICardActions } from '../../commands';
import { ICardState } from '../state';

const initialState: ICardState = {
  pending: false,
  card: null,
  error: null,
};

export const cardReducer = (state = initialState, action: ICardActions) => {
  const logger = Logger.getInstance();
  let newState: ICardState;

  switch (action.type) {
    case ICardTypes.FETCH_CHANGE_CARD_LIMITS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICardTypes.FETCH_GET_CARD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICardTypes.FETCH_TOGGLE_LOCK:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICardTypes.CARD_GET_SUCCESS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        card: action.payload,
      };
      return newState;
    case ICardTypes.CARD_NOT_FOUND:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
        card: null,
      };
      return newState;
    case ICardTypes.CARD_LIMITS_CHANGED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        card: action.payload,
      };
      return newState;
    case ICardTypes.CARD_FORBIDDEN:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
        card: null,
      };
      return newState;
    case ICardTypes.CARD_LOCK_TOGGLED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        card: action.payload,
      };
      return newState;
    case ICardTypes.INIT_CARD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        card: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
