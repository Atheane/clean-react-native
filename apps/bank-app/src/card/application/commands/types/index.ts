import {
  Card,
  ICardErrorCodes,
  ICardErrorMessage,
  IChangeCardLimitsCommand,
  IChangeCardPINCommand,
  IToggleCardLockCommand,
} from '@clean-rn/card/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum ICardTypes {
  // commands
  FETCH_CHANGE_CARD_LIMITS = 'FETCH_CHANGE_CARD_LIMITS',
  FETCH_TOGGLE_LOCK = 'FETCH_TOGGLE_LOCK',
  FETCH_CHANGE_CARD_PIN = 'FETCH_CHANGE_CARD_PIN',
  // domain events
  CARD_GET_SUCCESS = 'CARD_GET_SUCCESS',
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  CARD_FORBIDDEN = 'CARD_FORBIDDEN',
  CARD_LIMITS_CHANGED = 'CARD_LIMITS_CHANGED',
  CARD_LOCK_TOGGLED = 'CARD_LOCK_TOGGLED',
  CARD_PIN_CHANGED = 'CARD_PIN_CHANGED',
  CARD_PIN_CHANGED_FAILED = 'CARD_PIN_CHANGED_FAILED',
  INIT_CARD = 'INIT_CARD',
}

// commands
export type IFetchChangeCardLimits = {
  type: typeof ICardTypes.FETCH_CHANGE_CARD_LIMITS;
  payload: IChangeCardLimitsCommand;
};

export type IFetchToggleLock = {
  type: typeof ICardTypes.FETCH_TOGGLE_LOCK;
  payload: IToggleCardLockCommand;
};

export type IFetchChangePIN = {
  type: typeof ICardTypes.FETCH_CHANGE_CARD_PIN;
  payload: IChangeCardPINCommand;
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

export type ICardLockToggled = {
  type: typeof ICardTypes.CARD_LOCK_TOGGLED;
  payload: Card;
};

export type ICardPINChanged = {
  type: typeof ICardTypes.CARD_PIN_CHANGED;
  payload: Card;
};

export type ICardPINChangedFailed = {
  type: typeof ICardTypes.CARD_PIN_CHANGED_FAILED;
  payload: IDomainError<ICardErrorCodes, ICardErrorMessage>;
};

export type IInitCard = {
  type: typeof ICardTypes.INIT_CARD;
};

export type ICardActions =
  | IFetchChangeCardLimits
  | IFetchToggleLock
  | IFetchChangePIN
  | ICardLimitsChanged
  | ICardNotFound
  | IInitCard
  | ICardGetSuccess
  | ICardForbidden
  | ICardGetSuccess
  | ICardLockToggled
  | ICardPINChanged
  | ICardPINChangedFailed;
