import { Card } from '../entities';
import { IChangeCardLimitsCommand } from '../commands';

export interface ICardRepository {
  getCard(): Promise<Card>;
  changeCardLimits(payload: IChangeCardLimitsCommand): Promise<Card>;
}
