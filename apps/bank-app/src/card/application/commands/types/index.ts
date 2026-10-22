import { Card, IChangeCardLimitsCommand } from '@clean-rn/card/domain';

export enum ICardTypes {
  FETCH_CHANGE_CARD_LIMITS = 'FETCH_CHANGE_CARD_LIMITS',
  INIT_CARD = 'INIT_CARD',
  CARD_LIMITS_CHANGED = 'CARD_LIMITS_CHANGED',
}

export type IFetchChangeCardLimits = {
  type: typeof ICardTypes.FETCH_CHANGE_CARD_LIMITS;
  payload: IChangeCardLimitsCommand;
};

export type ICardLimitsChanged = {
  type: typeof ICardTypes.CARD_LIMITS_CHANGED;
  payload: Card;
};

export type IInitCard = {
  type: typeof ICardTypes.INIT_CARD;
};

export type ICardActions = IFetchChangeCardLimits | ICardLimitsChanged | IInitCard;
