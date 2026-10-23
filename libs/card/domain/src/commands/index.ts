import { ILimits, ICardStatuses } from '../types';
import { CardPinCode } from '../value-objects';

export type IChangeCardLimitsCommand = {
  limits: ILimits;
};

export type ICreateCardCommand = {
  cardId: number;
  statusCode: ICardStatuses;
  pinString: string;
  pinChange: number;
  expiryDate: Date;
  limitPaymentYear: number;
  limitPaymentMonth: number;
  limitPaymentWeek: number;
  limitPaymentDay: number;
};

export type IToggleCardLockCommand = {
  lock: boolean;
};

export type IChangeCardPINCommand = {
  pin: CardPinCode;
};
