import { IDomainError } from '@clean-rn/ddd';

import { IContact, IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';

export interface IContactState {
  pending: boolean;
  contacts: IContact[] | null;
  error: IDomainError<IContactErrorCodes, IContactErrorMessage> | null;
}
