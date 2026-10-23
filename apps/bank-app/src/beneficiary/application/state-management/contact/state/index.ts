import { IContact, IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';
import { IDomainError } from '@clean-rn/ddd';

export interface IContactState {
  pending: boolean;
  contacts: IContact[] | null;
  selectedContact: IContact | null;
  error: IDomainError<IContactErrorCodes, IContactErrorMessage> | null;
}
