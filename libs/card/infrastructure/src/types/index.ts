import { ICardStatuses } from '@clean-rn/card/domain';

export type ICardServer = {
  cardId: number;
  userId: number;
  publicToken: string;
  statusCode: ICardStatuses;
  isLive: 0 | 1;
  pinTryExceeds: 0 | 1;
  expiryDate: string;
  limitPaymentYear: number;
  limitPaymentMonth: number;
  limitPaymentWeek: number;
  limitPaymentDay: number;
  pin: string;
  pinChange: number;
};
