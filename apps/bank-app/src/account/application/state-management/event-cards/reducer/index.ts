import { Logger } from '@clean-rn/logger';

import { IEventCardsActions, IEventCardsTypes } from '../../../commands/event-cards';
import { IEventCardsState } from '../state';

const initialState: IEventCardsState = {
  uid: null,
  deleteCards: [],
};

export const eventCardsReducer = (state = initialState, action: IEventCardsActions) => {
  const logger = Logger.getInstance();
  switch (action.type) {
    case IEventCardsTypes.DELETE_EVENT_CARD:
      logger.debug(action.type);
      if (state.deleteCards.length === 0) {
        return {
          ...state,
          uid: action.payload.uid,
          deleteCards: [action.payload.uid],
        };
      }
      return {
        ...state,
        uid: action.payload.uid,
        deleteCards: [...state.deleteCards, action.payload.uid],
      };
    default:
      return {
        ...state,
      };
  }
};
