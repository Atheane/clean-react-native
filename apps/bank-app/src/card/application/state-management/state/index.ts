import { Card, ICardErrorCodes, ICardErrorMessage } from '@clean-rn/card/domain';
import { IDomainError } from '@clean-rn/ddd';

export interface ICardState {
  pending: boolean;
  card: Card | null;
  error: IDomainError<ICardErrorCodes, ICardErrorMessage> | null;
}
