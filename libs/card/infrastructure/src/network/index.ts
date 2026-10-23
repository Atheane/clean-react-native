import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  Card,
  IChangeCardLimitsCommand,
  ICardRepository,
  CardError,
  IToggleCardLockCommand,
} from '@clean-rn/card/domain';
import { ICardServer } from '../types';

export class CardApi implements ICardRepository {
  private static instance: CardApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getCard = this.getCard.bind(this);
    this.changeCardLimits = this.changeCardLimits.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): CardApi {
    if (!this.instance) {
      this.instance = new CardApi(httpConnection);
    }
    return this.instance;
  }

  async getCard(): Promise<Card> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/card`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const cardFromServer: ICardServer = await response.json();
    if (!cardFromServer || !cardFromServer.cardId) {
      throw new CardError.NotFound();
    }
    const card = Card.Create({
      cardId: cardFromServer.cardId,
      statusCode: cardFromServer.statusCode,
      pinString: cardFromServer.pin,
      pinChange: cardFromServer.pinChange,
      expiryDate: new Date(cardFromServer.expiryDate),
      limitPaymentYear: cardFromServer.limitPaymentYear,
      limitPaymentMonth: cardFromServer.limitPaymentMonth,
      limitPaymentWeek: cardFromServer.limitPaymentWeek,
      limitPaymentDay: cardFromServer.limitPaymentDay,
    });
    return card;
  }

  async changeCardLimits(card: Card, cmd: IChangeCardLimitsCommand): Promise<Card> {
    const params = {
      limitPaymentYear: cmd.limits.year,
      limitPaymentMonth: cmd.limits.month,
      limitPaymentWeek: cmd.limits.week,
      limitPaymentDay: cmd.limits.day,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/app/card/${card.id}/limits`,
      this.connection.options(IHttpVerb.PUT, params),
    );
    await this.connection.handleError(response);
    const cardFromServer: ICardServer = await response.json();
    card.changeCardLimits({
      year: cardFromServer.limitPaymentYear,
      month: cardFromServer.limitPaymentMonth,
      week: cardFromServer.limitPaymentWeek,
      day: cardFromServer.limitPaymentDay,
    });
    return card;
  }
  async toggleLock(card: Card, cmd: IToggleCardLockCommand): Promise<Card> {
    const params = {
      lockStatus: cmd.lock ? 1 : 0,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/app/card/${card.id}/lockUnlock`,
      this.connection.options(IHttpVerb.PUT, params),
    );
    await this.connection.handleError(response);
    const cardFromServer: ICardServer = await response.json();
    card.updateStatus(cardFromServer.statusCode);
    return card;
  }
}
