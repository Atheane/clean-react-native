import { Card } from '../entities';
import { IChangeCardLimitsCommand, IToggleCardLockCommand } from '../commands';

export interface ICardRepository {
  getCard(): Promise<Card>;
  changeCardLimits(card: Card, cmd: IChangeCardLimitsCommand): Promise<Card>;
  toggleLock(card: Card, cmd: IToggleCardLockCommand): Promise<Card>;
}
