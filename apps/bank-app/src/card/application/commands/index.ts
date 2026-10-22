import { Card, ICardErrorCodes, ICardErrorMessage, IChangeCardLimitsCommand } from '@clean-rn/card/domain';

import {
  ICardTypes,
  ICardActions,
  ICardLimitsChanged,
  IInitCard,
  IFetchChangeCardLimits,
  IFetchGetCard,
  ICardGetSuccess,
  ICardNotFound,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// commands
export const fetchChangeCardLimits = (payload: IChangeCardLimitsCommand): IFetchChangeCardLimits => ({
  type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
  payload,
});

export const fetchGetCard = (): IFetchGetCard => ({
  type: ICardTypes.FETCH_GET_CARD,
});

// domain events
export const cardNotFound = (payload: IDomainError<ICardErrorCodes, ICardErrorMessage>): ICardNotFound => ({
  type: ICardTypes.CARD_NOT_FOUND,
  payload,
});

export const cardLimitsChanged = (payload: Card): ICardLimitsChanged => ({
  type: ICardTypes.CARD_LIMITS_CHANGED,
  payload,
});

export const cardGetSuccess = (payload: Card): ICardGetSuccess => ({
  type: ICardTypes.CARD_GET_SUCCESS,
  payload,
});

export const initCard = (): IInitCard => ({
  type: ICardTypes.INIT_CARD,
});

export { ICardTypes, ICardActions };
