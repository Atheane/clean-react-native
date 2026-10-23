import { Card } from '../entities';
import { IChangeCardLimitsCommand, IChangeCardPINCommand, IToggleCardLockCommand } from '../commands';

export interface ICardRepository {
  getCard(): Promise<Card>;
  changeCardLimits(card: Card, cmd: IChangeCardLimitsCommand): Promise<Card>;
  toggleCardLock(card: Card, cmd: IToggleCardLockCommand): Promise<Card>;
  changeCardPIN(card: Card, cmd: IChangeCardPINCommand): Promise<Card>;
}
