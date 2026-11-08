import { IEventCardsTypes, IDeleteEventCard, IEventCardsActions } from './types';

// commands
export const deleteEventCard = (payload: { uid: string }): IDeleteEventCard => ({
  type: IEventCardsTypes.DELETE_EVENT_CARD,
  payload,
});

export { IEventCardsTypes, IEventCardsActions };
