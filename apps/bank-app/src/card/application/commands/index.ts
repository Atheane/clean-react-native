import {
  Card,
  ICardErrorCodes,
  ICardErrorMessage,
  IChangeCardLimitsCommand,
  IToggleCardLockCommand,
  IChangeCardPINCommand,
} from '@clean-rn/card/domain';

import {
  ICardTypes,
  ICardActions,
  ICardLimitsChanged,
  IInitCard,
  IFetchChangeCardLimits,
  IFetchGetCard,
  IFetchToggleLock,
  ICardGetSuccess,
  ICardNotFound,
  ICardForbidden,
  ICardLockToggled,
  IFetchChangePIN,
  ICardPINChanged,
  ICardPINChangedFailed,
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

export const fetchToggleLock = (payload: IToggleCardLockCommand): IFetchToggleLock => ({
  type: ICardTypes.FETCH_TOGGLE_LOCK,
  payload,
});

export const fetchChangePIN = (payload: IChangeCardPINCommand): IFetchChangePIN => ({
  type: ICardTypes.FETCH_CHANGE_CARD_PIN,
  payload,
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

export const cardForbidden = (payload: IDomainError<ICardErrorCodes, ICardErrorMessage>): ICardForbidden => ({
  type: ICardTypes.CARD_FORBIDDEN,
  payload,
});

export const cardLockToggled = (payload: Card): ICardLockToggled => ({
  type: ICardTypes.CARD_LOCK_TOGGLED,
  payload,
});

export const cardPINChanged = (payload: Card): ICardPINChanged => ({
  type: ICardTypes.CARD_PIN_CHANGED,
  payload,
});

export const cardPINChangedFailed = (
  payload: IDomainError<ICardErrorCodes, ICardErrorMessage>,
): ICardPINChangedFailed => ({
  type: ICardTypes.CARD_PIN_CHANGED_FAILED,
  payload,
});

export const initCard = (): IInitCard => ({
  type: ICardTypes.INIT_CARD,
});

export { ICardTypes, ICardActions };
