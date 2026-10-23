import { Card, ICardErrorCodes, ICardErrorMessage, IChangeCardLimitsCommand } from '@clean-rn/card/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum ICardTypes {
  // commands
  FETCH_GET_CARD = 'FETCH_CARD',
  FETCH_CHANGE_CARD_LIMITS = 'FETCH_CHANGE_CARD_LIMITS',
  // domain events
  CARD_GET_SUCCESS = 'CARD_GET_SUCCESS',
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  CARD_FORBIDDEN = 'CARD_FORBIDDEN',
  CARD_LIMITS_CHANGED = 'CARD_LIMITS_CHANGED',
  INIT_CARD = 'INIT_CARD',
}

// commands
export type IFetchChangeCardLimits = {
  type: typeof ICardTypes.FETCH_CHANGE_CARD_LIMITS;
  payload: IChangeCardLimitsCommand;
};
export type IFetchGetCard = {
  type: typeof ICardTypes.FETCH_GET_CARD;
};

// domain events
export type ICardLimitsChanged = {
  type: typeof ICardTypes.CARD_LIMITS_CHANGED;
  payload: Card;
};

export type ICardGetSuccess = {
  type: typeof ICardTypes.CARD_GET_SUCCESS;
  payload: Card;
};

export type ICardNotFound = {
  type: typeof ICardTypes.CARD_NOT_FOUND;
  payload: IDomainError<ICardErrorCodes, ICardErrorMessage>;
};

export type ICardForbidden = {
  type: typeof ICardTypes.CARD_FORBIDDEN;
  payload: IDomainError<ICardErrorCodes, ICardErrorMessage>;
};

export type IInitCard = {
  type: typeof ICardTypes.INIT_CARD;
};

export type ICardActions =
  | IFetchChangeCardLimits
  | IFetchGetCard
  | ICardLimitsChanged
  | ICardNotFound
  | IInitCard
  | ICardGetSuccess
  | ICardForbidden;
