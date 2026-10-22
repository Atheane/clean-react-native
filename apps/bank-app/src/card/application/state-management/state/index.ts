import { Card } from '@clean-rn/card/domain';

export interface ICardState {
  pending: boolean;
  card: Card | null;
}
