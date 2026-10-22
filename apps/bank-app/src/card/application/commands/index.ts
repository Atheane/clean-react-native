import { Card, IChangeCardLimitsCommand } from '@clean-rn/card/domain';

import {
  ICardTypes,
  ICardActions,
  ICardLimitsChanged,
  IInitCard,
  IFetchChangeCardLimits,
  IFetchGetCard,
  ICardGetSuccess,
} from './types';

// commands
export const fetchChangeCardLimits = (payload: IChangeCardLimitsCommand): IFetchChangeCardLimits => ({
  type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
  payload,
});

export const fetchGetCard = (): IFetchGetCard => ({
  type: ICardTypes.FETCH_GET_CARD,
});

// domain events
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
