import { Logger } from '@clean-rn/logger';

import { ICardTypes, ICardActions } from '../../commands';
import { ICardState } from '../state';

const initialState: ICardState = {
  pending: false,
  card: null,
};

export const cardReducer = (state = initialState, action: ICardActions) => {
  const logger = Logger.getInstance();
  let newState: ICardState;
  logger.debug(action.type);

  switch (action.type) {
    case ICardTypes.FETCH_CHANGE_CARD_LIMITS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICardTypes.FETCH_GET_CARD:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case ICardTypes.CARD_GET_SUCCESS:
      newState = {
        ...state,
        pending: false,
        card: action.payload,
      };
      return newState;
    case ICardTypes.CARD_LIMITS_CHANGED:
      newState = {
        ...state,
        pending: false,
        card: action.payload,
      };
      return newState;
    case ICardTypes.INIT_CARD:
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
