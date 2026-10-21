export enum IEventCardsTypes {
  DELETE_EVENT_CARD = 'DELETE_EVENT_CARD',
}

export type IDeleteEventCard = {
  type: typeof IEventCardsTypes.DELETE_EVENT_CARD;
  payload: { uid: string };
};

export type IEventCardsActions = IDeleteEventCard;
