import { Logger } from '@clean-rn/logger';

import { IEventCardsActions, IEventCardsTypes } from '../../../commands/event-cards';
import { IEventCardsState } from '../state';

const initialState: IEventCardsState = {
  uid: null,
  deletedCards: [],
};

export const eventCardsReducer = (state = initialState, action: IEventCardsActions) => {
  const logger = Logger.getInstance();
  switch (action.type) {
    case IEventCardsTypes.DELETE_EVENT_CARD:
      logger.debug(action.type);
      return {
        ...state,
        uid: action.payload.uid,
        deletedCards: [...state.deletedCards, action.payload.uid],
      };
    default:
      return {
        ...state,
      };
  }
};
