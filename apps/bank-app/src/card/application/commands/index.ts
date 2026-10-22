import { Card, IChangeCardLimitsCommand } from '@clean-rn/card/domain';

import { ICardTypes, ICardActions, ICardLimitsChanged, IInitCard, IFetchChangeCardLimits } from './types';

export const fetchChangeCardLimits = (payload: IChangeCardLimitsCommand): IFetchChangeCardLimits => ({
  type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
  payload,
});

export const cardLimitsChanged = (payload: Card): ICardLimitsChanged => ({
  type: ICardTypes.CARD_LIMITS_CHANGED,
  payload,
});

export const initCard = (): IInitCard => ({
  type: ICardTypes.INIT_CARD,
});

export { ICardTypes, ICardActions };
