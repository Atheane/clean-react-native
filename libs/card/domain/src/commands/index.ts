import { ILimits } from '../types';

export type IChangeCardLimitsCommand = {
  cardId: string;
  limits: ILimits;
};

export type ICreateCardCommand = {
  cardId: number;
  statusCode: 'LOCKED' | 'UNLOCK';
  pinString: string;
  pinChange: number;
  expiryDate: Date;
  limitPaymentYear: number;
  limitPaymentMonth: number;
  limitPaymentWeek: number;
  limitPaymentDay: number;
};
