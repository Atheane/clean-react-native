import { IEventCardsActions, IEventCardsTypes } from '../../../commands/event-cards';
import { IEventCardsState } from '../state';

const initialState: IEventCardsState = {
  uid: null,
  deletedCards: [],
};

export const eventCardsReducer = (state = initialState, action: IEventCardsActions) => {
  switch (action.type) {
    case IEventCardsTypes.DELETE_EVENT_CARD:
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
