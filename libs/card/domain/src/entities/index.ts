import { Entity } from '@clean-rn/ddd';
import { ILimits, ICardStatuses } from '../types';
import { CardPinCode } from '../value-objects';
import { ICreateCardCommand } from '../commands';

export interface ICardProperties {
  cardId: string;
  status: ICardStatuses;
  pin: CardPinCode;
  pinChange: number;
  expiryDate: Date;
  limits: ILimits;
}

export class Card extends Entity<ICardProperties> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<ICardProperties> }) {
    super({ id, properties });
  }

  static Create({
    cardId,
    statusCode,
    pinString,
    pinChange,
    expiryDate,
    limitPaymentYear,
    limitPaymentMonth,
    limitPaymentWeek,
    limitPaymentDay,
  }: ICreateCardCommand): Card {
    return new Card({
      id: cardId.toString(),
      properties: {
        status: statusCode,
        pin: new CardPinCode(pinString),
        pinChange,
        expiryDate,
        limits: {
          year: limitPaymentYear,
          month: limitPaymentMonth,
          week: limitPaymentWeek,
          day: limitPaymentDay,
        },
      },
    });
  }

  changeCardLimits(limits: ILimits): void {
    this.properties.limits = {
      ...this.properties.limits,
      ...limits,
    };
  }

  updateStatus(status: ICardStatuses): void {
    this.properties.status = status;
  }
}
