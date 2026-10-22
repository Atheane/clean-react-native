import {
  IContact,
  IAddContactCommand,
  IContactErrorCodes,
  IContactErrorMessage,
} from '@clean-rn/contact/domain';
//
import {
  IContactTypes,
  IAddContact,
  IListContact,
  IContactActions,
  IContactAdded,
  IInitContact,
  IContactListed,
  IContactAddedFailed,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// commands
export const addContact = (payload: IAddContactCommand): IAddContact => ({
  type: IContactTypes.ADD_CONTACT,
  payload,
});

export const listContact = (): IListContact => ({
  type: IContactTypes.LIST_CONTACT,
});

export const initContact = (): IInitContact => ({
  type: IContactTypes.INIT_CONTACT,
});

// domain Events
export const contactAdded = (payload: IContact): IContactAdded => ({
  type: IContactTypes.CONTACT_ADDED,
  payload,
});

export const contactAddedFailed = (
  payload: IDomainError<IContactErrorCodes, IContactErrorMessage>,
): IContactAddedFailed => ({
  type: IContactTypes.CONTACT_ADD_FAILED,
  payload,
});

export const contactListed = (payload: IContact[]): IContactListed => ({
  type: IContactTypes.CONTACT_LISTED,
  payload,
});

export { IContactTypes, IContactActions };
