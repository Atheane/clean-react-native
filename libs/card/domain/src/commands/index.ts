import { Card } from '../entities';
import { ILimits, ICardStatuses } from '../types';

export type IChangeCardLimitsCommand = {
  card: Card;
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
